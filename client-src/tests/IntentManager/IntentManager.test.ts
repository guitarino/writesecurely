import "../../modules/Intent/IntentManager";
import { IntentManager } from "../../modules/Intent/IntentManager.types";
import { get, configureDependency, type } from "../../type/inject";
import { Intent } from "../../modules/Intent/Intent.types";
import assert from "assert";
import { connect } from "typeconnect";

const IAIntent = type<Intent>(Intent);
class AIntent implements Intent {
    isCurrentIntentValid: boolean = false;
    isCurrentIntent: boolean = false;
}

const IBIntent = type<Intent>(Intent);
class BIntent implements Intent {
    isCurrentIntentValid: boolean = false;
    isCurrentIntent: boolean = false;
}

const ICIntent = type<Intent>(Intent);
class CIntent implements Intent {
    isCurrentIntentValid: boolean = false;
    isCurrentIntent: boolean = false;
}

configureDependency()
    .implements(IAIntent)
    .create(connect(AIntent));

configureDependency()
    .implements(IBIntent)
    .create(connect(BIntent));

configureDependency()
    .implements(ICIntent)
    .create(connect(CIntent));

function resetIntents([ aIntent, bIntent, cIntent ]) {
    aIntent.isCurrentIntent = false;
    bIntent.isCurrentIntent = false;
    cIntent.isCurrentIntent = false;
}

function verifyOneOfCurrentIntentsIsValid(intentManager: IntentManager, [ firstCurrentIntent, secondCurrentIntent, nonCurrentIntent ]: [Intent, Intent, Intent]) {
    resetIntents([ firstCurrentIntent, secondCurrentIntent, nonCurrentIntent ]);
    firstCurrentIntent.isCurrentIntent = true;
    secondCurrentIntent.isCurrentIntent = true;
    assert(
        firstCurrentIntent.isCurrentIntentValid === true ||
        secondCurrentIntent.isCurrentIntentValid === true
    );
    assert(nonCurrentIntent.isCurrentIntentValid === false);
    assert(
        intentManager.currentIntent === firstCurrentIntent ||
        intentManager.currentIntent === secondCurrentIntent
    );
}

describe("IntentManager", () => {
    const intentManager = get(IntentManager);
    const aIntent = get(IAIntent);
    const bIntent = get(IBIntent);
    const cIntent = get(ICIntent);

    it('if no intent is current, no intent should be valid', () => {
        assert(aIntent.isCurrentIntentValid === false);
        assert(bIntent.isCurrentIntentValid === false);
        assert(cIntent.isCurrentIntentValid === false);
        assert(intentManager.currentIntent === null);
    });

    it('if one intent is current, only that intent is valid', () => {
        aIntent.isCurrentIntent = true;
        assert(aIntent.isCurrentIntentValid === true);
        assert(bIntent.isCurrentIntentValid === false);
        assert(cIntent.isCurrentIntentValid === false);
        assert(intentManager.currentIntent === aIntent);
    });

    it('if more than one intent is current, one of those intents is valid', () => {
        verifyOneOfCurrentIntentsIsValid(intentManager, [ aIntent, bIntent, cIntent ]);
        verifyOneOfCurrentIntentsIsValid(intentManager, [ bIntent, cIntent, aIntent ]);
        verifyOneOfCurrentIntentsIsValid(intentManager, [ cIntent, aIntent, bIntent ]);
    });
});