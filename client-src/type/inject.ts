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