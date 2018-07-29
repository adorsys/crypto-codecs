import CryptoCodec from '../CryptoCodec'
import * as jose from 'node-jose'
import * as hydra from 'hydration'
import UtilJwk from '../util/jwk'
import JsonWebKey from '../JsonWebKey'

const keyDefaults = {
  kty: 'oct',
  use: 'enc',
  alg: 'A256GCM'
}

interface Config {
  Key?: JsonWebKey
}

export default function jwe(config: Config = {}): Promise<CryptoCodec> {
  return getKeystore(config.Key)
    .then(getInstance)
    .catch(err => {
      throw err
    })

  function getKey(jwk?: JsonWebKey) {
    if (jwk) {
      if (checkKey(jwk)) {
        return Promise.resolve(Object.assign({}, keyDefaults, jwk))
      } else {
        return Promise.reject(new Error('bad key'))
      }
    }
    return UtilJwk.generate()
  }

  function checkKey(jwk: JsonWebKey) {
    return (
      jwk.kty === 'oct' &&
      jwk.alg === 'A256GCM' &&
      jwk.use === 'enc' &&
      jwk.k.match(/^[A-Za-z0-9_\-]{43}$/)
    )
  }

  function getKeystore(jwk?: JsonWebKey) {
    const store = jose.JWK.createKeyStore()
    return getKey(jwk)
      .then(key => store.add(key, 'json'))
      .then(() => store)
  }

  function getEncrypt(ks) {
    return function encrypt(data: any): Promise<string> {
      const dehydratedData = hydra.dehydrate({ data })
      const key = ks.get({ use: 'enc' })
      return jose.JWE.createEncrypt({ format: 'compact' }, key)
        .update(JSON.stringify(dehydratedData))
        .final()
    }
  }

  function getDecrypt(ks) {
    return function decrypt(cipher: string): Promise<any> {
      return jose.JWE.createDecrypt(ks)
        .decrypt(cipher)
        .then(res => res.payload.toString())
        .then(JSON.parse)
        .then(hydra.hydrate)
        .then(res => res.data)
    }
  }

  function getInstance(keystore) {
    return testEncryption(keystore).then(() => ({
      encrypt: getEncrypt(keystore),
      decrypt: getDecrypt(keystore)
    }))
  }

  function testEncryption(keystore) {
    return getEncrypt(keystore)('test')
  }
}
