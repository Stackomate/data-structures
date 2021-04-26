import { Batcher } from '../batcher';
import { mapFilterForLocked } from './filter-for-locked';
import { mapFilterForUnlocked } from './filter-for-unlocked';

/** This symbol represents the absence of an argument for value parameter */
export const NO_VALUE_SYMBOL = Symbol('NO_VALUE_SYMBOL');

/** Returns if the Map contains a key 
 * Optionally, if passed a value, will check if the exact (key, value) pair exists
*/
export const _mapHas = <T, U>(batcher: Batcher<Map<T, U>>, key: T, value: U | typeof NO_VALUE_SYMBOL = NO_VALUE_SYMBOL): boolean => {
    if (value === NO_VALUE_SYMBOL) {
        return batcher.currentValue.has(key);
    }
    return batcher.currentValue.has(key) && (batcher.currentValue.get(key) === value);
}

/** Returns the length of the array. */
export const _mapSize = <T, U>(batcher: Batcher<Map<T, U>>): number => {
    return batcher.currentValue.size;
}

/** Returns the value of a Map key */
export const _mapGet = <T, U>(batcher: Batcher<Map<T, U>>, key: T): U | undefined => {
    return batcher.currentValue.get(key);
}

/** Sets a (key, value) pair in the map
 */
export const _mapSet = <T, U>(batcher: Batcher<Map<T, U>>, key: T, value: U): Batcher<Map<T, U>> => {
    if (!_mapHas(batcher, key) || _mapGet(batcher, key) !== value) {
        batcher.willChange();
        batcher.currentValue.set(key, value);
    }
    return batcher;
}

/**
 * Returns iterator of keys from the Map
 */
export const _mapKeys = <T, U>(batcher: Batcher<Map<T, U>>): IterableIterator<T> => {
    return batcher.currentValue.keys();
}

/**
 * Returns iterator of values from the Map
 */
export const _mapValues = <T, U>(batcher: Batcher<Map<T, U>>): IterableIterator<U> => {
    return batcher.currentValue.values();
}

/**
 * Returns iterator of (key, value) from the Map
 */
export const _mapEntries = <T, U>(batcher: Batcher<Map<T, U>>): IterableIterator<[T, U]> => {
    return batcher.currentValue.entries();
}

/**
 * Returns iterator of (key, value) from the Map
 */
export const _mapClear = <T, U>(batcher: Batcher<Map<T, U>>): Batcher<Map<T,U>> => {
    if (batcher.isUnlocked) {
        batcher.currentValue.clear();
    } else {
        batcher.currentValue = new Map<T, U>();
    }
    return batcher; 
}

/** 
 * Delete a key from the map.
 * Optionally, if value is passed, delete should only happen if (key, value) pair exists in the Map.
 */
 export const _mapDelete = <T, U>(batcher: Batcher<Map<T, U>>, key: T, value: U | typeof NO_VALUE_SYMBOL = NO_VALUE_SYMBOL): Batcher<Map<T, U>> => {
    if (_mapHas(batcher, key)) {
        batcher.willChange();
        batcher.currentValue.delete(key);
    }
    return batcher;
}

export type ForEachFn<T, U> = (key: T, value: U, map: Map<T, U>) => void;
/**
 * Check whether an array index is not void. Negative indexes will count backwards from end of the array.
 * Note: Passed function will be called with (key, value, map) argument order
 */
export const _mapForEach = <T, U>(batcher: Batcher<Map<T, U>>, fn: ForEachFn<T, U>): Batcher<Map<T, U>> => {
    /* Inverted ordering of key, value arguments */
    batcher.currentValue.forEach((value, key, map) => fn(key, value, map));
    return batcher;
}

/* TODO: Loosen types in copyArrays to return array of joined types */
/** Copy one or more arrays into a target array */
export const _mapSpread = <T, U>(batcher: Batcher<Map<T, U>>, copyMaps: Batcher<Map<T, U>>[]): Batcher<Map<T, U>> => {
    copyMaps.forEach(b => {
        _mapForEach(b, (key, value) => {
            _mapSet(batcher, key, value);
        })
    })
    return batcher;
}

export type FilterFn<T, U> = (key: T, value: U, map: Map<T, U>) => boolean

export const _mapFilter = <T, U>(batcher: Batcher<Map<T, U>>, fn: FilterFn<T, U>) : Batcher<Map<T, U>> => {
    if (batcher.isUnlocked) {
        return mapFilterForUnlocked(batcher, fn);
    }
    return mapFilterForLocked(batcher, fn);
}

/* TODO: Create copyUntil/copyRange for array and Map 
Performance optimization: cloning only happens once so we can risk more during a filter */

export const _mapMap = <T, U, V, W>(batcher: Batcher<Map<T, U>>, fn: (key: T, value: U, map: Map<T, U>) => [V, W]) : Batcher<Map<V, W>> => {
    /* TODO: Add full [key, value] pair check for rare scenario */
    const result : Map<V, W> = new Map();
    let hasAdded = false;
    _mapForEach(batcher, (key, value, map) => {
        let [newKey, newValue] = fn(key, value, map);
        result.set(newKey, newValue);
        if (!_mapHas(batcher, newKey as unknown as T, newValue as unknown as U)) {
            hasAdded = true;
        }
    })
    let batcher_ = batcher as unknown as Batcher<Map<V, W>>;    
    if (hasAdded || result.size !== batcher_.currentValue.size) {
        batcher_.willChange();
        batcher_.currentValue = result;
    }
    return batcher_;
}