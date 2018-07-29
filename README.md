# Crypto Codecs

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/adorsys/crypto-codecs.svg)](https://greenkeeper.io/)
[![Travis](https://img.shields.io/travis/adorsys/crypto-codecs.svg)](https://travis-ci.org/adorsys/crypto-codecs)
[![Coveralls](https://img.shields.io/coveralls/adorsys/crypto-codecs.svg)](https://coveralls.io/github/adorsys/crypto-codecs)
[![Dev Dependencies](https://david-dm.org/adorsys/crypto-codecs/dev-status.svg)](https://david-dm.org/adorsys/crypto-codecs?type=dev)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg)](https://paypal.me/radzom)

A project for encrypting and decrypting anything

### Installation

```bash
npm install @adorsys/crypto-codecs
```

### Usage


```js
import { codecs, util } from 'crypto-codecs'
// ...or
const { codecs, util } = require('../src')

// Without providing a key
codecs.jwe()
  .then(codec => {
    codec.encrypt({test: 42})
      .then(cipher => codec.decrypt(cipher))
      .then(value => value) // {test: 42}
  })
  .catch(err => console.log(err))

// With providing a key
let Key
util.jwk.generate()
  .then(k => {
    // remember key for later use
    Key = k
    return codecs.jwe({Key})
  })
  .then(codec => codec.encrypt({test: 42}))
  .then(cipher => codecs.jwe({Key}).then(codec => codec.decrypt(cipher)))
  .then(value => value) // {test: 42}
  .catch(err => console.log(err))

``` 


### Features

 - Support for JWE (Json Web Encryption)
 - Promise based interfaces
 - Encrypting and Decrypting everything (number, string, boolean, array, date, regex, buffer, object)


### NPM scripts

 - `npm t`: Run test suite
 - `npm start`: Run `npm run build` in watch mode
 - `npm run test:prod`: Run linting and generate coverage
 - `npm run build`: Generate bundles and typings, create docs
 - `npm run lint`: Lints code
 - `npm run commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)



## Credits

Made with :heart: by [gradorsys](https://github.com/gradorsys) and all these wonderful contributors ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| <img src="https://avatars.githubusercontent.com/u/1225651?v=3" width="100px;"/><br /><sub><b>Francis Pouatcha</b></sub><br />🤔 |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind are welcome!
