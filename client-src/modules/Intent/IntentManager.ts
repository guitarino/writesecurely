import { configureDependency } from "../../type/inject";
import { IntentManager as IIntentManager } from "./IntentManager.types";
import { IntentManager } from "./IntentManager.impl";
import { Intent } from "./Intent.types";

configureDependency()
    .implements(IIntentManager)
    .inject(Intent.multi)
    .create(IntentManager);