import { observed, computed, effected, connect } from "./type/connect";

class Calculation {
    constructor() {
        connect(this);
    }

    @observed a = 100;

    @computed get b() {
        return this.a * 2;
    }

    @effected bLogger() {
        console.log('b is', this.b);
    }
}

async function main() {
    const calc = new Calculation();
    console.log('Initial calc.a =', calc.a);
    console.log('Changing calc.a to 200');
    calc.a = 200;
    console.log('calc.a = ', calc.a);
    console.log('calc.b = ', calc.b);
}

main();