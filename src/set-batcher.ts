import { Batcher } from "./batcher";

export const cloneSet = <T>(initial: Set<T>) => new Set<T>(initial);

export const createBatcher = <T>(target: Set<T>, mutate: boolean = false) => {
    return new Batcher(target, mutate, cloneSet);
};
interface Prepare {
    <T>(target: Set<T>, mutate?: boolean): Batcher<Set<T>>;
    <T>(target: undefined, mutate: undefined, batcher: Batcher<Set<T>>): Batcher<Set<T>>;
}

export const useSetBatcher: Prepare = <T>(
    target?: Set<T>,
    mutate?: boolean,
    batcher?: Batcher<Set<T>>): Batcher<Set<T>> => {
    /* TODO: Remove as Set<T> */
    return batcher || createBatcher(target as Set<T>, mutate);
};
