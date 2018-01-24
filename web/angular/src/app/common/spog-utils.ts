import { Injectable } from '@angular/core';

@Injectable()
export class SpogUtils {

    constructor() { }

    // Checks if object is null/undefined
    public isNullOrUndefined (value: any): boolean {
        if (value == null && value == undefined) {
        return true;
        }
        return false;
    }

    public getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {c = c.substring(1, c.length); }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }

}
