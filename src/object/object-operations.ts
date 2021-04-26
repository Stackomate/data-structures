import { Batcher } from '../batcher';

export const _objHas = <T extends Object>(batcher: Batcher<T>, key: keyof T ): boolean => {
    return batcher.currentValue.hasOwnProperty(key);
}

export const _objGet = <T extends Object, K extends keyof T>(batcher: Batcher<T>, key: K): T[K] => {
    return batcher.currentValue[key];
}

export const _objSet = <T extends Object>(batcher: Batcher<T>, key: keyof T, value: T[ keyof T]): T => {
    if (!_objHas(batcher, key) || _objGet(batcher, key) !== value) {
        batcher.willChange();
        batcher.currentValue[key] = value;
    }
    return batcher.currentValue;
}

export const _objKeys = <T extends Object>(batcher: Batcher<T>): string[] => {
    return Object.keys(batcher.currentValue);
}

export const _objValues = <T extends Object>(batcher: Batcher<T>): T[] => {
    return Object.values(batcher.currentValue);
}

export const _objEntries = <T extends Object>(batcher: Batcher<T>): Object[] => {
    return Object.entries(batcher.currentValue);
}

export const _objClear = <T extends Object>(batcher: Batcher<T>): Batcher<T> => {
    batcher.willChangeWithoutCloning();
    batcher.currentValue = {} as T;

    return batcher; 
}

export const _objDelete = <T extends Object, K extends keyof T>(batcher: Batcher<T>, key: K): Batcher<T> => {
    if (_objHas(batcher, key)) {
        batcher.willChange();
        delete batcher.currentValue[key];
    }
    return batcher;
}

export type ForEachFn<T extends Object> = (key: keyof T, value: T[keyof T], obj: T) => void;

export const _objForEach = <T extends Object>(batcher: Batcher<T>, fn: ForEachFn<T>): Batcher<T> => {

    let obj = batcher.currentValue;
    Object.keys(obj).forEach(key => fn(key as keyof T, obj[key as keyof T], obj));

    return batcher;
}
    /* Inverted ordering of key, value arguments */
   


export const _objSpread = <T extends Object>(batcher: Batcher<T>, copyObj: Batcher<T>[]): Batcher<T> => {
    copyObj.forEach(b => {
        _objForEach(b, (key, value) => {
            _objSet(batcher, key as keyof T, value);
        })
    })
    return batcher;
}

export const _objMap = <T extends Object, U extends Object>(batcher: Batcher<T>, fn: (key: keyof T, value: T[keyof T], obj: T) => [keyof U, U[keyof U]]) : Batcher<U> => {
    /* TODO: Add full [key, value] pair check for rare scenario */
    let result : U = {} as U;
    let hasAdded = false;
    _objForEach(batcher, (key, value, map) => {
        let [newKey, newValue] = fn(key as keyof T, value, map);
        result[newKey] = newValue;
        // if (!_objHas(batcher, newKey as unknown as keyof T)) {
        //     hasAdded = true;
        // }
    })
    let batcher_ = batcher as unknown as Batcher<U>;    
    // if (hasAdded || Object.keys(result).length !== Object.keys(batcher_.currentValue).length) {
    //     batcher_.willChange();
    //     batcher_.currentValue = result;
    // }
    return batcher_;
}