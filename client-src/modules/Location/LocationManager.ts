import { configureDependency } from "../../type/inject";
import { LocationManager as ILocationManager } from "./LocationManager.types";
import { Location } from "./Location.types";
import { LocationManager } from "./LocationManager.impl";

configureDependency()
    .implements(ILocationManager)
    .inject(Location)
    .create(LocationManager);