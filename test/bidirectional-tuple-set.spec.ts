import { BidirectionalTupleSet, _btsAdd, _btsClear, _btsDelete, _btsEntries, _btsFirstKeys, _btsForEach, _btsGet, _btsHas, _btsInverseHas, _btsInvert, _btsSecondKeys, _btsToInverseMap } from '../src/data-structures'

describe('BidirectionalTupleSet', () => {
  describe('new', () => {
    it('should create a new BidirectionalTupleSet', () => {
      let btsMap: BidirectionalTupleSet<string, string>
      btsMap = new BidirectionalTupleSet()
      expect(btsMap.size).toEqual(0)
      expect(_btsHas(btsMap, 'a')).toBe(false)
      expect(_btsGet(btsMap, 'a')).toEqual(new Set())
      expect(_btsHas(btsMap, 'a', 'b')).toBe(false)
      expect(_btsHas(btsMap, 'a', 'c')).toBe(false)
      expect([...btsMap]).toEqual([])

      let btsMap2: BidirectionalTupleSet<string, string> = new BidirectionalTupleSet([['a', 'b']])
      expect(btsMap2.size).toEqual(1)
      expect(_btsHas(btsMap2, 'a')).toBe(true)
      expect(_btsGet(btsMap2, 'a')).toEqual(new Set(['b']))
      expect(_btsHas(btsMap2, 'a', 'b')).toBe(true)
      expect(_btsHas(btsMap2, 'a', 'c')).toBe(false)
      expect([...btsMap2]).toEqual([['a', 'b']])

      let btsMap3 = new BidirectionalTupleSet([
        ['a', 'b'],
        ['c', 'd'],
        ['e', 'f']
      ])
      expect(btsMap3.size).toEqual(3)
      expect(_btsHas(btsMap3, 'a')).toBe(true)
      expect(_btsGet(btsMap3, 'a')).toEqual(new Set(['b']))
      expect(_btsHas(btsMap3, 'a', 'b')).toBe(true)
      expect(_btsHas(btsMap3, 'a', 'c')).toBe(false)
      expect(_btsHas(btsMap3, 'inexistent')).toBe(false)
      expect(_btsGet(btsMap3, 'inexistent')).toEqual(new Set())
      expect(_btsHas(btsMap3, 'inexistent', 'any')).toBe(false)
      expect(_btsHas(btsMap3, 'c')).toBe(true)
      expect(_btsGet(btsMap3, 'c')).toEqual(new Set(['d']))
      expect(_btsHas(btsMap3, 'c', 'd')).toBe(true)
      expect(_btsHas(btsMap3, 'c', 'f')).toBe(false)
      expect(_btsHas(btsMap3, 'e')).toBe(true)
      expect(_btsGet(btsMap3, 'e')).toEqual(new Set(['f']))
      expect(_btsHas(btsMap3, 'e', 'f')).toBe(true)
      expect(_btsHas(btsMap3, 'e', 'g')).toBe(false)
      expect([...btsMap3]).toEqual([
        ['a', 'b'],
        ['c', 'd'],
        ['e', 'f']
      ])
    })

    it('should not throw when adding existing value', () => {
      let btsMap: BidirectionalTupleSet<string, string> = new BidirectionalTupleSet();
      expect(btsMap.size).toBe(0);
      expect([...btsMap]).toEqual([]);
      expect(() => _btsAdd(btsMap, 'some key', 'some value')).not.toThrow();
      expect(btsMap.size).toBe(1);
      expect([...btsMap]).toEqual([['some key', 'some value']]);
      expect(() => _btsAdd(btsMap, 'some key', 'some value')).not.toThrow();
      expect(btsMap.size).toBe(1);
      expect([...btsMap]).toEqual([['some key', 'some value']]);
      expect(() => _btsAdd(btsMap, 'some key', 'some value')).not.toThrow();
      expect(btsMap.size).toBe(1);
      expect([...btsMap]).toEqual([['some key', 'some value']]);
      expect(() => _btsDelete(btsMap, 'some key', 'some value')).not.toThrow();
      expect(btsMap.size).toBe(0);
      expect([...btsMap]).toEqual([]);      
      expect(() => _btsAdd(btsMap, 'key2', 'value2')).not.toThrow();
      expect([...btsMap]).toEqual([['key2', 'value2']]);
      expect(btsMap.size).toBe(1);      
      expect(() => _btsAdd(btsMap, 'key3', 'value2')).not.toThrow();
      expect(btsMap.size).toBe(2);      
      expect([...btsMap]).toEqual([['key2', 'value2'], ['key3', 'value2']]);
      expect(() => _btsDelete(btsMap, 'key2', 'inexistent')).not.toThrow();
      expect(btsMap.size).toBe(2);      
      expect([...btsMap]).toEqual([['key2', 'value2'], ['key3', 'value2']]);
      expect(() => _btsDelete(btsMap, 'key2')).not.toThrow();
      expect([...btsMap]).toEqual([['key3', 'value2']]);
      expect(btsMap.size).toBe(1);      
      expect(() => _btsDelete(btsMap, 'key2')).not.toThrow();
      expect([...btsMap]).toEqual([['key3', 'value2']]);
      expect(btsMap.size).toBe(1);    
      expect(() => _btsAdd(btsMap, 'key3', 'value4')).not.toThrow();
      expect(btsMap.size).toBe(2);            
      expect([...btsMap]).toEqual([['key3', 'value2'], ['key3', 'value4']]);
      expect(() => _btsDelete(btsMap, 'key3')).not.toThrow();
      expect(btsMap.size).toBe(0);            
      expect([...btsMap]).toEqual([]);
      /* TODO: Add more tests */            
    })
  })

  describe('add', () => {
    it('should add a tuple in empty TupleSet', () => {
      let btsMap = new BidirectionalTupleSet<string, string>()
      expect(btsMap.size).toBe(0)
      expect(_btsHas(btsMap, 'c')).toBe(false)
      expect(_btsHas(btsMap, 'c', 'd')).toBe(false)
      expect([...btsMap]).toEqual([])

      expect(() => _btsAdd(btsMap, 'key', 'value')).not.toThrow()
      expect(btsMap.size).toBe(1)
      expect(_btsHas(btsMap, 'c')).toBe(false)
      expect(_btsHas(btsMap, 'c', 'd')).toBe(false)
      expect(_btsHas(btsMap, 'key')).toBe(true)
      expect(_btsHas(btsMap, 'key', 'value')).toBe(true)
      expect(_btsHas(btsMap, 'key', 'inexistent')).toBe(false)
      expect([...btsMap]).toEqual([['key', 'value']])
    })

    it('should add items in non-empty TupleSet', () => {
      let btsMap = new BidirectionalTupleSet([
        ['firstKey', 'firstValue'],
        ['secondKey', 'secondValue'],
        ['thirdKey', 'thirdValue']
      ])
      expect(btsMap.size).toBe(3)
      expect(_btsHas(btsMap, 'firstKey')).toBe(true)
      expect(_btsHas(btsMap, 'firstKey', 'firstValue')).toBe(true)
      expect(_btsHas(btsMap, 'firstKey', 'inexistent')).toBe(false)
      expect(_btsHas(btsMap, 'firstValue')).toBe(false)
      expect(_btsHas(btsMap, 'secondKey')).toBe(true)
      expect(_btsHas(btsMap, 'secondKey', 'firstValue')).toBe(false)
      expect(_btsHas(btsMap, 'secondKey', 'inexistent')).toBe(false)
      expect(_btsHas(btsMap, 'secondKey', 'secondValue')).toBe(true)
      expect(_btsHas(btsMap, 'secondValue')).toBe(false)
      expect(_btsHas(btsMap, 'thirdKey')).toBe(true)
      expect(_btsHas(btsMap, 'thirdKey', 'thirdValue')).toBe(true)
      expect(_btsHas(btsMap, 'thirdKey', 'inexistent')).toBe(false)
      expect(_btsHas(btsMap, 'thirdKey', 'secondValue')).toBe(false)
      expect(_btsHas(btsMap, 'thirdValue')).toBe(false)
      expect([...btsMap]).toEqual([
        ['firstKey', 'firstValue'],
        ['secondKey', 'secondValue'],
        ['thirdKey', 'thirdValue']
      ])
      expect(_btsInverseHas(btsMap, 'firstKey')).toBe(false)
      expect(_btsInverseHas(btsMap, 'secondKey')).toBe(false)
      expect(_btsInverseHas(btsMap, 'thirdKey')).toBe(false)
      expect(_btsInverseHas(btsMap, 'firstValue')).toBe(true)
      expect(_btsInverseHas(btsMap, 'secondValue')).toBe(true)
      expect(_btsInverseHas(btsMap, 'thirdValue')).toBe(true)

      expect(() => _btsAdd(btsMap, 'key', 'value')).not.toThrow()
      expect(btsMap.size).toBe(4)
      expect(_btsHas(btsMap, 'firstKey')).toBe(true)
      expect(_btsHas(btsMap, 'firstKey', 'firstValue')).toBe(true)
      expect(_btsHas(btsMap, 'firstKey', 'inexistent')).toBe(false)
      expect(_btsHas(btsMap, 'firstValue')).toBe(false)
      expect(_btsHas(btsMap, 'secondKey')).toBe(true)
      expect(_btsHas(btsMap, 'secondKey', 'firstValue')).toBe(false)
      expect(_btsHas(btsMap, 'secondKey', 'inexistent')).toBe(false)
      expect(_btsHas(btsMap, 'secondKey', 'secondValue')).toBe(true)
      expect(_btsHas(btsMap, 'secondValue')).toBe(false)
      expect(_btsHas(btsMap, 'thirdKey')).toBe(true)
      expect(_btsHas(btsMap, 'thirdKey', 'thirdValue')).toBe(true)
      expect(_btsHas(btsMap, 'thirdKey', 'inexistent')).toBe(false)
      expect(_btsHas(btsMap, 'thirdKey', 'secondValue')).toBe(false)
      expect(_btsHas(btsMap, 'thirdValue')).toBe(false)
      expect(_btsHas(btsMap, 'key')).toBe(true)
      expect(_btsHas(btsMap, 'key', 'value')).toBe(true)
      expect(_btsHas(btsMap, 'value')).toBe(false)

      expect([...btsMap]).toEqual([
        ['firstKey', 'firstValue'],
        ['secondKey', 'secondValue'],
        ['thirdKey', 'thirdValue'],
        ['key', 'value']
      ])
      expect(_btsInverseHas(btsMap, 'firstKey')).toBe(false)
      expect(_btsInverseHas(btsMap, 'secondKey')).toBe(false)
      expect(_btsInverseHas(btsMap, 'thirdKey')).toBe(false)
      expect(_btsInverseHas(btsMap, 'firstValue')).toBe(true)
      expect(_btsInverseHas(btsMap, 'secondValue')).toBe(true)
      expect(_btsInverseHas(btsMap, 'thirdValue')).toBe(true)
      expect(_btsInverseHas(btsMap, 'key')).toBe(false)
      expect(_btsInverseHas(btsMap, 'value')).toBe(true)

      /* Insert key and value inverted */
      expect(() => _btsAdd(btsMap, 'value', 'key')).not.toThrow()
      expect(btsMap.size).toBe(5)
      expect(_btsHas(btsMap, 'firstKey')).toBe(true)
      expect(_btsHas(btsMap, 'firstKey', 'firstValue')).toBe(true)
      expect(_btsHas(btsMap, 'firstKey', 'inexistent')).toBe(false)
      expect(_btsHas(btsMap, 'firstValue')).toBe(false)
      expect(_btsHas(btsMap, 'secondKey')).toBe(true)
      expect(_btsHas(btsMap, 'secondKey', 'firstValue')).toBe(false)
      expect(_btsHas(btsMap, 'secondKey', 'inexistent')).toBe(false)
      expect(_btsHas(btsMap, 'secondKey', 'secondValue')).toBe(true)
      expect(_btsHas(btsMap, 'secondValue')).toBe(false)
      expect(_btsHas(btsMap, 'thirdKey')).toBe(true)
      expect(_btsHas(btsMap, 'thirdKey', 'thirdValue')).toBe(true)
      expect(_btsHas(btsMap, 'thirdKey', 'inexistent')).toBe(false)
      expect(_btsHas(btsMap, 'thirdKey', 'secondValue')).toBe(false)
      expect(_btsHas(btsMap, 'thirdValue')).toBe(false)
      expect(_btsHas(btsMap, 'key')).toBe(true)
      expect(_btsHas(btsMap, 'key', 'inexistent')).toBe(false)
      expect(_btsHas(btsMap, 'key', 'value')).toBe(true)
      expect(_btsHas(btsMap, 'value')).toBe(true)
      expect(_btsHas(btsMap, 'value', 'inexistent')).toBe(false)
      expect(_btsHas(btsMap, 'value', 'key')).toBe(true)

      expect([...btsMap]).toEqual([
        ['firstKey', 'firstValue'],
        ['secondKey', 'secondValue'],
        ['thirdKey', 'thirdValue'],
        ['key', 'value'],
        ['value', 'key']
      ])
      expect(_btsInverseHas(btsMap, 'key')).toBe(true)
      expect(_btsInverseHas(btsMap, 'value')).toBe(true)
    })
  })

  describe('delete', () => {
    it('does not throw in empty Map', () => {
      let btsMap = new BidirectionalTupleSet<string, string>();
      expect(btsMap.size).toBe(0)
      expect([...btsMap]).toEqual([])

      expect(() => _btsDelete(btsMap, 'key')).not.toThrow()
      expect(btsMap.size).toBe(0)
      expect([...btsMap]).toEqual([])
      expect(new Map(btsMap).size).toEqual(0)
      
      expect(_btsInverseHas(btsMap, 'key')).toBe(false)
      expect(_btsInverseHas(btsMap, 'value')).toBe(false)

      expect(() => _btsDelete(btsMap, 'key', 'value')).not.toThrow()
      expect(btsMap.size).toBe(0)
      expect([...btsMap]).toEqual([])
      expect(new Map(btsMap).size).toEqual(0)
      expect(_btsInverseHas(btsMap, 'key')).toBe(false)
      expect(_btsInverseHas(btsMap, 'value')).toBe(false)
    })

    it('does not throw for non-empty Map', () => {
      let btsMap = new BidirectionalTupleSet([['a', 'b']])
      expect(btsMap.size).toBe(1)
      expect([...btsMap]).toEqual([['a', 'b']])
      expect(new Map(btsMap).size).toEqual(1)
      expect(_btsInverseHas(btsMap, 'a')).toBe(false)
      expect(_btsInverseHas(btsMap, 'b')).toBe(true)
      expect(_btsInverseHas(btsMap, 'key')).toBe(false)
      expect(_btsInverseHas(btsMap, 'value')).toBe(false)

      expect(() => _btsDelete(btsMap, 'key')).not.toThrow()
      expect(btsMap.size).toBe(1)
      expect([...btsMap]).toEqual([['a', 'b']])
      expect(new Map(btsMap).size).toEqual(1)
      expect(_btsInverseHas(btsMap, 'key')).toBe(false)
      expect(_btsInverseHas(btsMap, 'value')).toBe(false)
      expect(_btsInverseHas(btsMap, 'a')).toBe(false)
      expect(_btsInverseHas(btsMap, 'b')).toBe(true)

      expect(() => _btsDelete(btsMap, 'key', 'value')).not.toThrow()
      expect(btsMap.size).toBe(1)
      expect([...btsMap]).toEqual([['a', 'b']])
      expect(new Map(btsMap).size).toEqual(1)
      expect(_btsInverseHas(btsMap, 'key')).toBe(false)
      expect(_btsInverseHas(btsMap, 'value')).toBe(false)
      expect(_btsInverseHas(btsMap, 'a')).toBe(false)
      expect(_btsInverseHas(btsMap, 'b')).toBe(true)
    })

    it('deletes for non-empty Map', () => {
      let btsMap = new BidirectionalTupleSet([
        ['a', 'b'],
        ['c', 'd']
      ])
      expect(btsMap.size).toBe(2)
      expect([...btsMap]).toEqual([
        ['a', 'b'],
        ['c', 'd']
      ])
      expect(new Map(btsMap).size).toEqual(2)
      expect(_btsInverseHas(btsMap, 'a')).toBe(false)
      expect(_btsInverseHas(btsMap, 'b')).toBe(true)
      expect(_btsInverseHas(btsMap, 'c')).toBe(false)
      expect(_btsInverseHas(btsMap, 'd')).toBe(true)
      expect(_btsInverseHas(btsMap, 'key')).toBe(false)
      expect(_btsInverseHas(btsMap, 'value')).toBe(false)

      expect(() => _btsDelete(btsMap, 'a', 'b')).not.toThrow()
      expect(btsMap.size).toBe(1)
      expect([...btsMap]).toEqual([['c', 'd']])
      expect(new Map(btsMap).size).toEqual(1)
      expect(_btsInverseHas(btsMap, 'key')).toBe(false)
      expect(_btsInverseHas(btsMap, 'value')).toBe(false)
      expect(_btsInverseHas(btsMap, 'a')).toBe(false)
      expect(_btsInverseHas(btsMap, 'b')).toBe(false)
      expect(_btsInverseHas(btsMap, 'c')).toBe(false)
      expect(_btsInverseHas(btsMap, 'd')).toBe(true)

      expect(() => _btsDelete(btsMap, 'c')).not.toThrow()
      expect(btsMap.size).toBe(0)
      expect([...btsMap]).toEqual([])
      expect(new Map(btsMap).size).toEqual(0)
      expect(_btsInverseHas(btsMap, 'key')).toBe(false)
      expect(_btsInverseHas(btsMap, 'value')).toBe(false)
      expect(_btsInverseHas(btsMap, 'a')).toBe(false)
      expect(_btsInverseHas(btsMap, 'b')).toBe(false)
      expect(_btsInverseHas(btsMap, 'c')).toBe(false)
      expect(_btsInverseHas(btsMap, 'd')).toBe(false)
    })
  })

  describe('toString', () => {
    it('should return [object BidirectionalTupleSet] when converted to string', () => {
      let btsMap = new BidirectionalTupleSet<number, number>()
      expect(() => _btsAdd(btsMap, 1, 2)).not.toThrow()

      expect(`String test: ${btsMap}`).toEqual('String test: [object BidirectionalTupleSet]')
    })
  })

  describe('first keys', () => {
    it('should contain all registered second keys in iterator', () => {
      let btsMap = new BidirectionalTupleSet<number, number>()
      expect(btsMap.size).toBe(0)
      expect([..._btsFirstKeys(btsMap)]).toEqual([])
      expect(() => _btsAdd(btsMap, 3, 4)).not.toThrow()
      expect(() => _btsAdd(btsMap, 5, 6)).not.toThrow()
      expect(btsMap.size).toBe(2)
      expect([..._btsFirstKeys(btsMap)]).toEqual([3, 5])
    })
  })

  describe('second keys', () => {
    it('should contain all registered second keys in iterator', () => {
      let btsMap = new BidirectionalTupleSet<number, number>()
      expect(btsMap.size).toBe(0)
      expect([..._btsSecondKeys(btsMap)]).toEqual([])
      expect(() => _btsAdd(btsMap, 3, 4)).not.toThrow()
      expect(() => _btsAdd(btsMap, 5, 6)).not.toThrow()
      expect(btsMap.size).toBe(2)
      expect([..._btsSecondKeys(btsMap)]).toEqual([4, 6])
    })
  })

  describe('entries', () => {
    it('should contain all registered [key1, key2] pairs in iterator', () => {
      let btsMap = new BidirectionalTupleSet<number, number>()
      expect(btsMap.size).toBe(0)
      expect([..._btsEntries(btsMap)]).toEqual([])
      expect(() => _btsAdd(btsMap, 3, 4)).not.toThrow()
      expect(() => _btsAdd(btsMap, 5, 6)).not.toThrow()
      expect(btsMap.size).toBe(2)
      expect([..._btsEntries(btsMap)]).toEqual([
        [3, 4],
        [5, 6]
      ])
      expect(() => _btsAdd(btsMap, 3, 8)).not.toThrow()
      expect(btsMap.size).toBe(3)
      expect([..._btsEntries(btsMap)]).toEqual([
        [3, 4],
        [3, 8],
        [5, 6]
      ])
    })
  })

  describe('clear', () => {
    it('should not throw for empty BidirectionalTupleSet', () => {
      let btsMap = new BidirectionalTupleSet<number, number>()
      expect(btsMap.size).toBe(0)
      expect([...btsMap]).toEqual([])
      expect(() => _btsAdd(btsMap, 1, 2)).not.toThrow();
      expect(() => _btsAdd(btsMap, 3, 4)).not.toThrow();
      expect(btsMap.size).toBe(2)
      expect(() => _btsClear(btsMap)).not.toThrow()
      expect(btsMap.size).toBe(0)
      expect([..._btsToInverseMap(btsMap)]).toEqual([])
      expect([...btsMap]).toEqual([])
    })

    it('should erase for non-empty BidirectionalTupleSet', () => {
      let btsMap = new BidirectionalTupleSet<number, number>([
        [1, 2],
        [3, 4]
      ])
      expect(btsMap.size).toBe(2)
      expect([...btsMap]).toEqual([
        [1, 2],
        [3, 4]
      ])
      expect(_btsHas(btsMap, 1)).toBe(true)
      expect(_btsHas(btsMap, 1, 2)).toBe(true)
      expect(_btsInverseHas(btsMap, 2)).toBe(true)
      expect(_btsHas(btsMap, 3)).toBe(true)
      expect(_btsHas(btsMap, 3, 4)).toBe(true)
      expect(_btsInverseHas(btsMap, 4)).toBe(true)
      expect(() => _btsClear(btsMap)).not.toThrow()
      expect(btsMap.size).toBe(0)
      expect([...btsMap]).toEqual([])
      expect(_btsHas(btsMap, 1)).toBe(false)
      expect(_btsHas(btsMap, 1, 2)).toBe(false)
      expect(_btsInverseHas(btsMap, 2)).toBe(false)
      expect(_btsHas(btsMap, 3)).toBe(false)
      expect(_btsHas(btsMap, 3, 4)).toBe(false)
      expect(_btsInverseHas(btsMap, 4)).toBe(false)
    })
  })

  describe('forEach', () => {
    it('loops through BidirectionalTupleSet', () => {
      let btsMap = new BidirectionalTupleSet<number, number>([
        [1, 2],
        [3, 4]
      ])
      let result: [number, number, BidirectionalTupleSet<number, number>][] = []
      expect(() =>
        _btsForEach(btsMap, ([key1, key2], map) => {
          result.push([key2, key1, map])
        })
      ).not.toThrow()
      expect(result).toEqual([
        [2, 1, btsMap],
        [4, 3, btsMap]
      ])
    })
  })

  describe('invert', () => {
    it('inverts BidirectionalTupleSet', () => {
      let bijEmpty = new BidirectionalTupleSet<number, string>([])
      let invertedEmpty = _btsInvert(bijEmpty);
      expect([...invertedEmpty]).toEqual([])

      let btsMap = new BidirectionalTupleSet<number, string>([
        [1, 'a'],
        [3, 'b']
      ])
      let inverted = _btsInvert(btsMap);
      expect([...inverted]).toEqual([
        ['a', 1],
        ['b', 3]
      ])
    })
  })
})
