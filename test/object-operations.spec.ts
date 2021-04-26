import { Batcher } from "../src/batcher"
import { useObjectBatcher } from "../src/object/object-batcher"
import {_objGet, _objHas, _objSet, _objKeys, _objValues, _objEntries, _objClear, _objDelete, _objForEach, _objSpread, _objMap} from "../src/object/object-operations"

describe('obj exports', () => {
    describe('has', () => {
        it('should return true for keys that is contained in myObj', () => {
            let myObj = {a: 1};
            let batcher = useObjectBatcher(myObj);

            expect(_objHas(batcher as any, '')).toEqual(false);
        })

    })

    describe('get', () => {
        it('should return a value of myObj', () => {
            let myObj = {a: 1};
            let batcher = useObjectBatcher(myObj);

            expect(_objGet(batcher, 'a')).toEqual(1);
            expect(batcher.currentValue).toBe(myObj);
        })
    })

    describe('set', () => {
        it('should add a new key and return a obj with "f" key', () => {
            let myObj: {a: number, b: number, c: number, d: number, e: number, f?: number} = {a: 1, b: 2, c: 3, d: 4, e: 5};
            let batcher = useObjectBatcher(myObj);

            expect(_objSet(batcher, 'f' , 6)).toEqual({a: 1, b: 2, c: 3, d: 4, e: 5, f:6});
            expect(batcher.currentValue).not.toBe(myObj);
        })

        it('should add a key that exists and set a new value to key "e" ', () => {
            let myObj: {a: number, b: number, c: number, d: number, e: number} = {a: 1, b: 2, c: 3, d: 4, e: 5};
            let batcher = useObjectBatcher(myObj);

            expect(_objSet(batcher, 'e' , 10)).toEqual({a: 1, b: 2, c: 3, d: 4, e: 10});
            expect(batcher.currentValue).not.toBe(myObj);
        })

        it('should add a key that exists and set the same value to key "e" ', () => {
            let myObj: {a: number, b: number, c: number, d: number, e: number} = {a: 1, b: 2, c: 3, d: 4, e: 5};
            let batcher = useObjectBatcher(myObj);

            expect(_objSet(batcher, 'e' , 5)).toEqual({a: 1, b: 2, c: 3, d: 4, e: 5});
            expect(batcher.currentValue).toBe(myObj);
        })
    })

    describe('keys', () => {
        it('should return all keys of myObj', () => {
            let myObj: {a: number, b: number, c: number, d: number, e: number} = {a: 1, b: 2, c: 3, d: 4, e: 5};
            let batcher = useObjectBatcher(myObj);

            expect([..._objKeys(batcher)]).toEqual(['a', 'b', 'c', 'd', 'e']);
            expect(batcher.currentValue).toBe(myObj);
        })

    })

    describe('values', () => {
        it('should return all values of myObj', () => {
            let myObj: {a: number, b: number, c: number, d: number, e: number} = {a: 1, b: 2, c: 3, d: 4, e: 5};
            let batcher = useObjectBatcher(myObj);

            expect([..._objValues(batcher)]).toEqual([1, 2, 3, 4, 5]);
            expect(batcher.currentValue).toBe(myObj);
        })

    })

    describe('entries', () => {
        it('should return all values and keys of myObj', () => {
            let myObj: {a: number, b: number, c: number, d: number, e: number} = {a: 1, b: 2, c: 3, d: 4, e: 5};
            let batcher = useObjectBatcher(myObj);
            
            expect([..._objEntries(batcher)]).toEqual([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
            expect(batcher.currentValue).toBe(myObj);
        })

    })

    describe('clear', () => {
        it('should remove all values of myMap', () => {
            let myObj: {a: number, b: number, c: number, d: number, e: number} = {a: 1, b: 2, c: 3, d: 4, e: 5};
            let batcher = useObjectBatcher(myObj);

            expect(_objClear(batcher).currentValue).toEqual({});
            expect(batcher.currentValue).not.toBe(myObj);
        })

        it('myMap should be batcher currentValue', () => {
            let myMap = {};
            let batcher = useObjectBatcher(myMap);

            expect(batcher.currentValue).toBe(myMap);
        })

    })

    describe('delete', () => {
        it('should remove a value of a referenced key myMap', () => {
            let myObj: {a: number, b: number, c: number, d: number, e: number} = {a: 1, b: 2, c: 3, d: 4, e: 5};
            let batcher = useObjectBatcher(myObj);

            expect(_objDelete(batcher, 'b').currentValue).toEqual({a: 1, c: 3, d: 4, e: 5});
            expect(batcher.currentValue).not.toBe(myObj);
        })

        it('should not remove a value of a key that is not setted in myMap', () => {
            let myObj: {a: number, b: number, c: number, d: number, e: number, f?: number} = {a: 1, b: 2, c: 3, d: 4, e: 5};
            let batcher = useObjectBatcher(myObj);

            expect(_objDelete(batcher, 'f').currentValue).toEqual({a: 1, b: 2, c: 3, d: 4, e: 5});
            expect(batcher.currentValue).toBe(myObj);
        })
    })

    describe('foreach', () => {
        it('should make a empty map equal to myMap', () => {
            let myObj: {a: number, b: number, c: number, d: number, e: number} = {a: 1, b: 2, c: 3, d: 4, e: 5};
            let emptyObj: {a: number, b: number, c: number, d: number, e: number} = {a: 0, b: 0, c: 0, d: 0, e: 0} ;
            let batcher = useObjectBatcher(myObj);

            _objForEach(batcher, (i, j) => { 
                emptyObj[i] = j*2; 
            })
            expect(emptyObj).toEqual({a: 2, b: 4, c: 6, d: 8, e: 10});
            
        })
    })

    describe('spread', () => {
        it('should pass keys and values copyObj to batcher current value, without change myObj to another spread', () => {
            let myObj: {a: number, b: number, c: number, d: number, e: number} = {a: 1, b: 2, c: 3, d: 4, e: 5};
            let batcher = useObjectBatcher(myObj);
            let copyObjs: Batcher<typeof myObj>[] = [useObjectBatcher({a: 0, b: 0, c: 0, d: 0, e: 0})];

            expect(_objSpread(batcher, copyObjs).currentValue).not.toEqual(myObj);
            expect(batcher.currentValue).toEqual({a: 0, b: 0, c: 0, d: 0, e: 0});
        })
    })

    describe('map', () => {
        it('should a set where all element is i*2', () => {
            let myObj: {a: number, b: number, c: number, d: number, e: number} = {a: 1, b: 2, c: 3, d: 4, e: 5};
            let batcher = useObjectBatcher(myObj);

            expect( _objMap(batcher, (i, j) => ([i, batcher.currentValue[i] = j * 2])).currentValue).toEqual({a: 2, b: 4, c: 6, d: 8, e: 10});
        })
    })

})