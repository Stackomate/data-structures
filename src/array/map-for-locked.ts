import { Batcher } from '../batcher';
import { _arrForEach } from './array-operations';

export function arrMapForLocked<T, U>(batcher: Batcher<T[]>, fn: (a: T) => U) : Batcher<U[]> {
    const result: Array<U> = [];
    let hasChanged = false;
    let batcher_ = batcher as unknown as Batcher<U[]>;
    _arrForEach(batcher, item => {
        const itemOutput = fn(item);
        if ((itemOutput as any) !== (item as any)) {
            hasChanged = true;
        }
        result.push(itemOutput);
    });
    if (hasChanged) {
        batcher_.willChangeWithoutCloning();
        batcher_.currentValue = result;
    }
    return batcher_;
}
