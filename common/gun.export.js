const _ = require('lodash');

/**
 *
 * @param gun
 * @param gunNode
 * @param result
 * @returns {Promise<void>}
 */
export async function makeTreeJSON(gun, gunNode, result = {}) {
  for (let key in gunNode) {
    if (key === '_') {
      continue
    }
    const el = gunNode[key];
    if (typeof el === 'object' && '#' in el) {
      // then it is gun.node
      let newNode = {};
      _.set(result, key, newNode);
      await makeTreeJSON(gun, await gun.get(el['#']), newNode);

    } else if (el !== undefined) {
      result[key] = el;
    }
  }
}


export async function makeTreeJSONWithOneLang(lang, gunNode, result = {}) {
  for (let key in gunNode) {
    const el = gunNode[key];

    if (typeof el === 'object') {
      if (lang in el) {
        _.set(result, key, el[lang]);
      } else {
        let newNode = {};
        _.set(result, key, newNode);
        await makeTreeJSONWithOneLang(lang, el, newNode);

        if (_.isEmpty(result[key] ) ) {
          _.set(result, key, null);
        }
      }
    }
  }
}

