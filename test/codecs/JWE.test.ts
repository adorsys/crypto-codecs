import avaTest, { TestInterface } from 'ava'
import * as jose from 'node-jose'
import CryptoCodec from '../../src/CryptoCodec'
import codecs from '../../src'

const test = avaTest as TestInterface<{}>
const { jwe } = codecs

const testConfigs = [
  {
    JWK: { kty: 'EC', use: 'enc', alg: 'A256GCM', k: '1234567890123456789012345678901234567890123' }
  },
  {
    JWK: {
      kty: 'oct',
      use: 'dec',
      alg: 'A256GCM',
      k: '1234567890123456789012345678901234567890123'
    }
  },
  {
    JWK: { kty: 'oct', use: 'enc', alg: 'A128KW', k: '1234567890123456789012345678901234567890123' }
  },
  {
    JWK: { kty: 'oct', use: 'enc', alg: 'A256GCM', k: '123456789012345678901234567890123456789012' }
  },
  {
    JWK: {
      kty: 'oct',
      use: 'enc',
      alg: 'A256GCM',
      k: '12345678901234567890123456789012345678901234'
    }
  }
]

testConfigs.forEach((tc, i) => {
  test(`testConfig[${i}] is bad`, async t => {
    await t.throws(() => jwe(tc), 'bad key', 'checks for key type')
  })
})

const testValues = [
  null,
  42,
  'fortytwo',
  new Date(42),
  /^fortytwo$/,
  new Buffer('fortytwo'),
  [null, 42, 'fortytwo', new Date(42), /^fortytwo$/, new Buffer('fortytwo')],
  {
    null: null,
    42: 42,
    fortytwo: 'fortytwo',
    date: new Date(42),
    regex: /^fortytwo/,
    buffer: new Buffer('fortytwo'),
    array: [null, 42, 'fortytwo', new Date(42), /^fortytwo$/, new Buffer('fortytwo')]
  }
]

async function getKey() {
  const store = jose.JWK.createKeyStore()
  await store.generate('oct', 256, { alg: 'A256GCM', use: 'enc', kid: 'test-key' })
  return store.get('test-key').toJSON(true)
}

testValues.forEach((tv, i) => {
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
    const cryptoWithProvidedKey: CryptoCodec = await jwe({ JWK: await getKey() })
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
