import { configureDependency } from "../../type/inject";
import { QueryBuilder } from "../QueryBuilder/QueryBuilder.types";
import { Location as ILocation } from "./Location.types";
import { Location } from "./Location.impl";

configureDependency()
    .implements(ILocation)
    .inject(QueryBuilder)
    .create(Location);