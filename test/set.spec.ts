import { arrFilterForUnlocked } from "../src/array/filter-for-unlocked"
import { batch } from "../src/batch-fn"
import { FilterFn } from "../src/map/map-operations"
import { useSetBatcher } from "../src/set-batcher"
import { _setAdd, _setIsEmpty, _setRemove, _setEquals, _setUnion, _setDifference, _setIntersection, _isSubSet, _isSuperSet, _setDisjoint, _setHas, _setSymmetricDifference, _setEvery, _setMap, _setForEach, _setFind, _setFilter} from "../src/sets/set-operations"

describe('Set exports', () => {
    describe('add', () => {
        it('should work as internal add', () => {
            let mySet = new Set([1, 2, 3, 4]);
            let batcher = useSetBatcher(mySet)
            _setAdd(batcher, 10);
            expect(batcher.currentValue).not.toBe(mySet);
            expect(batcher.currentValue).toEqual(new Set([1, 2, 3, 4, 10]));
        })

        it ('should keep reference', () => {
            let mySet = new Set([1, 2, 3, 4]);
            let batcher = useSetBatcher(mySet)
            _setAdd(batcher, 1);
            expect(batcher.currentValue).toBe(mySet);
            expect(batcher.currentValue).toEqual(new Set([1, 2, 3, 4]));            
        })
    })

    describe('remove', () => {
        it('should work as internal remove', () => {
            let mySet = new Set([1, 2, 3, 4, 10]);
            let batcher = useSetBatcher(mySet)
            _setRemove(batcher, 10);
            expect(batcher.currentValue).not.toBe(mySet);
            expect(batcher.currentValue).toEqual(new Set([1, 2, 3, 4]));
        })

        it ('should keep reference', () => {
            let mySet = new Set([1, 2, 3, 4]);
            let batcher = useSetBatcher(mySet)
            _setRemove(batcher, 10);
            expect(batcher.currentValue).toBe(mySet);
            expect(batcher.currentValue).toEqual(new Set([1, 2, 3, 4]));            
        })
    }) 
    
    describe('isEmpty', () => {
        it('should return true for a empty Set', () => {
            let mySet = new Set();
            let batcher = useSetBatcher(mySet);

            expect(_setIsEmpty(batcher)).toEqual(true);
        })

        it ('should return true for a non-empty Set', () => {
            let mySet = new Set([1, 2, 3, 4]);
            let batcher = useSetBatcher(mySet);

            expect(_setIsEmpty(batcher)).toEqual(false);        
        })
    })
    
    describe('has', () => {
        it('should return true for a item that is contained in set', () => {
            let mySet = new Set([1,2,3,4,5]);
            let batcher = useSetBatcher(mySet)
            expect(_setHas(batcher,4)).toEqual(true);
        })

        it('should return false for a item that is not contained in set', () => {
            let mySet = new Set([1,2,3,4,5]);
            let batcher = useSetBatcher(mySet)
            expect(_setHas(batcher,12)).toEqual(false);
        })

        it('should return true for a item in a empty set', () => {
            let mySet = new Set();
            let batcher = useSetBatcher(mySet)
            expect(_setHas(batcher,4)).toEqual(false);
        })
    })

    describe('equals', () => {
        it('should return true for a set that is equals in set1', () => {
            let mySet1 = new Set([1,2,3,4,5]);
            let batcher = useSetBatcher(mySet1);
            let mySet2 = new Set([5,4,3,2,1]);

            expect(_setEquals(batcher,mySet2)).toEqual(true);
        })

        it('should return true for a set that is equals in set1', () => {
            let mySet1 = new Set([1,2,3,4,5]);
            let batcher = useSetBatcher(mySet1);
            let mySet2 = new Set([1,2,3,4,5]);

            expect(_setEquals(batcher,mySet2)).toEqual(true);
        })

        it('should return false for a set that is not equals in set1', () => {
            let mySet1 = new Set([1,2,3,4,5]);
            let batcher = useSetBatcher(mySet1);
            let mySet2 = new Set([5,4,3,2,12]);

            expect(_setEquals(batcher,mySet2)).toEqual(false);
        })

        it('should return false for a set that is not equals a empty set', () => {
            let mySet1 = new Set();
            let batcher = useSetBatcher(mySet1);
            let mySet2 = new Set([5,4,3,2,12]);
            
            expect(_setEquals(batcher,mySet2)).toEqual(false);
        })

        it('should return true for mySet1 that is equals mySet2', () => {
            let mySet1 = new Set();
            let batcher = useSetBatcher(mySet1);
            let mySet2 = mySet1
            
            expect(_setEquals(batcher,mySet2)).toEqual(true);
        })
    })

    describe('union', () => {
        it('should return a union of  2 sets and not to be like any set', () => {
            let mySet = new Set([1, 2, 3, 4]);
            let mySet2 = new Set([5, 6, 7, 8]);
            let finalSet = new Set([1, 2, 3, 4, 5, 6, 7, 8]);
            let batcher = useSetBatcher(mySet);
            
            expect(_setUnion(batcher, mySet2).currentValue).toEqual(finalSet);
            expect(_setUnion(batcher, mySet2).currentValue).not.toBe(mySet);
            expect(_setUnion(batcher, mySet2).currentValue).not.toBe(mySet2);
        })

        it('should return a set just with values of first set, and be firstset or batcher', () => {
            let mySet = new Set([1, 2, 3, 4]);
            let mySet2 = new Set([]);
            let finalSet = new Set([1, 2, 3, 4]);
            let batcher = useSetBatcher(mySet);
            
            expect(_setUnion(batcher, mySet).currentValue).toEqual(finalSet);
            expect(_setUnion(batcher, mySet).currentValue).toBe(batcher.currentValue);
            expect(_setUnion(batcher, mySet).currentValue).not.toBe(mySet2);
        })
       
    })
    
    describe('difference', () => {
        it('should return a empty set and not to be like other set', () => {
            let mySet = new Set([5, 6, 7, 8]);
            let mySet2 = new Set([5, 6, 7, 8]);
            let finalSet = new Set([]);
            let batcher = useSetBatcher(mySet);
            
            expect(_setDifference(batcher, mySet2).currentValue).toEqual(finalSet);
            expect(_setDifference(batcher, mySet2).currentValue).not.toBe(mySet);
            expect(_setDifference(batcher, mySet2).currentValue).not.toBe(mySet2);
            expect(_setDifference(batcher, mySet2).currentValue).not.toBe(finalSet);
        })

        it('should return the elements of of mySet1 and batcher equals mySet1', () => {
            let mySet = new Set([1, 2, 3, 4]);
            let mySet2 = new Set([]);
            let finalSet = new Set();
            let batcher = useSetBatcher(mySet);

            expect(_setDifference(batcher, mySet2).currentValue).not.toEqual(finalSet);
            expect(_setDifference(batcher, mySet2).currentValue).toBe(mySet);
            expect(_setDifference(batcher, mySet2).currentValue).not.toBe(mySet2);
        })

        it('should return the elements of set2 and to be like any set', () => {
            let mySet2 = new Set([1, 2, 3, 4]);
            let mySet = new Set();
            let finalSet = new Set([]);
            let batcher = useSetBatcher(mySet);
            
            expect(_setDifference(batcher, mySet2).currentValue).toEqual(finalSet);
            expect(_setDifference(batcher, mySet2).currentValue).toBe(mySet);
            expect(_setDifference(batcher, mySet2).currentValue).not.toBe(mySet2);
        })
    }) 

    describe('intersection', () => {
        it('should return a set like final set and not to be like any set', () => {
            let mySet = new Set([1, 2, 3, 4]);
            let mySet2 = new Set([3, 4, 5, 6, 7]);
            let finalSet = new Set([3, 4]);
            let batcher = useSetBatcher(mySet);
            
            expect(_setIntersection(batcher, mySet2).currentValue).toEqual(finalSet);
            expect(_setIntersection(batcher, mySet2).currentValue).not.toBe(mySet);
            expect(_setIntersection(batcher, mySet2).currentValue).not.toBe(mySet2);
        })

        it('should return a set like finalSet empty, and not to be like any set', () => {
            let mySet = new Set([1, 2, 3, 4]);
            let mySet2 = new Set([8, 7, 5, 6]);
            let finalSet = new Set([]);
            let batcher = useSetBatcher(mySet);
            
            expect(_setIntersection(batcher, mySet2).currentValue).toEqual(finalSet);
            expect(_setIntersection(batcher, mySet2).currentValue).not.toBe(mySet);
            expect(_setIntersection(batcher, mySet2).currentValue).not.toBe(mySet2)
        })
    }) 

    describe('subset', () => {
        it('should return true for mySet1 that is not contained in mySet2', () => {
            let mySet1 = new Set([1,2]);
            let batcher = useSetBatcher(mySet1);
            let mySet2 = new Set([1, 2, 3, 4]);

            expect(_isSubSet(batcher, mySet2)).toEqual(true);
        })

        it('should return false for mySet1 that is not contained in mySet2', () => {
            let mySet1 = new Set([5,6]);
            let batcher = useSetBatcher(mySet1);
            let mySet2 = new Set([1, 2, 3, 4]);

            expect(_isSubSet(batcher, mySet2)).toEqual(false);
        })

        it('should return false for mySet1 that is bigger than mySet2', () => {
            let mySet1 = new Set([5, 6, 7, 8, 9 ]);
            let batcher = useSetBatcher(mySet1);
            let mySet2 = new Set([1, 2, 3, 4]);

            expect(_isSubSet(batcher, mySet2)).toEqual(false);
        })
    }) 

    describe('superset', () => {
        it('should return true for a mySet1 that contains mySet2', () => {
            let mySet1 = new Set([1, 2, 3, 4]);
            let batcher = useSetBatcher(mySet1);
            let mySet2 = new Set([1, 2]);

            expect(_isSuperSet(batcher, mySet1)).toEqual(true);
        })

        it('should return false for a mySet1 that is less than mySet2', () => {
            let mySet1 = new Set([5,6]);
            let batcher = useSetBatcher(mySet1);
            let mySet2 = new Set([1, 2, 3, 4]);

            expect(_isSuperSet(batcher, mySet2)).toEqual(false);
        })

        it('should return false for a mySet1 that not contains mySet2', () => {
            let mySet1 = new Set([5, 6, 7, 8, 9]);
            let batcher = useSetBatcher(mySet1);
            let mySet2 = new Set([1, 2, 3, 4]);

            expect(_isSuperSet(batcher, mySet2)).toEqual(false);
        })
    }) 

    describe('disjoint', () => {
        it('should return true for 2 sets that not has a intersection', () => {
            let mySet1 = new Set([1, 2, 3, 4]);
            let mySet2 = new Set([5, 6]);
            let batcher = useSetBatcher(mySet1);

            expect(_setDisjoint(batcher, mySet2)).toEqual(true);
        })

        it('should return false for 2 sets that has a intersection', () => {
            let mySet1 = new Set([1, 2, 3, 4]);
            let mySet2 = new Set([3, 4]);
            let batcher = useSetBatcher(mySet1);

            expect(_setDisjoint(batcher, mySet2)).toEqual(false);
        })
    }) 

    describe('symetric difference', () => {
        // it('should be equal the values that not is not contained in two sets', () => {
        //     let mySet1 = new Set([1, 2, 3, 4, 5]);
        //     let mySet2 = new Set([5, 6]);
        //     let finalSet = new Set([1, 2, 3, 4, 6]);
        //     let batcher = useSetBatcher(mySet1);
            
        //     expect(_setSymmetricDifference(batcher, mySet2).currentValue).toEqual(finalSet);
        // })

        it('should be equal the values that not is not contained in two sets', () => {
            let mySet1 = new Set([5, 6]);
            let mySet2 = new Set([1, 2, 3, 4, 5]);
            let finalSet = new Set([1, 2, 3, 4, 6]);
            let batcher = useSetBatcher(mySet1);
            
            expect(_setSymmetricDifference(batcher, mySet2).currentValue).toEqual(finalSet);
        })

        // it('should not be mySet1', () => {
        //     let mySet1 = new Set([1, 2, 3, 4, 5]);
        //     let mySet2 = new Set([5, 6]);
        //     let batcher = useSetBatcher(mySet1);
            
        //     expect(_setSymmetricDifference(batcher, mySet2)).not.toBe(mySet1);
        // })

        // it('should not be mySet2', () => {
        //     let mySet1 = new Set([1, 2, 3, 4, 5]);
        //     let mySet2 = new Set([5, 6]);
        //     let batcher = useSetBatcher(mySet1);
            
        //     expect(_setSymmetricDifference(batcher, mySet2)).not.toBe(mySet2);
        // })
    })

    describe('every', () => {
        it('should return true for a set that has only even numbers', () => {
            let mySet1 = new Set([2, 4, 6, 8]);
            let batcher = useSetBatcher(mySet1);

            expect(_setEvery(batcher, (i => i % 2 === 0))).toEqual(true);
        })
        it('should return true for a set that has not only even numbers', () => {
            let mySet1 = new Set([2, 4, 6, 8, 9]);
            let batcher = useSetBatcher(mySet1);

            expect(_setEvery(batcher, (i => i % 2 === 0))).toEqual(false);
        })
    })

    describe('map', () => {
        it('should a set where all element is i*2', () => {
            let mySet1 = new Set([1, 2, 3, 4]);
            let finalSet = new Set([2, 4, 6, 8]);
            let batcher = useSetBatcher(mySet1);

            expect(_setMap(batcher, (i => i * 2)).currentValue).toEqual(finalSet);
        })
    })

    describe('foreach', () => {
        it('should make a empty set equal to a initial set', () => {
            let initialSet = new Set([1, 2, 3, 4])
            let emptySet = new Set();
            _setForEach(useSetBatcher(initialSet), (i) => { 
                emptySet.add(i); 
            })
            expect(emptySet).toEqual(initialSet);
        })
    })


    describe('find', () => {
        it('should find the first element where i % 2 === 0', () => {
            let mySet1 = new Set([1, 2, 3, 4]);
            let batcher = useSetBatcher(mySet1);

            expect(_setFind((batcher), (i) => { 
                return i % 2 === 0; 
            })).toEqual(2);
        })
    })

    describe('filter', () => {
        it('should a set where all element is i*2', () => {
            let mySet1 = new Set([1, 2, 3, 4]);
            let batcher = useSetBatcher(mySet1); 

            expect(_setFilter(batcher, (i) => {
                return i % 2 === 0;
            }).currentValue).toEqual(new Set([2, 4]));
            expect(_setFilter(batcher, (i) => {
                return i === 2;
            }).currentValue).toEqual(new Set([2]));
        })
    })
})