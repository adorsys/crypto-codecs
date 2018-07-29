import avaTest, { TestInterface } from 'ava'
import { codecs, util } from '../src'

const test = avaTest as TestInterface<{}>

const expectedCodecs = ['jwe']

test(`codecs`, t => {
  t.is(typeof codecs, 'object', 'is an object')
  t.is(Object.keys(codecs).length, expectedCodecs.length, `with ${expectedCodecs.length} codecs`)
  expectedCodecs.forEach(codec => {
    const cryptoCodec = codecs[codec]
    t.is(typeof cryptoCodec, 'function', `codec ${codec} exists`)
  })
})

test(`util`, t => {
  t.is(typeof util, 'object', 'is an object')
  t.is(typeof util.jwk, 'object', 'with property "jwk"')
  t.is(typeof util.jwk.generate, 'function', 'with a function "generate"')
})
