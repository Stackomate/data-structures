import { Batcher } from "../batcher";

export const cloneArray = <T>(initial: Array<T>) => [...initial];

export const createBatcher = <T>(target: Array<T>, mutate: boolean = false) => {
    return new Batcher(target, mutate, cloneArray);
};
interface Prepare {
    <T>(target: Array<T>, mutate?: boolean): Batcher<Array<T>>;
    <T>(target: undefined, mutate: undefined, batcher: Batcher<Array<T>>): Batcher<Array<T>>;
}

export const useArrayBatcher: Prepare = <T>(
    target?: Array<T>,
    mutate?: boolean,
    batcher?: Batcher<Array<T>>): Batcher<Array<T>> => {
    /* TODO: Remove as Array<T> */
    return batcher || createBatcher(target as Array<T>, mutate);
};

/* TODO: Create batchers from Arrays */