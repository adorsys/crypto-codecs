import avaTest, { TestInterface } from 'ava'
import CryptoCodec from '../../src/CryptoCodec'
import { codecs, util } from '../../src'
import { jweConfigs, jweValues } from './testdata'

const test = avaTest as TestInterface<{}>
const { jwe } = codecs

jweConfigs.forEach((tc, i) => {
  test(`testConfig[${i}] is bad`, async t => {
    await t.throws(() => jwe(tc), 'bad key', 'checks for key type')
  })
})

jweValues.forEach((tv, i) => {
  test(`testValue[${i}] encrypt/decrypt without config`, async t => {
    const cryptoWithRandomKey: CryptoCodec = await jwe()
    const cipher = await cryptoWithRandomKey.encrypt(tv)
    t.is(typeof cipher, 'string', 'encrypt gives string')
    const parts = cipher.split('.')
    t.is(parts.length, 5, 'with 5 parts')
    parts.forEach(part => {
      t.regex(part, /^[A-Za-z0-9_\-]*$/, 'of Base64 encoded values')
    })
    const decryptedValue = await cryptoWithRandomKey.decrypt(cipher)
    t.deepEqual(decryptedValue, tv, 'decrypt gives correct value')
  })

  test(`testValue[${i}] encrypt/decrypt with config`, async t => {
    const cryptoWithProvidedKey: CryptoCodec = await jwe({ JWK: await util.jwk.generate() })
    const cipher = await cryptoWithProvidedKey.encrypt(tv)
    t.is(typeof cipher, 'string', 'encrypt gives string')
    const parts = cipher.split('.')
    t.is(parts.length, 5, 'with 5 parts')
    parts.forEach(part => {
      t.regex(part, /^[A-Za-z0-9_\-]*$/, 'of Base64 encoded values')
    })
    const decryptedValue = await cryptoWithProvidedKey.decrypt(cipher)
    t.deepEqual(decryptedValue, tv, 'decrypt gives correct value')
  })
})
