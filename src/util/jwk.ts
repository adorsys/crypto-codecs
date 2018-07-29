import * as jose from 'node-jose'

export default {
  generate
}

function generate() {
  const store = jose.JWK.createKeyStore()
  return store
    .generate('oct', 256, { alg: 'A256GCM', use: 'enc', kid: 'test-key' })
    .then(() => store.get('test-key').toJSON(true))
}
