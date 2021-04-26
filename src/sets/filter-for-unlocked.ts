import { Batcher } from '../batcher';
import { FilterFn, _setForEach } from './set-operations';


/* This is a protected function, therefore should not be exposed in the public api */
export const setFilterForUnlocked = <T>(batcher: Batcher<Set<T>>, fn: FilterFn<T>): Batcher<Set<T>> => {
    let deleted = false;
    _setForEach(batcher, (value, set) => {    
        if (!fn(value, set)) {
            deleted = true;
            batcher.currentValue.delete(value);
        }
    });
    if (deleted) {
        batcher.willChangeWithoutCloning();
    }
    return batcher;
};
