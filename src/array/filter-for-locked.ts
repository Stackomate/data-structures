import { Batcher } from '../batcher';
import { _arrForEach } from './array-operations';

export function arrFilterForLocked<T>(batcher: Batcher<T[]>, fn: (a: T) => boolean) {
    const result: Array<T> = [];
    let hasChanged = false;
    _arrForEach(batcher, item => {
        if (fn(item)) {
            result.push(item);
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
