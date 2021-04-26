import { Batcher } from "../batcher";

export const cloneMap = <T, S>(initial: Map<T, S>) => new Map(initial);

export const createBatcher = <T, S>(target: Map<T, S>, mutate: boolean = false) => {
    return new Batcher(target, mutate, cloneMap);
};
interface Prepare {
    <T, S>(target: Map<T, S>, mutate?: boolean): Batcher<Map<T, S>>;
    <T, S>(target: undefined, mutate: undefined, batcher: Batcher<Map<T, S>>): Batcher<Map<T, S>>;
}

export const useMapBatcher: Prepare = <T, S>(
    target?: Map<T, S>,
    mutate?: boolean,
    batcher?: Batcher<Map<T, S>>): Batcher<Map<T, S>> => {
    /* TODO: Remove as Array<T> */
    return batcher || createBatcher(target as Map<T, S>, mutate);
};