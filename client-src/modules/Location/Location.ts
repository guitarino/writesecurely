import { configureDependency } from "../../type/inject";
import { QueryBuilder } from "../QueryBuilder/QueryBuilder.types";
import { Location as ILocation } from "./Location.types";
import { Location } from "./Location.impl";
import { connect } from "typeconnect";

configureDependency()
    .implements(ILocation)
    .inject(QueryBuilder)
    .create(connect(Location));