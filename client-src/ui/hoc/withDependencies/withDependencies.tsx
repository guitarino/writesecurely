import { TypeIdentifier, LazyTypeIdentifier, LazyMultiTypeIdentifier, MultiTypeIdentifier } from "typeinject/typeContainer.types";
import { h, ComponentConstructor, Component } from "preact";
import { Omit } from "../../types/Omit";
import { dependency, type, inject, getImplementation } from "../../../type/inject";
import { ValuesOf } from "../../types/ValuesOf";
import { Lazy } from "typeinject";

type getInjectedComponentConstructor<UC, PM> =
    ComponentConstructor<
        getInjectedProps<getProps<UC>, PM>,
        getInjectedState<PM>
    > & (
        UC extends typeWithDefaultProps<infer DefProps> ? {
            defaultProps: DefProps
        } : {}
    )
;

type getInjectedProps<P, PM> = Omit<P, keyof PM>;

type getInjectedState<PM> = {
    [K in keyof PM]: getTypeFromInjected<PM[K]>
};

type getTypeFromInjected<I> = I extends TypeIdentifier<infer T> ? T :
    I extends MultiTypeIdentifier<infer T> ? T[] :
    I extends LazyTypeIdentifier<infer T> ? Lazy<T> :
    I extends LazyMultiTypeIdentifier<infer T> ? Lazy<T[]> :
    never;

type getPropMap<P> = {
    [K in keyof P]?: P[K] extends Lazy<Array<infer U>> ? LazyMultiTypeIdentifier<U> :
        P[K] extends Lazy<infer U> ? LazyTypeIdentifier<U> :
        P[K] extends Array<infer U> ? MultiTypeIdentifier<U> :
        TypeIdentifier<P[K]>
};

type getProps<UC> = UC extends ComponentConstructor<infer P, any> ? P : never;

type typeWithDefaultProps<DefProps> = {
    defaultProps: DefProps
};

export function withDependencies<
    UC,
    PM extends getPropMap<getProps<UC>>
>(UserComponent: UC, propMap: PM): getInjectedComponentConstructor<UC, PM> {
    const propNames: Array<keyof PM> = [];
    const dependencies: Array<ValuesOf<PM>> = [];

    for (let p in propMap) {
        propNames.push(p);
        dependencies.push(propMap[p]);
    }

    const InjectedType = type();
    @dependency(InjectedType)
    @inject(...dependencies)
    class InjectedComponent extends Component<
        getInjectedProps<getProps<UC>, PM>,
        getInjectedState<PM>
    > {
        constructor(...args) {
            const injecteds = args.slice(0, dependencies.length);
            const others = args.slice(dependencies.length);
            super(...others);
            const state: Partial<getInjectedState<PM>> = {};
            for (let i = 0; i <= injecteds.length; i++) {
                const injected = injecteds[i];
                const propName = propNames[i];
                state[propName] = injected;
            }
            this.state = state as getInjectedState<PM>;
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