import { sharedData } from "../sharedData";

describe('something', () => {
    console.log('*something');
    console.log(sharedData.data);
    sharedData.data = 'changed';

    it('something else', () => {
        console.log('201');
    });
});