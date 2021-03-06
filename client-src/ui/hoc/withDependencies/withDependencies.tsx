import { Type, TypeLazy, TypeMultiLazy, TypeMulti } from "typeinject/type.types";
import { h, Component, AnyComponent } from "preact";
import { Omit } from "../../../types/Omit";
import { configureDependency, type } from "../../../type/inject";
import { ValuesOf } from "../../../types/ValuesOf";
import { Lazy } from "typeinject/lazy.types";

interface getInjectedComponentConstructor<
    UC,
    PM,
    P = getInjectedProps<getProps<UC>, PM>,
    S = getInjectedState<PM>
> {
    new (props: P, context?: any): Component<P, S>;
    displayName?: string;
    defaultProps: UC extends TypeWithDefaultProps<infer DPs>
        ? DPs
        : never
};

type getInjectedProps<P, PM> = Omit<P, keyof PM>;

type getInjectedState<PM> = {
    [K in keyof PM]: getTypeFromInjected<PM[K]>
};

type getTypeFromInjected<I> = I extends Type<infer T> ? T :
    I extends TypeMulti<infer T> ? T[] :
    I extends TypeLazy<infer T> ? Lazy<T> :
    I extends TypeMultiLazy<infer T> ? Lazy<T[]> :
    never;

type getPropMap<P, PMKeys extends keyof P> = {
    [K in PMKeys]: P[K] extends Lazy<Array<infer U>> ? TypeMultiLazy<U> :
        P[K] extends Lazy<infer U> ? TypeLazy<U> :
        P[K] extends Array<infer U> ? TypeMulti<U> :
        Type<P[K]>
};

type getProps<UC> = UC extends AnyComponent<infer P, any>
    ? P
    : never;

type TypeWithDefaultProps<DPs> = {
    defaultProps: DPs
};

export function withDependencies<
    UC,
    PMKeys extends keyof getProps<UC>,
>(
    UserComponent: UC,
    propMap: getPropMap<getProps<UC>, PMKeys>
): getInjectedComponentConstructor<UC, typeof propMap> {
    const propNames: Array<keyof typeof propMap> = [];
    const dependencies: Array<ValuesOf<typeof propMap>> = [];

    for (let p in propMap) {
        propNames.push(p);
        dependencies.push(propMap[p]);
    }

    const InjectedType = type();

    class InjectedComponent extends Component<
        getInjectedProps<getProps<UC>, typeof propMap>,
        getInjectedState<typeof propMap>
    > {
        constructor(...args) {
            const injecteds = args.slice(0, dependencies.length);
            const others = args.slice(dependencies.length);
            super(...others);
            const state: Partial<getInjectedState<typeof propMap>> = {};
            for (let i = 0; i <= injecteds.length; i++) {
                const injected = injecteds[i];
                const propName = propNames[i];
                state[propName] = injected;
            }
            this.state = state as getInjectedState<typeof propMap>;
        }

        render() {
            // @ts-ignore
            return <UserComponent {...this.props} {...this.state} />;
        }
    }

    const InjectedImplementation = configureDependency()
        .implements(InjectedType)
        .inject(...dependencies)
        .create(InjectedComponent);

    if ('defaultProps' in UserComponent) {
        // @ts-ignore
        InjectedImplementation.defaultProps = UserComponent.defaultProps;
    }
    
    // @ts-ignore
    return InjectedImplementation;
}