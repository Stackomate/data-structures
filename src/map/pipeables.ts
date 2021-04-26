import { Batcher } from "../batcher";
import { FilterFn, ForEachFn, NO_VALUE_SYMBOL, _mapClear, _mapDelete, _mapEntries, _mapFilter, _mapForEach, _mapGet, _mapHas, _mapKeys, _mapMap, _mapSet, _mapSize, _mapSpread, _mapValues } from "./map-operations";

export const mapHas = <T, U>(key: T, value: U | typeof NO_VALUE_SYMBOL = NO_VALUE_SYMBOL) => (batcher: Batcher<Map<T, U>>): boolean => _mapHas(batcher, key, value);
export const $mapHas = <T, U>(batcher: Batcher<Map<T, U>>) => (key: T, value: U | typeof NO_VALUE_SYMBOL = NO_VALUE_SYMBOL) : boolean => _mapHas(batcher, key, value);

export const mapSize = <T, U> () => (batcher: Batcher<Map<T, U>>): number => _mapSize(batcher); 
export const $mapSize =  <T, U> (batcher: Batcher<Map<T, U>>) => (): number => _mapSize(batcher); 

export const mapGet = <T, U>(key: T) => (batcher: Batcher<Map<T, U>>): U | undefined => _mapGet(batcher, key);
export const $mapGet = <T, U>(batcher: Batcher<Map<T, U>>) => (key: T) : U | undefined => _mapGet(batcher, key);

export const mapSet = <T, U> (key: T, value: U) => (batcher: Batcher<Map<T, U>>): Batcher<Map<T, U>> => _mapSet(batcher, key, value);
export const $mapSet = <T, U> (batcher: Batcher<Map<T, U>>) => (key: T, value: U) : Batcher<Map<T, U>> => _mapSet(batcher, key, value);

export const mapKeys = <T, U> () => (batcher: Batcher<Map<T, U>>): IterableIterator<T> => _mapKeys(batcher);
export const $mapKeys = <T, U> (batcher: Batcher<Map<T, U>>) => () : IterableIterator<T> => _mapKeys(batcher);

export const mapValues = <T, U>() => (batcher: Batcher<Map<T, U>>): IterableIterator<U> => _mapValues(batcher);
export const $mapValues = <T, U> (batcher: Batcher<Map<T, U>>) => () : IterableIterator<U> => _mapValues(batcher);

export const mapEntries = <T, U> () => (batcher: Batcher<Map<T, U>>): IterableIterator<[T, U]> => _mapEntries(batcher);
export const $mapEntries = <T, U> (batcher: Batcher<Map<T, U>>) => () : IterableIterator<[T, U]> => _mapEntries(batcher);

export const mapClear = <T, U> () => (batcher: Batcher<Map<T, U>>): Batcher<Map<T,U>> => _mapClear(batcher);
export const $mapClear = <T, U> (batcher: Batcher<Map<T, U>>) => () : Batcher<Map<T,U>> => _mapClear(batcher);

export const mapDelete = <T, U> (key: T, value: U | typeof NO_VALUE_SYMBOL = NO_VALUE_SYMBOL) => (batcher: Batcher<Map<T, U>>) : Batcher<Map<T, U>> => _mapDelete(batcher, key, value);
export const $mapDelete = <T, U> (batcher: Batcher<Map<T, U>>) => (key: T, value: U | typeof NO_VALUE_SYMBOL = NO_VALUE_SYMBOL) : Batcher<Map<T, U>> => _mapDelete(batcher, key, value);

export const mapForEach = <T, U> (fn: ForEachFn<T, U>) => (batcher: Batcher<Map<T, U>>) : Batcher<Map<T, U>> => _mapForEach(batcher, fn);
export const $mapForEach = <T, U> (batcher: Batcher<Map<T, U>>) => (fn: ForEachFn<T, U>) : Batcher<Map<T, U>> => _mapForEach(batcher, fn);

export const mapSpread = <T, U> (...copyMaps: Batcher<Map<T, U>>[]) => (batcher: Batcher<Map<T, U>>) => _mapSpread(batcher, copyMaps);
export const $mapSpread = <T, U> (batcher: Batcher<Map<T, U>>) => (...copyMaps: Batcher<Map<T, U>>[]) => _mapSpread(batcher, copyMaps);

export const mapFilter = <T, U> (fn: FilterFn<T, U>) => (batcher: Batcher<Map<T, U>>) : Batcher<Map<T, U>> => _mapFilter(batcher, fn);
export const $mapFilter = <T, U> (batcher: Batcher<Map<T, U>>) => (fn: FilterFn<T, U>) : Batcher<Map<T, U>> => _mapFilter(batcher, fn); 

export const mapMap = <T, U, V, W>(fn: (key: T, value: U, map: Map<T, U>) => [V, W]) => (batcher: Batcher<Map<T, U>>) : Batcher<Map<V, W>> => _mapMap(batcher, fn);
export const $mapMap = <T, U, V, W> (batcher: Batcher<Map<T, U>>) => (fn: (key: T, value: U, map: Map<T, U>) => [V, W]) : Batcher<Map<V, W>> => _mapMap(batcher, fn);

