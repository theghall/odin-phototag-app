const phototag = require('../src/phototag');

function getTestItem() {
  return {name: "abcd", bottom_left_loc: "1,1", top_left_loc: "1,4", top_right_loc: "4,4", bottom_right_loc: "4,1"};
}

describe('Testing items....', () => {
  test('it should create an item with the correct name', () => {
    const item = phototag.createItem(getTestItem());

    expect(item.getName()).toMatch('abcd');
  });

  test('It should report clicked if coords are within defined rectangle', () => {
    const item = phototag.createItem(getTestItem());

    item.click({x: 2, y: 2});
    expect(item.clicked()).toBeTruthy();
  });

  test('It should not report clicked if coords are not within defined rectangle', () => {
    let item;

    // x within, y below
    item = phototag.createItem(getTestItem());
    item.click({x: 2, y: 0});
    expect(item.clicked()).toBeDefined();
    expect(item.clicked()).toBeFalsy();

    // x within, y above
    item = phototag.createItem(getTestItem());
    item.click({x: 2, y: 5});
    expect(item.clicked()).toBeDefined();
    expect(item.clicked()).toBeFalsy();

    // x without to left, y within
    item = phototag.createItem(getTestItem());
    item.click({x: 0, y: 2});
    expect(item.clicked()).toBeDefined();
    expect(item.clicked()).toBeFalsy();

    // x without to right, y within
    item = phototag.createItem(getTestItem());
    item.click({x: 5, y: 2});
    expect(item.clicked()).toBeDefined();
    expect(item.clicked()).toBeFalsy();
  });
});
