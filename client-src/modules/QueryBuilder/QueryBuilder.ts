import { configureDependency } from "../../type/inject";
import { QueryBuilder as IQueryBuilder } from "./QueryBuilder.types";
import { QueryBuilder } from "./QueryBuilder.impl";

configureDependency()
    .implements(IQueryBuilder)
    .create(QueryBuilder);