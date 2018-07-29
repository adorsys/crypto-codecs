import * as jose from 'node-jose'
import JsonWebKey from '../JsonWebKey'

export default {
  generate
}

function generate(): Promise<JsonWebKey> {
  const store = jose.JWK.createKeyStore()
  return store
    .generate('oct', 256, { alg: 'A256GCM', use: 'enc', kid: 'test-key' })
    .then(() => store.get('test-key').toJSON(true))
}
