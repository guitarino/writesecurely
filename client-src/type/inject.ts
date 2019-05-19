import { createContainer } from "typeinject";

export const container = createContainer();
export const { get, configureDependency, type } = container;