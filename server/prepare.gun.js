const Gun = require('gun');

/*
 object of lang
 {
     key: 'ru',
     title: 'Russia',
     flagCode?: ''
 }
*/
function prepareGun(gun) {
  // en ru
  const languages = gun.get("languages");
  languages.val(function (node) {
    if (typeof node == "undefined") {
      const ru = gun.get("ru");
      ru.put({key: "ru", title: "Russia"});
      //
      languages.set(ru);
      const en = gun.get("en");
      en.put({key: "en", title: "English"});
      languages.set(en);
    }
  });

  // inject test project
}

/**
 *
 * @returns {void}
 */
async function createRootUser(gun) {
  const user = gun.user();

  await user.create('root', 'root')
}

module.exports.prepareGun = prepareGun;
module.exports.createRootUser = createRootUser;
