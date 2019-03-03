import { IntentManager as IIntentManager } from "./IntentManager.types";
import { dependency, inject } from "../../type/inject";
import { Intent } from "./Intent.types";
import { connect, effected } from "../../type/connect";

@dependency(IIntentManager.singleton)
@inject(Intent.multi)
class IntentManager implements IIntentManager {
    private readonly intents: Intent[];

    constructor(intents: Intent[]) {
        this.intents = intents;
        connect(this);
    }

    @effected determineAndNotifyValidIntent() {
        let isCurrentIntentDetected = false;
        for (let i = 0; i < this.intents.length; i++) {
            const intent = this.intents[i];
            if (!isCurrentIntentDetected && intent.isCurrentIntent) {
                intent.isCurrentIntentValid = true;
                isCurrentIntentDetected = true;
            }
            else {
                intent.isCurrentIntentValid = false;
            }
        }
    }
}