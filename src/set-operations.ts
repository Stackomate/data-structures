import {Batcher} from './batcher';
import { useSetBatcher } from "./set-batcher";

type addWithTarget<T> = {target: Set<T>, item: T, mutate?: boolean};
type addWithBatcher<T> = {item: T, batcher: Batcher<Set<T>>};

interface Add {
    <T>(opts: addWithTarget<T> | addWithBatcher<T>): Batcher<Set<T>>
}

const batcherFromOptions = <T>(
    options: {target: Set<T>, mutate?: boolean} | {batcher: Batcher<Set<T>>}
) => {
    if ('batcher' in options) {
        return options.batcher;
    } else {
        return useSetBatcher(options.target, options.mutate);
    }
}

export const add: Add = <T>(options: addWithTarget<T> | addWithBatcher<T>) : Batcher<Set<T>> => {
  let {item} = options;
  let h = batcherFromOptions(options);

  if (!h.currentValue.has(item)) {
    h.willChange();
    h.currentValue.add(item);
  }
  return h;
}


type removeWithTarget<T> = {target: Set<T>, item: T, mutate?: boolean};
type removeWithBatcher<T> = {item: T, batcher: Batcher<Set<T>>};

interface Remove {
    <T>(opts: removeWithTarget<T> | removeWithBatcher<T>): Batcher<Set<T>>
}

export const remove: Remove = <T>(options: removeWithTarget<T> | removeWithBatcher<T>): Batcher<Set<T>> => {
  let {item} = options;
  let h = batcherFromOptions(options);

  if (h.currentValue.has(item)) {
    h.willChange();
    h.currentValue.delete(item);
  }
  return h;
}
type filterWithTarget<T> = {target: Set<T>, fn: (item: T) => boolean, mutate?: boolean};

type filterWithBatcher<T> = {fn: (item: T) => boolean, batcher: Batcher<Set<T>>};

interface Filter {
    <T>(opts: filterWithTarget<T> | filterWithBatcher<T>): Batcher<Set<T>>
}

/* TODO: Improve types for fn */
export const filter: Filter = <T>(options: filterWithTarget<T> | filterWithBatcher<T>): Batcher<Set<T>> => {
  let batcher = batcherFromOptions(options);

  for (let item of batcher.currentValue) {
    if (!options.fn(item)) {
      batcher.willChange();
      batcher = remove({item, batcher});
    }
  }
  return batcher;
}