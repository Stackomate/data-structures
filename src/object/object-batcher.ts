import { Batcher } from "../batcher";

export const cloneObject = <T extends Object>(initial: T): T => ({...initial});


export const createBatcher = <T extends Object>(target: T, mutate: boolean = false) => {
    return new Batcher(target, mutate, cloneObject);
};
interface Prepare {
    <T extends Object>(target: T, mutate?: boolean): Batcher<T>;
    <T extends Object>(target: undefined, mutate: undefined, batcher: Batcher<T>): Batcher<T>;
}

export const useObjectBatcher: Prepare = <T extends Object>(
    target?: T,
    mutate?: boolean,
    batcher?: Batcher<T>): Batcher<T> => {
    /* TODO: Remove as Array<T> */
    return batcher || createBatcher(target as T, mutate);
};
