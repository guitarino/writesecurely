import { TypeIdentifier, LazyTypeIdentifier, LazyMultiTypeIdentifier, MultiTypeIdentifier } from "typeinject/typeContainer.types";
import { h, ComponentConstructor, Component } from "preact";
import { Omit } from "../../../types/Omit";
import { dependency, type, inject, getImplementation } from "../../../type/inject";
import { ValuesOf } from "../../../types/ValuesOf";
import { Lazy } from "typeinject";

type getInjectedComponentConstructor<UC, PM, PMKeys extends keyof PM> =
    ComponentConstructor<
        getInjectedProps<getProps<UC>, PMKeys>,
        getInjectedState<PM, PMKeys>
    > & (
        UC extends typeWithDefaultProps<infer DefProps> ? {
            defaultProps: DefProps
        } : {}
    )
;

type getInjectedProps<P, PMKeys> = Omit<P, PMKeys>;

type getInjectedState<PM, PMKeys extends keyof PM> = {
    [K in PMKeys]: getTypeFromInjected<PM[K]>
};

type getTypeFromInjected<I> = I extends TypeIdentifier<infer T> ? T :
    I extends MultiTypeIdentifier<infer T> ? T[] :
    I extends LazyTypeIdentifier<infer T> ? Lazy<T> :
    I extends LazyMultiTypeIdentifier<infer T> ? Lazy<T[]> :
    never;

type getPropMap<P, PMKeys extends keyof P> = {
    [K in PMKeys]: P[K] extends Lazy<Array<infer U>> ? LazyMultiTypeIdentifier<U> :
        P[K] extends Lazy<infer U> ? LazyTypeIdentifier<U> :
        P[K] extends Array<infer U> ? MultiTypeIdentifier<U> :
        TypeIdentifier<P[K]>
};

type getProps<UC> = UC extends ComponentConstructor<infer P, any> ? P : never;

type typeWithDefaultProps<DefProps> = {
    defaultProps: DefProps
};

export function withDependencies<UC, PMKeys extends keyof getProps<UC>>(
    UserComponent: UC,
    propMap: getPropMap<getProps<UC>, PMKeys>
): getInjectedComponentConstructor<UC, typeof propMap, PMKeys> {
    const propNames: Array<keyof typeof propMap> = [];
    const dependencies: Array<ValuesOf<typeof propMap>> = [];

    for (let p in propMap) {
        propNames.push(p);
        dependencies.push(propMap[p]);
    }

    const InjectedType = type();
    @dependency(InjectedType)
    @inject(...dependencies)
    class InjectedComponent extends Component<
        getInjectedProps<getProps<UC>, PMKeys>,
        getInjectedState<typeof propMap, PMKeys>
    > {
        constructor(...args) {
            const injecteds = args.slice(0, dependencies.length);
            const others = args.slice(dependencies.length);
            super(...others);
            const state: Partial<getInjectedState<typeof propMap, PMKeys>> = {};
            for (let i = 0; i <= injecteds.length; i++) {
                const injected = injecteds[i];
                const propName = propNames[i];
                state[propName] = injected;
            }
            this.state = state as getInjectedState<typeof propMap, PMKeys>;
        }

        render() {
            // @ts-ignore
            return <UserComponent {...this.props} {...this.state} />;
        }
    }

    const InjectedImplementation = getImplementation(InjectedType);

    if ('defaultProps' in UserComponent) {
        // @ts-ignore
        InjectedImplementation.defaultProps = UserComponent.defaultProps;
    }
    
    // @ts-ignore
    return InjectedImplementation;
}