//
//
export class LocalStore {
  name;
  data;

  constructor(name) {
    this.name = name;

    let item = window.localStorage.getItem(this.name);
    let res;
    try {
      res = JSON.parse(item);
    } catch (e) {
    }
    this._data = res || {};
  }

  getItem(key) {
    return this._data[key];
  }

  setItem(key, val) {
    this._data[key] = val;

    this._flush();
  }

  /**
   * @private
   */
  _flush() {
    window.localStorage.setItem(this.name, JSON.stringify(this._data));
  }
}

