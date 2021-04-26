import { Batcher } from '../batcher';
import { FilterFn, _setForEach } from './set-operations';

export const setFilterForLocked = <T, U>(batcher: Batcher<Set<T>>, fn: FilterFn<T>): Batcher<Set<T>> => {
    const result: Set<T> = new Set();
    let hasChanged = false;
    _setForEach(batcher, (value, set) => {
        if (fn(value, set)) {
            result.add(value);
        } else {
            hasChanged = true;
        }
    });
    if (hasChanged) {
        batcher.willChangeWithoutCloning();
        batcher.currentValue = result;
    }
    return batcher;
}