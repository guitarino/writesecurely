import { createDecorators } from 'typeinject/babel-legacy-decorators';
import { createContainer, Container } from "typeinject";
import { TypeIdentifier, MultiTypeIdentifier, LazyTypeIdentifier, LazyMultiTypeIdentifier } from 'typeinject/typeContainer.types';

export const container: Container = createContainer();
export const {
    get,
    type,
    hasCircularDependencies,
    getImplementation,
    getImplementations,
    configure
} = container;
export const { dependency, inject } = createDecorators(container);

type getComponentFromType<T> =
    T extends TypeIdentifier<infer U> ? U :
    T extends MultiTypeIdentifier<infer U> ? U :
    T extends LazyTypeIdentifier<infer U> ? U :
    T extends LazyMultiTypeIdentifier<infer U> ? U :
    never;

export function getComponentImplementation<T>(ComponentType: T): getComponentFromType<T> {
    return getImplementation(ComponentType as any) as any;
}