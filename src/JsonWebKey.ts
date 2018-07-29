export default interface JsonWebKey {
  kty?: string
  kid?: string
  use?: string
  alg?: string
  k: string
}
