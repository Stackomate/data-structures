/**
 * Adds a new tuple of objects to the TupleSet
 * @param firstItem First object of the tuple
 * @param secondItem Second object of the tuple
 */
export const _btsAdd = <K, V>(bts: BidirectionalTupleSet<K, V>, firstItem: K, secondItem: V): BidirectionalTupleSet<K, V> => {
    /* Find respective set of t2s for specified t1. If t1 not existent, create new Set */
    const keyInnerSet = bts.normalMap.has(firstItem) ? bts.normalMap.get(firstItem) as Set<V> : new Set<V>();
    const initialSetSize = keyInnerSet.size;
    bts.normalMap.set(firstItem, keyInnerSet.add(secondItem));
    /* Update size */
    bts._size += (keyInnerSet.size - initialSetSize);

    /* Find respective set of t1s for specified t2. If t2 not existent, create new Set */
    const valueInnerSet = bts.inverseMap.has(secondItem) ? bts.inverseMap.get(secondItem) as Set<K> : new Set<K>();
    bts.inverseMap.set(secondItem, valueInnerSet.add(firstItem));

    return bts;
}

/**
 * If provided 1 argument, checks if some tuple beginning with the object exists in the set.
 * If provided 2 arguments, checks if the tuple [firstItem, secondItem] exists in the set.
 * @param firstItem First object in the tuple
 * @param secondItem Optional, second object in the tuple
 */
export const _btsHas = <K, V>(bts: BidirectionalTupleSet<K, V>, ...args: [K] | [K, V]): boolean => {
    switch (args.length) {
        case 1:
            const firstItem = args[0];
            return bts.normalMap.has(firstItem);
        case 2:
            const [t1, t2] = args;
            return bts.normalMap.has(t1) && (bts.normalMap.get(t1) as Set<V>).has(t2);
    }
}

/**
 * If provided 1 argument, checks if some tuple ending with the object exists in the set.
 * If provided 2 arguments, checks if the tuple [firstItem, secondItem] exists in the set (arguments are inverted).
 * @param secondItem Second object in the tuple
 * @param firstItem Optional, First object in the tuple
 */
export const _btsInverseHas = <K, V>(bts: BidirectionalTupleSet<K, V>, ...args: [V] | [V, K]): boolean => {
    switch (args.length) {
        case 1:
            const secondItem = args[0];
            return bts.inverseMap.has(secondItem);
        case 2:
            const [t2, t1] = args;
            return bts.inverseMap.has(t2) && (bts.inverseMap.get(t2) as Set<K>).has(t1);
    }
}

/**
 * Get the set of tuple's second objects that begin with a given object.
 * @param firstItem Object for First Tuple item
 */
export const _btsGet = <K, V>(bts: BidirectionalTupleSet<K, V>, firstItem: K) => {
    return bts.normalMap.get(firstItem) || new Set();
}

/**
 * Get the set of tuple's first objects that end with a given object.
 * @param secondItem Object for Last Tuple item
 */
export const _btsInverseGet = <K, V>(bts: BidirectionalTupleSet<K, V>, secondItem: V) => {
    return bts.inverseMap.get(secondItem) || new Set();
}

/**
 * If provided 1 argument, will delete all tuples starting with the object (if any)
 * If provided 2 arguments, will delete the tuple [firstItem, secondItem] (if existent)
 * @param args Array representing tuple arguments.
 */
export const _btsDelete = <K, V>(bts: BidirectionalTupleSet<K, V>, ...args: [K] | [K, V]): BidirectionalTupleSet<K, V> => {
    switch (args.length) {
        case 1:
            /* Before deleting the t1 key from normalMap, find all respective t2s and delete t1 in inverseMap */
            const t1 = args[0];
            if (bts.normalMap.has(t1)) {
                const t2Objects = bts.normalMap.get(t1) as Set<V>;
                const initialSetSize = t2Objects.size;
                t2Objects.forEach((t2) => {
                    /* t2 could have already been deleted from inverseMap, needs to be checked for existence */
                    if (bts.inverseMap.has(t2)) {
                        let keys = bts.inverseMap.get(t2) as Set<K>;
                        keys.delete(t1);
                        /* Delete set from inverseMap if empty */
                        if (keys.size === 0) {
                            bts.inverseMap.delete(t2);
                        }
                    }

                });
                /* Update size */
                bts._size += (-initialSetSize);
            }
            /* Finally, delete the t1 key from normalMap */
            bts.normalMap.delete(t1);
            return bts;
        case 2:
            const [key, value] = args;
            if (bts.normalMap.has(key)) {
                const innerValuesSet = bts.normalMap.get(key) as Set<V>;
                const initialSetSize = innerValuesSet.size;
                innerValuesSet.delete(value);
                /* Update size */
                bts._size += (innerValuesSet.size - initialSetSize);
                /* If last object deleted, we can delete the key too (free memory)*/
                if (innerValuesSet.size === 0) {
                    bts.normalMap.delete(key);
                }
            }

            /* Now delete in the inverse operation */
            if (bts.inverseMap.has(value)) {
                const innerKeysSet = bts.inverseMap.get(value) as Set<K>;
                innerKeysSet.delete(key);
                /* If last object deleted, we can delete the value too (free memory)*/
                if (innerKeysSet.size === 0) {
                    bts.inverseMap.delete(value);
                }
            }
            return bts;
    }
}


/**
 * Invert Tuple and convert to Map
 */
export const _btsToInverseMap = <K, V>(bts: BidirectionalTupleSet<K, V>) => {
    return bts.inverseMap;
}


/**
 * If provided 1 argument, will delete all tuples ending with the object (if any)
 * If provided 2 arguments, will delete the tuple [t1, t2] (if existing)
 * @param args Array representing tuple arguments
 */
export const _btsInverseDelete = <K, V>(bts: BidirectionalTupleSet<K, V>, ...args: [V] | [V, K]): BidirectionalTupleSet<K, V> => {
    switch (args.length) {
        case 1:
            /* Before deleting the t2 key from inverseMap, find all respective t1s and delete t2 in normalMap */
            const t2 = args[0];
            if (bts.inverseMap.has(t2)) {
                const t1Objects = bts.inverseMap.get(t2) as Set<K>;
                const initialSetSize = t1Objects.size;
                t1Objects.forEach((t1) => {
                    /* t2 could have already been deleted from inverseMap, needs to be checked for existence */
                    if (bts.normalMap.has(t1)) {
                        let values = bts.normalMap.get(t1) as Set<V>;
                        values.delete(t2);
                        /* Delete set from inverseMap if empty */
                        if (values.size === 0) {
                            bts.normalMap.delete(t1);
                        }
                    }

                });
                /* Update size */
                bts._size += (-initialSetSize);
            }
            /* Finally, delete the t1 key from normalMap */
            bts.inverseMap.delete(args[0]);
            return bts;
        case 2:
            const [value, key] = args;
            if (bts.inverseMap.has(value)) {
                const innerKeysSet = bts.inverseMap.get(value) as Set<K>;
                const initialSetSize = innerKeysSet.size;
                innerKeysSet.delete(key);
                /* Update size */
                bts._size += (innerKeysSet.size - initialSetSize);
                /* If last object deleted, we can delete the key too (free memory)*/
                if (innerKeysSet.size === 0) {
                    bts.inverseMap.delete(value);
                }
            }

            /* Now delete in the inverse operation */
            if (bts.normalMap.has(key)) {
                const innerValuesSet = bts.normalMap.get(key) as Set<V>;
                innerValuesSet.delete(value);
                /* If last object deleted, we can delete the value too (free memory)*/
                if (innerValuesSet.size === 0) {
                    bts.normalMap.delete(key);
                }
            }
            return bts;
    }
}

/**
 * Get the total number of relationships stored.
 */
export const _btsSize = <K, V>(bts: BidirectionalTupleSet<K, V>) => {
    return bts._size;
}

/**
 * Convert to Map
 */
export const _btsToMap = <K, V>(bts: BidirectionalTupleSet<K, V>) => {
    return bts.normalMap;
}

/** Loop through BidirectionalTupleSet items */
export const _btsForEach = <K, V>(bts: BidirectionalTupleSet<K, V>, callbackfn: (pair: [K, V], map: BidirectionalTupleSet<K, V>) => void, thisArg?: any) => {
    [...bts[Symbol.iterator]()].forEach((pair, index, arr) => callbackfn(pair, bts), thisArg)
}


/** Returns new BidirectionalTupleSet with inverted keys and values */
export const _btsInvert = <K, V>(bts: BidirectionalTupleSet<K, V>) => {
    return new BidirectionalTupleSet([..._btsEntries(bts)].map(([value, key]) => [key, value]))
}

/**
 * Convert to Array
 */
export const _btsToArray = <K, V>(bts: BidirectionalTupleSet<K, V>): Array<[K, V]> => {
    const result: Array<[K, V]> = [];
    bts.normalMap.forEach((t1Set, t1) => {
        t1Set.forEach((t2) => {
            result.push([t1, t2]);
        });
    });
    return result;
}

/**
 * Invert Tuple and Convert to Array
 */
export const _btsToInverseArray = <K, V>(bts: BidirectionalTupleSet<K, V>): Array<[V, K]> => {
    const result: Array<[V, K]> = [];
    bts.inverseMap.forEach((t2Set, t2) => {
        t2Set.forEach((t1) => {
            result.push([t2, t1]);
        });
    });
    return result;
}


export const _btsClear = <K, V>(bts: BidirectionalTupleSet<K, V>) => {
    bts.normalMap.clear();
    bts.inverseMap.clear();
    bts._size = 0;
    return this;
}


/** Returns iterator containing only Keys of the Map */
export const _btsFirstKeys = <K, V>(bts: BidirectionalTupleSet<K, V>) => {
    return bts.normalMap.keys()
}

export const _btsSecondKeys = <K, V>(bts: BidirectionalTupleSet<K, V>) => {
    return bts.inverseMap.keys();
}

export const _btsEntries = <K, V>(bts: BidirectionalTupleSet<K, V>) => {
    return [...bts[Symbol.iterator]()];
}


/* Adapted from: https://github.com/LabShare/data-structures/blob/master/src/bidirectional-tuple-set/bidirectional-tuple-set.ts */
/**
 * Tuple Set is similar to a Set, but it lets you specify a tuple of objects [k, v] instead,
 * allowing for tuple lookup in O(1).
 * Bidirectional means you can also do the inverse lookup in O(1).
 * NOTE: This is currently a MUTABLE structure.
 */
export class BidirectionalTupleSet<K, V> {

    /* Internal Map representing t1 => t2 relationships */
    public normalMap: Map<K, Set<V>> = new Map();
    /* Internal Map representing t2 => t1 relationships */
    public inverseMap: Map<V, Set<K>> = new Map();

    /** Creates a new BidirectionalTupleSet.
     * Accepts an iterable for initial values.
     */
    constructor(iterable: Iterable<[K, V]> = []) {
        for (let [key, value] of iterable) {
            _btsAdd(this, key, value);
        }
    }

    public _size = 0;

    /**
     * Get the total number of relationships stored.
     */
    get size() {
        return this._size;
    }

    /* TODO: Return type? */
    *[Symbol.iterator]() {
        for (let [mapKey, mapSet] of this.normalMap) {
            for (let value of mapSet) {
                yield [mapKey, value] as [K, V];
            }
        }
    }

    toString() {
        return '[object BidirectionalTupleSet]'
    }

}