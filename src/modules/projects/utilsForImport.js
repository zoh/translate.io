import _ from 'lodash'

export function mergeTreeInRows(lang, node = {}, translateRows = []) {

  function forceTree(node, paths = []) {
    for (let key in node) {
      const val = node[key];
      if (typeof val === "object") {
        let rowFromStore = findRowByPath(translateRows, paths.concat(key));

        if (!rowFromStore) {
          rowFromStore = {
            parent: findRowByPath(translateRows, paths),
            title: key,
            node: true,
            level: paths.length,
          };
          translateRows.push(rowFromStore);
        }

        forceTree(val, paths.concat(key))
      } else if (typeof val === "string") {
        // const find
        let rowFromStore = findRowByPath(translateRows, paths.concat(key));

        if (!rowFromStore) {
          rowFromStore = {
            parent: findRowByPath(translateRows, paths),
            title: key,
            node: false,
            level: paths.length,
          };
          translateRows.push(rowFromStore);
        }

        // inject lang
        rowFromStore[lang] = val;
      }
    }
  }

  forceTree(node, []);
}

export function findRowByPath(translateList, path = []) {
  for (let p of translateList) {
    if (p.title === _.first(path)) {
      if (_.tail(path).length === 0) {
        return p
      }

      const index = _.findIndex(translateList, t => t === p);

      return findRowByPath(
        _.slice(translateList, index + 1),
        _.tail(path),
      )
    }
  }
}
