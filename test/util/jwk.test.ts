import avaTest, { TestInterface } from 'ava'
import { util } from '../../src'

const test = avaTest as TestInterface<{}>
const { jwk } = util
test(`generate creates keys`, async t => {
  const { kty, kid, use, alg, k } = await jwk.generate()
  t.is(kty, 'oct', 'with correct kty')
  t.is(typeof kid, 'string', 'with random kid')
  t.is(use, 'enc', 'with correct use')
  t.is(alg, 'A256GCM', 'with correct alg')
  t.regex(k, /^[A-Za-z0-9_\-]{43}$/, 'with random k')
})
