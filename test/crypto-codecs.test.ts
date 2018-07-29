import avaTest, { TestInterface } from 'ava'
import cryptoCodecs from '../src/crypto-codecs'

const test = avaTest as TestInterface<{}>

const expectedCodecs = ['JWE']

test(`exports`, t => {
  t.is(typeof cryptoCodecs, 'object', 'an object')
  t.is(
    Object.keys(cryptoCodecs).length,
    expectedCodecs.length,
    `with ${expectedCodecs.length} codecs`
  )
  expectedCodecs.forEach(codec => {
    const cryptoCodec = cryptoCodecs[codec]
    t.is(typeof cryptoCodec, 'function', `codec ${codec} exists`)
  })
})
