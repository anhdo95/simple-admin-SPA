import includes from 'lodash/includes'
import getLodash from 'lodash/get'
import extend from 'lodash/extend'

import en from './en'

const DEFAULT_LANGUAGE = 'en'
const all = extend({}, {
  en
})

let lang = DEFAULT_LANGUAGE

export default {
  setLang(str) {
    if (includes([ 'en' ], str)) {
      lang = str
    } else {
      throw new Error(`Invalid language: ${str}`)
    }
  },
  getLang() {
    return lang
  },
  get(key) {
    return getLodash(all[lang], key, getLodash(all[DEFAULT_LANGUAGE], key, key))
  }
}
