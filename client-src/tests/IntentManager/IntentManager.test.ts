import "../../modules/Intent/IntentManager";
import { IntentManager } from "../../modules/Intent/IntentManager.types";
import { get, configureDependency, type } from "../../type/inject";
import { Intent } from "../../modules/Intent/Intent.types";
import { connect, observed } from "../../type/connect";
import assert from "assert";

const IAIntent = type<Intent>(Intent);
class AIntent implements Intent {
    @observed isCurrentIntentValid: boolean = false;
    @observed isCurrentIntent: boolean = false;
    constructor() {
        connect(this);
    }
}

const IBIntent = type<Intent>(Intent);
class BIntent implements Intent {
    @observed isCurrentIntentValid: boolean = false;
    @observed isCurrentIntent: boolean = false;
    constructor() {
        connect(this);
    }
}

const ICIntent = type<Intent>(Intent);
class CIntent implements Intent {
    @observed isCurrentIntentValid: boolean = false;
    @observed isCurrentIntent: boolean = false;
    constructor() {
        connect(this);
    }
}

configureDependency()
    .implements(IAIntent)
    .create(AIntent);

configureDependency()
    .implements(IBIntent)
    .create(BIntent);

configureDependency()
    .implements(ICIntent)
    .create(CIntent);

function resetIntents([ aIntent, bIntent, cIntent ]) {
    aIntent.isCurrentIntent = false;
    bIntent.isCurrentIntent = false;
    cIntent.isCurrentIntent = false;
}

function verifyOneOfCurrentIntentsIsValid([ firstCurrentIntent, secondCurrentIntent, nonCurrentIntent ]) {
    resetIntents([ firstCurrentIntent, secondCurrentIntent, nonCurrentIntent ]);
    firstCurrentIntent.isCurrentIntent = true;
    secondCurrentIntent.isCurrentIntent = true;
    assert(
        firstCurrentIntent.isCurrentIntentValid === true ||
        secondCurrentIntent.isCurrentIntentValid === true
    );
    assert(nonCurrentIntent.isCurrentIntentValid === false);
}

describe("IntentManager", () => {
    get(IntentManager);
    const aIntent = get(IAIntent);
    const bIntent = get(IBIntent);
    const cIntent = get(ICIntent);

    it('if no intent is current, no intent should be valid', () => {
        assert(aIntent.isCurrentIntentValid === false);
        assert(bIntent.isCurrentIntentValid === false);
        assert(cIntent.isCurrentIntentValid === false);
    });

    it('if one intent is current, only that intent is valid', () => {
        aIntent.isCurrentIntent = true;
        assert(aIntent.isCurrentIntentValid === true);
        assert(bIntent.isCurrentIntentValid === false);
        assert(cIntent.isCurrentIntentValid === false);
    });

    it('if more than one intent is current, one of those intents is valid', () => {
        verifyOneOfCurrentIntentsIsValid([ aIntent, bIntent, cIntent ]);
        verifyOneOfCurrentIntentsIsValid([ bIntent, cIntent, aIntent ]);
        verifyOneOfCurrentIntentsIsValid([ cIntent, aIntent, bIntent ]);
    });
});