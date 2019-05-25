import { type } from "../../type/inject";

export const LocationManager = type<LocationManager>();
export interface LocationManager {
    push(url: string);
    replace(url: string);
    go(steps: number);
    goBack();
    goForward();
    redirect(url: string);
}