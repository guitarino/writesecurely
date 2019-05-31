import { IntentManager as IIntentManager } from "./IntentManager.types";
import { Intent } from "./Intent.types";

export class IntentManager implements IIntentManager {
    private readonly intents: Intent[];
    public currentIntent: Intent | null = null;

    constructor(intents: Intent[]) {
        this.intents = intents;
    }

    determineAndNotifyValidIntent() {
        let isCurrentIntentDetected = false;
        for (let i = 0; i < this.intents.length; i++) {
            const intent = this.intents[i];
            if (!isCurrentIntentDetected && intent.isCurrentIntent) {
                this.currentIntent = intent;
                intent.isCurrentIntentValid = true;
                isCurrentIntentDetected = true;
            }
            else {
                intent.isCurrentIntentValid = false;
            }
        }
        if (!isCurrentIntentDetected) {
            this.currentIntent = null;
        }
    }
}