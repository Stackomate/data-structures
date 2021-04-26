import { batch } from "../src/batch-fn"
import { Batcher } from "../src/batcher"
import { useMapBatcher } from "../src/map/map-batcher"
import {_mapClear, _mapDelete, _mapEntries, _mapFilter, _mapForEach, _mapGet, _mapHas, _mapKeys, _mapMap, _mapSet, _mapSize, _mapSpread, _mapValues } from "../src/map/map-operations"
import { useSetBatcher } from "../src/set-batcher"


describe('map exports', () => {
    describe('has', () => {
        it('should return true for a key that is in Map', () => {
            let myMap = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
            let batcher = useMapBatcher(myMap)
            expect(_mapHas(batcher, 'a', 1)).toEqual(true);
        })

        it('should return false for a key that is not in Map', () => {
            let myMap = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
            let batcher = useMapBatcher(myMap);
            expect(_mapHas(batcher, 'f', 1)).toEqual(false);
        })

        it('should return false for a key that is in Map, but his value is incorrect', () => {
            let myMap = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
            let batcher = useMapBatcher(myMap);
            expect(_mapHas(batcher, 'a', 2)).toEqual(false);
        })

        it('should return true for a key that is in Map, but his value is not passed as a parameter', () => {
            let myMap = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
            let batcher = useMapBatcher(myMap);
            expect(_mapHas(batcher, 'a')).toEqual(true);
        })

    }) 

    describe('size', () => {
        it('should be equal the number of keys that is in Map that is not empty', () => {
            let myMap = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
            let batcher = useMapBatcher(myMap);
            expect(_mapSize(batcher)).toEqual(5);
        })

        it('should be equal 0 for a Map that is empty', () => {
            let myMap = new Map([]);
            let batcher = useMapBatcher(myMap);
            expect(_mapSize(batcher)).toEqual(0);
        })
    })

    describe('get', () => {
        it('should return the value of a key', () => {
            let myMap = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
            let batcher = useMapBatcher(myMap);
            expect(_mapGet(batcher, 'a')).toEqual(1);
        })

        it('should return undefined for a key that not exists', () => {
            let myMap = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
            let batcher = useMapBatcher(myMap);
            expect(_mapGet(batcher, 'f')).toEqual(undefined);
        })
    })

    describe('set', () => {
        it('should add a key and return a Map equal a final map, but not be finalMap', () => {
            let myMap = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
            let finalMap = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5], ['f', 6]]);
            let batcher = useMapBatcher(myMap);
            expect(_mapSet(batcher, 'f', 6).currentValue).toEqual(finalMap);
            expect(batcher.currentValue).not.toBe(finalMap);
        })

        it('should add a key that exists and return a Map equal myMap, and be myMap', () => {
            let myMap = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
            let batcher = useMapBatcher(myMap);
            expect(_mapSet(batcher, 'a', 1).currentValue).toEqual(myMap);
            expect(batcher.currentValue).toBe(myMap);
        })

    })

    describe('keys', () => {
        it('should return all keys of myMap', () => {
            let myMap = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
            let batcher = useMapBatcher(myMap);

            expect([..._mapKeys(batcher)]).toEqual(['a', 'b', 'c', 'd', 'e']);
            expect(batcher.currentValue).toBe(myMap);
        })

    })

    describe('values', () => {
        it('should return all values of myMap', () => {
            let myMap = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
            let batcher = useMapBatcher(myMap);

            expect([..._mapValues(batcher)]).toEqual([1, 2, 3, 4, 5]);
            expect(batcher.currentValue).toBe(myMap);
        })

    })

    describe('entries', () => {
        it('should return all values and keys of myMap', () => {
            let myMap = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
            let batcher = useMapBatcher(myMap);

            expect([..._mapEntries(batcher)]).toEqual([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
            expect(batcher.currentValue).toBe(myMap);
        })

    })

    describe('clear', () => {
        it('should remove all values of myMap', () => {
            let myMap = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
            let batcher = useMapBatcher(myMap);

            expect(_mapClear(batcher).currentValue).toEqual(new Map([]));
            //unlocked test
            _mapSet(batcher, 'f', 6);
            expect(_mapClear(batcher).currentValue).toEqual(new Map([]));
            expect(batcher.currentValue).not.toBe(myMap);
        })

        it('myMap should be batcher currentValue', () => {
            let myMap = new Map([]);
            let batcher = useMapBatcher(myMap);

            expect(batcher.currentValue).toBe(myMap);
        })

    })

    describe('delete', () => {
        it('should remove a value of a referenced key myMap', () => {
            let myMap = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
            let batcher = useMapBatcher(myMap);

            expect(_mapDelete(batcher, 'b').currentValue).toEqual(new Map([['a', 1], ['c', 3], ['d', 4], ['e', 5]]));
            expect(batcher.currentValue).not.toBe(myMap);
        })

        it('should npt remove a value of a inexistent key in myMap', () => {
            let myMap = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
            let batcher = useMapBatcher(myMap);

            expect(_mapDelete(batcher, 'f').currentValue).toEqual(new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]));
            expect(batcher.currentValue).toBe(myMap);
        })

    })

    describe('foreach', () => {
        it('should make a empty map equal to myMap', () => {
            let myMap = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
            let emptyMap = new Map([]) ;
            let batcher = useMapBatcher(myMap);

            _mapForEach(batcher, (i, j) => { 
                emptyMap.set(i, j); 
            })
            expect(emptyMap).toEqual(batcher.currentValue);
            expect(emptyMap).not.toBe(batcher.currentValue);
            expect(myMap).toBe(batcher.currentValue);
        })
    })

    describe('spread', () => {
        it('should pass keys and values to another spread', () => {
            let myMap = new Map([['a', 1]]);
            let batcher = useMapBatcher(myMap);
            let copyMaps: Batcher<Map<string, number>>[] = [useMapBatcher(new Map([['b', 2]]))];

            expect(_mapSpread(batcher, copyMaps).currentValue).not.toEqual(myMap);
        })
    })

    describe('filter', () => {
        it('should return even values', () => {
            let myMap = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
            let batcher = useMapBatcher(myMap);

            expect(_mapFilter(batcher, (i, j) => (j % 2 === 0)).currentValue).toEqual(new Map([['b', 2], ['d', 4]]));
            //unlocked test
            expect(_mapFilter(batcher, (i, j) => {
                return  j === 2;
            }).currentValue).toEqual(new Map([['b', 2]]));
            expect(batcher.currentValue).not.toBe(myMap);
        })
    })

    describe('map', () => {
        it('should a set where all element is i*2', () => {
            let myMap = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
            let batcher = useMapBatcher(myMap);

            expect( _mapMap(batcher, (i, j) => ([i, j * 2])).currentValue).toEqual(new Map([['a', 2], ['b', 4], ['c', 6], ['d', 8], ['e', 10]]));
        })
    })
   
})