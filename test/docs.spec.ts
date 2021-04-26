import { _arrFilter, useArrayBatcher } from "../src/array"
import { $arrFilter, arrFilter, arrLength, arrMap, arrPush, arrSet, arrSetLength, arrSpread } from "../src/array/pipeables";
import { Batcher, value, forkAndLock } from "../src/batcher";
import { batch } from "../src/batch-fn";

/* 4 ways of calling operations:
- $arrPush (b) (1, 'abc')    // (Preferred) for single operations
- b.batch(
    arrPush(1, 'abc')       // (Preferred) for many operations
)
- _arrPush (b, 1, 'abc');    // For single operations
- batch(b,
    arrPush(1, 'abc')       // For many operations
)
*/
/* Notes:
- mapping to different types may require a new variable assignment (because of Typescript's behavior)

- You can use tap inside the batch call to make side-effects but return last result.
- You can use custom functions inside the batch call to access variables on the fly
*/

describe('documentation', () => {
    describe('example 1', () => {
        it ('should not clone array', () => {
            const batcherA = useArrayBatcher([1, 2, 3, 4]);
            batcherA.batch(
                arrFilter(i => i % 2 === 1)
            )
            const novoBatcher = forkAndLock(batcherA);
            novoBatcher.batch(
                arrFilter(i => i < 3)
            )
            // console.log(value(batcherA)) // [1, 3]
            // console.log(value(novoBatcher)) // [1]
            expect(value(batcherA)).toEqual([1, 3]);
            expect(value(novoBatcher)).toEqual([1]);
        })

        // it ('should ', () => {
        //     const batcherA = useArrayBatcher([1, 2, 3, 4]);
        //     batcherA.batch(
        //         arrFilter(i => i % 2 === 1)
        //     )
            
        //     const novoBatcher = forkAndLock(batcherA);
        //     console.log(novoBatcher.currentValue === batcherA.currentValue);
        //     batcherA.batch(
        //         arrFilter(i => i < 3)
        //     )
        //     console.log("comparacao dos valores de batcherA e novoBatcher", "batcherA ",batcherA.currentValue, "novobatcher ", novoBatcher.currentValue)
        //     console.log("comparacao dos valores de batcherA e novoBatcher", "batcherA ", batcherA.currentValue === novoBatcher.currentValue)
        //     // console.log(value(batcherA)) // [1]
        //     // console.log(value(novoBatcher)) // [1, 3]
        //     expect(value(batcherA)).toEqual([1]);
        //     expect(value(novoBatcher)).toEqual([1, 3]);
        // })

        // it ('should ', () => {
        //     const batcherA = useArrayBatcher([1, 2, 3, 4]);
        //     batcherA.batch(
        //         arrFilter(i => i % 2 === 1)
        //     )
            
        //     const novoBatcher = forkAndLock(batcherA);
        //     const guarda = novoBatcher.currentValue;
            
        //     batcherA.batch(
        //         arrFilter(i => true )
        //     )
        //     novoBatcher.batch(
        //         arrMap( i => i)
        //     )

        //     let arr = [1, 2, 3, 4, 5];
        //     let arr2 = [...arr];
        //     arr2[2] = 8;
        //     //console.log("arr ", arr, " arr2 ", arr2);
            
        //     // console.log("batcherA com o map do js e batcherA com o map implementadp ", value(batcherA) === value(batcherA).map(i => i));
        //     // console.log("guarda e novo ", guarda === novoBatcher.currentValue);
        //     // console.log("guarda e A ", guarda === batcherA.currentValue);
        //     // console.log("novo e A ", batcherA.currentValue === batcherA.currentValue);
        //     // console.log("novo batcher has changed?", novoBatcher.hasChanged);
        //     // console.log("comparacao dos valores de batcherA e novoBatcher", "batcherA ",batcherA.currentValue, "novobatcher ", novoBatcher.currentValue)
        //     // console.log("comparacao dos valores de batcherA e novoBatcher", "batcherA ", batcherA.currentValue === novoBatcher.currentValue)
        //     // console.log(value(batcherA)) // [1]
        //     // console.log(value(novoBatcher)) // [1, 3]
        //     expect(value(batcherA)).toEqual([1]);
        //     expect(value(novoBatcher)).toEqual([1, 3]);
        // })
    })
    //     it('should clone array just once in the whole process', () => {
    //         let arr = [10, 20, 30, 40];
    //         let b = useArrayBatcher(arr);

    //         b.batch(
    //             arrFilter(i => i < 40)        // [10, 20, 30]
    //         )

    //         let snapshot1 = value(b);

    //         b.batch(
    //             arrFilter(i => i > 10),         // [20, 30]
    //             arrMap(i => i + 1),             // [21, 31]
    //             arrSet(2, 89),                  // [21, 31, 89]
    //         )
                
    //         let anotherArray = useArrayBatcher<number>([99, 101]);

    //         b.batch(
    //             arrSpread(anotherArray),        // [21, 31, 89, 99, 101]
    //             arrPush(125)                    // [21, 31, 89, 99, 101, 125]
    //         )

    //         expect(value(b)).not.toBe(arr);                         // Different object references
    //         expect(value(b)).toEqual([21, 31, 89, 99, 101, 125]);   // Batcher created new object for result
    //         expect(arr).toEqual([10, 20, 30, 40])                   // Initial Array did not change
            
    //         /* Result array reference is same from snapshot1.
    //         Cloning just happened after the first change! */
    //         expect(snapshot1).toBe(value(b));
    //         expect(snapshot1).not.toBe(arr);
    //     })
    // })
})
