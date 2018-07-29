import * as jose from 'node-jose'

export const jweConfigs = [
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

export const jweValues = [
  null,
  42,
  'fortytwo',
  new Date(42),
  /^fortytwo$/,
  Buffer.from('fortytwo'),
  [null, 42, 'fortytwo', new Date(42), /^fortytwo$/, Buffer.from('fortytwo')],
  {
    null: null,
    42: 42,
    fortytwo: 'fortytwo',
    date: new Date(42),
    regex: /^fortytwo/,
    buffer: Buffer.from('fortytwo'),
    array: [null, 42, 'fortytwo', new Date(42), /^fortytwo$/, Buffer.from('fortytwo')]
  }
]
