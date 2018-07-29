import avaTest, { TestInterface } from 'ava'
import codecs from '../src'

const test = avaTest as TestInterface<{}>

const expectedCodecs = ['JWE']

test(`exports`, t => {
  t.is(typeof codecs, 'object', 'an object')
  t.is(Object.keys(codecs).length, expectedCodecs.length, `with ${expectedCodecs.length} codecs`)
  expectedCodecs.forEach(codec => {
    const cryptoCodec = codecs[codec]
    t.is(typeof cryptoCodec, 'function', `codec ${codec} exists`)
  })
})
