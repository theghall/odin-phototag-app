const phototag = require('../src/phototag');

function getTestItem(name = "abcd", bottomLeftX, bottomLeftY, side) {
  const item = {};

  item.name = name;
  item.bottom_left_loc = `${bottomLeftX}, ${bottomLeftY}`
  item.top_left_loc = `${bottomLeftX}, ${bottomLeftY + side}`
  item.top_right_loc = `${bottomLeftX + side}, ${bottomLeftY + side}`
  item.bottom_right_loc = `${bottomLeftX + side}, ${bottomLeftY}`

  return item;
}

describe('Testing items....', () => {
  test('it should create an item with the correct name', () => {
    const item = phototag.createItem(getTestItem("abcd", 1, 1, 4));

    expect(item.getName()).toMatch('abcd');
  });

  test('It should report clicked if coords are within defined rectangle', () => {
    const item = phototag.createItem(getTestItem("abcd", 1, 1, 4));

    item.click({x: 2, y: 2});
    expect(item.clicked()).toBeTruthy();
  });

  test('It should not report clicked if coords are not within defined rectangle', () => {
    let item;

    // x within, y below
    item = phototag.createItem(getTestItem("abcd", 1, 1, 3));
    item.click({x: 2, y: 0});
    expect(item.clicked()).toBeDefined();
    expect(item.clicked()).toBeFalsy();

    // x within, y above
    item = phototag.createItem(getTestItem("abcd", 1, 1, 3));
    item.click({x: 2, y: 5});
    expect(item.clicked()).toBeDefined();
    expect(item.clicked()).toBeFalsy();

    // x without to left, y within
    item = phototag.createItem(getTestItem("abcd", 1, 1, 3));
    item.click({x: 0, y: 2});
    expect(item.clicked()).toBeDefined();
    expect(item.clicked()).toBeFalsy();

    // x without to right, y within
    item = phototag.createItem(getTestItem("abcd", 1, 1, 3));
    item.click({x: 5, y: 2});
    expect(item.clicked()).toBeDefined();
    expect(item.clicked()).toBeFalsy();
  });
});

describe('Testing pictureBoard....', () => {
  test('It should add an item', () => {
    const itemArr = [];

    for (let i = 0; i < 4; i += 1) {
      itemArr[i] = phototag.createItem(getTestItem(`item${i+1}`, 1, 1, 3))
    }

    const picBoard = phototag.createPictureBoard();

    for (let i = 0; i < 4; i += 1) {
      picBoard.addItem(itemArr[i]);
    }

    for (let i = 0; i < 4; i += 1) {
      expect(picBoard.getItem(i).getName()).toMatch(`item${i+1}`);
    }
  });

  test('It should report all items clicked', () => {
    const itemArr = [];

    itemArr[0] = phototag.createItem(getTestItem("item1", 1, 1, 3));
    itemArr[1] = phototag.createItem(getTestItem("item2", 6, 6, 3));
    itemArr[2] = phototag.createItem(getTestItem("item3", 11, 11, 3));
    itemArr[3] = phototag.createItem(getTestItem("item4", 16, 16, 3));

    const picBoard = phototag.createPictureBoard();

    for (let i = 0; i < 4; i += 1) {
      picBoard.addItem(itemArr[i]);
    }

    picBoard.click({x: 2, y: 2});
    picBoard.click({x: 7, y: 7});
    picBoard.click({x: 12, y: 12});
    picBoard.click({x: 17, y: 17});

    expect(picBoard.allItemsClicked()).toBeTruthy();
  });

  test('It should not report all items clicked', () => {
    const itemArr = [];

    itemArr[0] = phototag.createItem(getTestItem("item1", 1, 1, 3));
    itemArr[1] = phototag.createItem(getTestItem("item2", 6, 6, 3));
    itemArr[2] = phototag.createItem(getTestItem("item3", 11, 11, 3));
    itemArr[3] = phototag.createItem(getTestItem("item4", 16, 16, 3));

    const picBoard = phototag.createPictureBoard();

    for (let i = 0; i < 4; i += 1) {
      picBoard.addItem(itemArr[i]);
    }

    expect(picBoard.allItemsClicked()).toBeDefined();
    expect(picBoard.allItemsClicked()).toBeFalsy();

    picBoard.click({x: 2, y: 2});
    picBoard.click({x: 7, y: 7});
    picBoard.click({x: 12, y: 12});

    expect(picBoard.allItemsClicked()).toBeDefined();
    expect(picBoard.allItemsClicked()).toBeFalsy();
  });
});

  describe('Testing challengeController', () => {

  test('It should create a controller with correct state and status', () => {
    const picBoard = phototag.createPictureBoard();

    const controller = phototag.createChallengeController(picBoard, null);

    // Challenge is created when someone chooses one
    expect(controller.getState()).toMatch('playing');
    expect(controller.getStatus()).toMatch(/click/i);
  });

  test('It should report correct status and state when an unlimited time challenge is over', () => {
    const itemArr = [];
    const picBoard = phototag.createPictureBoard();
    picBoard.addItem(phototag.createItem(getTestItem("item1", 1, 1, 3)));
    // Need to save this for later mock of Date.now
    const controllerCreated = Date.now();
    const controller = phototag.createChallengeController(picBoard, null);
    // Need to do this just before last item is clicked
    Date.now = jest.fn().mockImplementation(function() { return controllerCreated + 5000; });
    controller.clickPicture({x: 2, y: 2});
    expect(controller.getState()).toMatch('over');
    expect(controller.getStatus()).toMatch(/finished/i);
    expect(controller.getStatus()).toMatch(/5\.0/i);
  });

  test('It should report correct status and state when challenge is completed before time expires on a timed challenge', () => {
    jest.useFakeTimers();
    const picBoard = phototag.createPictureBoard();
    picBoard.addItem(phototag.createItem(getTestItem("item1", 1, 1, 3)));
    const challengeTime = 3000;
    const completedTime = 2000;
    const controller = phototag.createChallengeController(picBoard, challengeTime);
    jest.advanceTimersByTime(completedTime);
    controller.clickPicture({x: 2, y: 2});
    expect(controller.getState()).toMatch('over');
    expect(controller.getStatus()).toMatch(/finished/i);
    jest.clearAllTimers()
  });

  test('It should report correct status and state when time expires on a time limited challenge', () => {
    jest.useFakeTimers();
    const picBoard = phototag.createPictureBoard();
    picBoard.addItem(phototag.createItem(getTestItem("item1", 1, 1, 3)));
    const challengeTime = 30000;
    const controller = phototag.createChallengeController(picBoard, challengeTime);
    controller.clickPicture({x: 10, y: 10});
    jest.advanceTimersByTime(challengeTime);
    expect(controller.getState()).toMatch('over');
    expect(controller.getStatus()).toMatch(/failed/i);
  });

  test('It should throw an error if click is called after game is over', () => {
    const picBoard = phototag.createPictureBoard();
    picBoard.addItem(phototag.createItem(getTestItem("item1", 1, 1, 3)));
    const controller = phototag.createChallengeController(picBoard, null);
    controller.clickPicture({x: 2, y: 2});
    expect(controller.getState()).toMatch('over');
    expect(() => controller.clickPicture({x: 2, y: 2})).toThrow();
  });
});
