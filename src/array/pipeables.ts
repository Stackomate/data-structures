import { Batcher } from "../batcher";
import { _arrAt, _arrDel, _arrFilter, _arrForEach, _arrIndexAt, _arrIndexDefined, _arrInsert, _arrLastIndex, _arrLength, _arrMap, _arrPositiveIndexDefined, _arrPush, _arrRemove, _arrSetIndex, _arrSetLength, _arrSpread, _arrTrimLength } from "./array-operations";

export const arrIndexAt = <T> (index: number) => (batcher: Batcher<Array<T>>) : number => _arrIndexAt(batcher, index);
export const $arrIndexAt = <T> (batcher: Batcher<Array<T>>) => (index: number) : number => _arrIndexAt(batcher, index);

export const arrLength = <T>() => (batcher: Batcher<Array<T>>) : number => _arrLength(batcher);
export const $arrLength = <T>(batcher: Batcher<Array<T>>) => () : number => _arrLength(batcher);

export const arrSetLength = <T>(length: number) => (batcher: Batcher<Array<T>>) : Batcher<Array<T>> => _arrSetLength(batcher, length);
export const $arrSetLength = <T>(batcher: Batcher<Array<T>>) => (length: number) : Batcher<Array<T>> => _arrSetLength(batcher, length);

export const arrLastIndex = <T> () => (batcher: Batcher<Array<T>>) : number => _arrLastIndex(batcher);
export const $arrLastIndex = <T> (batcher: Batcher<Array<T>>) => () : number => _arrLastIndex(batcher);

export const arrAt = <T>(index: number) => (batcher: Batcher<Array<T>>) : T => _arrAt(batcher, index);
export const $arrAt = <T>(batcher: Batcher<Array<T>>) => (index: number) : T => _arrAt(batcher, index);

export const arrPositiveIndexDefined = <T> (index: number) => (batcher: Batcher<Array<T>>) : boolean => _arrPositiveIndexDefined(batcher, index);
export const $arrPositiveIndexDefined = <T> (batcher: Batcher<Array<T>>) => (index: number) : boolean => _arrPositiveIndexDefined(batcher, index);

export const arrIndexDefined = <T> (index: number) => (batcher: Batcher<Array<T>>) : boolean => _arrIndexDefined(batcher, index);
export const $arrIndexDefined = <T> (batcher: Batcher<Array<T>>) => (index: number) : boolean => _arrIndexDefined(batcher, index);

export const arrSetIndex = <T>(index: number, item: T) => (batcher: Batcher<Array<T>>): Batcher<Array<T>> => _arrSetIndex(batcher, index, item);
export const $arrSetIndex = <T> (batcher: Batcher<Array<T>>) => (index: number, item: T) : Batcher<Array<T>> => _arrSetIndex(batcher, index, item);

export const arrPush = <T>(item: T) => (batcher: Batcher<Array<T>>) : Batcher<Array<T>> => _arrPush(batcher, item);
export const $arrPush = <T> (batcher: Batcher<Array<T>>) => (item: T) : Batcher<Array<T>> => _arrPush(batcher, item);

export const arrTrimLength = <T> () => (batcher: Batcher<Array<T>>) : Batcher<Array<T>> => _arrTrimLength(batcher);
export const $arrTrimLength = <T> (batcher: Batcher<Array<T>>) => () : Batcher<Array<T>> => _arrTrimLength(batcher);

export const arrDel = <T> (index: number) => (batcher: Batcher<Array<T>>) : Batcher<Array<T>> => _arrDel(batcher, index);
export const $arrDel = <T> (batcher: Batcher<Array<T>>) => (index: number) : Batcher<Array<T>> => _arrDel(batcher, index);

export const arrRemove = <T>(index: number) => (batcher: Batcher<Array<T>>) : Batcher<Array<T>> => _arrRemove(batcher, index);
export const $arrRemove = <T>(batcher: Batcher<Array<T>>) => (index: number) : Batcher<Array<T>> => _arrRemove(batcher, index);

export const arrInsert = <T>(index: number, item: T) => (batcher: Batcher<Array<T>>) : Batcher<Array<T>> => _arrInsert(batcher, index, item);
export const $arrInsert = <T>(batcher: Batcher<Array<T>>) => (index: number, item: T) : Batcher<Array<T>> => _arrInsert(batcher, index, item);

export const arrForEach = <T>(fn: (a: T, index: number, array: Array<T>) => void) => (batcher: Batcher<Array<T>>) : Batcher<Array<T>> => _arrForEach(batcher, fn);
export const $arrForEach = <T>(batcher: Batcher<Array<T>>) => (fn: (a: T, index: number, array: Array<T>) => void) : Batcher<Array<T>> => _arrForEach(batcher, fn);

export const arrSpread = <S>(...copyArrays: Batcher<Array<S>>[]) => (batcher: Batcher<Array<S>>) : Batcher<Array<S>> => _arrSpread(batcher, copyArrays);
export const $arrSpread = <S>(batcher: Batcher<Array<S>>) => (...copyArrays: Batcher<Array<S>>[]) : Batcher<Array<S>> => _arrSpread(batcher, copyArrays);

export const arrFilter = <T>(fn: (a: T) => boolean) => (batcher: Batcher<Array<T>>) : Batcher<Array<T>> => _arrFilter(batcher, fn);
export const $arrFilter = <T> (batcher: Batcher<Array<T>>) => (fn: (a: T) => boolean): Batcher<Array<T>> => _arrFilter(batcher, fn);

export const arrMap =  <T, U>(fn: (a: T) => U) => (batcher: Batcher<Array<T>>) : Batcher<Array<U>> => _arrMap(batcher, fn);
export const $arrMap =  <T, U> (batcher: Batcher<Array<T>>) => (fn: (a: T) => U) : Batcher<Array<U>> => _arrMap(batcher, fn);
