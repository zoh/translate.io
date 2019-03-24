import _ from 'lodash'
import {mergeTreeInRows, findRowByPath} from "../../src/modules/projects/utilsForImport";

describe("Project", () => {

  it('find row by path', () => {
    // roes with translate
    const r1 = {
      title: 'test',
      level: 0,
      node: true,
    };
    const r2 = {
      title: 'months',
      level: 1,
      node: true,
      parent: r1,
    };
    const r3 = {
      title: 'January',
      level: 2,
      en: 'January',
      parent: r2,
    };
    const rows = [r1, r2, r3];

    expect(findRowByPath(rows, ['test', 'months'])).toBe(r2);
    expect(findRowByPath(rows, ['test', 'months', 'asdasdsdasd'])).toBeUndefined();
    expect(findRowByPath(rows, ['test', 'months', 'January'])).toBe(r3);
  });

  it("renders props.msg when passed", () => {
    const tree = {
      "test": {
        "months": {
          "January": "Январь",
          "February": "Февраль",
          "March": "Март",
          "April": "Апрель",
          "May": "Май",
          "June": "Июнь",
          "July": "Июль",
          "August": "Август",
          "September": "Сентябрь",
          "October": "Октябрь",
          "November": "Ноябрь",
          "December": "Декабрь"
        },
      }
    };
    // roes with translate
    const r1 = {
      title: 'test',
      level: 0,
      node: true,
    };
    const r2 = {
      title: 'months',
      level: 1,
      node: true,
      parent: r1,
    };
    const r3 = {
      title: 'January',
      level: 2,
      en: 'January',
      parent: r2,
    };
    const rows = [r1, r2, r3];
    mergeTreeInRows('ru', tree, rows);

    expect(rows.length).toBe(14);
    expect(_.last(rows).title).toBe('December');
    expect(_.last(rows).ru).toBe('Декабрь');
  });
});
