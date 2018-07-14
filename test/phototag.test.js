const phototag = require('../src/phototag');

function getTestItem(name = "abcd", topLeftX, topLeftY, side) {
  const item = {};

  item.name = name;
  item.top_left_loc = `${topLeftX}, ${topLeftY}`
  item.bottom_right_loc = `${topLeftX + side}, ${topLeftY + side}`

  return item;
}

function getChallengeData(type, time, directed) {
  const meta_data = "{\"ctype\": " + "\"" + `${type}` +  "\"" + ", \"ctime\": " + `${time}` + ", \"directed\": " + `${directed}` + "}";
  return {"appid":"88cd371c98dded59","name":"Star Trek Captains timed challenge","desc":"Click on the face of each captain","photo_name":"startrekcaptains.jpg","meta_data": `${meta_data}`,"leaderboards":[]}
}

describe('Testing items....', () => {
  test('it should create an item with the correct name', () => {
    const item = phototag.createItem(getTestItem("abcd", 1, 1, 4));

    expect(item.getName()).toMatch('abcd');
  });

  test('It should report clicked if coords are within defined rectangle', () => {
    const item = phototag.createItem(getTestItem("abcd", 6, 6, 4));

    item.click({x: 8, y: 8});
    expect(item.clicked()).toBeTruthy();
  });

  test('It should not report clicked if coords are not within defined rectangle', () => {
    let item;

    // x within, y below
    item = phototag.createItem(getTestItem("abcd", 6, 6, 3));
    item.click({x: 2, y: 10});
    expect(item.clicked()).toBeDefined();
    expect(item.clicked()).toBeFalsy();

    // x within, y above
    item = phototag.createItem(getTestItem("abcd", 6, 6, 3));
    item.click({x: 2, y: 5});
    expect(item.clicked()).toBeDefined();
    expect(item.clicked()).toBeFalsy();

    // x without to left, y within
    item = phototag.createItem(getTestItem("abcd", 6, 6, 3));
    item.click({x: 5, y: 2});
    expect(item.clicked()).toBeDefined();
    expect(item.clicked()).toBeFalsy();

    // x without to right, y within
    item = phototag.createItem(getTestItem("abcd", 6, 6, 3));
    item.click({x: 7, y: 2});
    expect(item.clicked()).toBeDefined();
    expect(item.clicked()).toBeFalsy();
  });

  test('it should report name of item being clicked', () => {
    const item = phototag.createItem(getTestItem("abcd", 6, 6, 4));
    expect(item.getNameOfClicked({x: 7, y: 7})).toMatch("abcd");
  });

  test('it should report "" if no item is clicked', () => {
    const item = phototag.createItem(getTestItem("abcd", 6, 6, 4));
    expect(item.getNameOfClicked({x: 17, y:17})).toMatch("");
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

  test('it should return item clicked', () => {
    const picBoard = phototag.createPictureBoard();
    picBoard.addItem(phototag.createItem(getTestItem("item1", 1, 1, 3)));
    expect(picBoard.click({x: 2, y: 2})).toMatch("item1");
  });

  test('it should return null if no item clicked', () => {
    const picBoard = phototag.createPictureBoard();
    picBoard.addItem(phototag.createItem(getTestItem("item1", 1, 1, 3)));
    expect(picBoard.click({x: 5, y: 5})).toBeNull();
  });

  test('it should return a list of clicked items', () => {
    const picBoard = phototag.createPictureBoard();
    picBoard.addItem(phototag.createItem(getTestItem("item1", 1, 1, 3)));
    picBoard.addItem(phototag.createItem(getTestItem("item2", 6, 6, 3)));

    expect(picBoard.getItemsClicked().length).toBe(0);
    picBoard.click({x: 2, y: 2});
    expect(picBoard.getItemsClicked()).toMatch(/item1/);
    picBoard.click({x: 7, y: 7});
    expect(picBoard.getItemsClicked()).toMatch(/item2/);
     
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

  test("it should return of list of items", () => {
    const picBoard = phototag.createPictureBoard();
    picBoard.addItem(phototag.createItem(getTestItem("item1", 1, 1, 3)));
    picBoard.addItem(phototag.createItem(getTestItem("item2", 6, 6, 3)));

    const items = picBoard.getItemList();
    expect(items[0]).toMatch("item1");
    expect(items[1]).toMatch("item2");
  });

  test("it should report name of item clicked", () => {
    const picBoard = phototag.createPictureBoard();
    picBoard.addItem(phototag.createItem(getTestItem("item1", 1, 1, 3)));
    expect(picBoard.getNameOfClicked({x: 2, y: 2})).toMatch("item1");
  });

  test("it should report '' if no item clicked", () => {
    const picBoard = phototag.createPictureBoard();
    picBoard.addItem(phototag.createItem(getTestItem("item1", 1, 1, 3)));
    expect(picBoard.getNameOfClicked({x: 7, y: 7})).toMatch("");
  });
});

  describe('Testing challengeController', () => {

  test('It should create a controller with no picboard with correct state and status', () => {
    const picBoard = phototag.createPictureBoard();

    const controller = phototag.createChallengeController(null, getChallengeData("timed", 30000, true));

    // Challenge is created when someone chooses one
    expect(controller.getState()).toMatch('created');
    expect(controller.getStatus()).toMatch(/created/i);
  });

  test('It should create a controller with picboard with correct state and status', () => {
    const picBoard = phototag.createPictureBoard();

    const challengeData = getChallengeData("timed", 3000, true);
    const controller = phototag.createChallengeController(picBoard, challengeData);

    // Challenge is created when someone chooses one
    expect(controller.getState()).toMatch('ready');
    expect(controller.getStatus()).toMatch(/ready/i);
    expect(controller.getChallengeData()).toBe(challengeData);
  });
    
  test('it should throw an error if start is called before pic is added', () => {
    const controller = phototag.createChallengeController(null, getChallengeData("timed", 30000, true));
    expect(() => controller.start()).toThrow();
  });

  test('it should report correct state and status after adding a picboard', () => {
    const picBoard = phototag.createPictureBoard();

    const controller = phototag.createChallengeController(null, getChallengeData("timed", 30000, true));
    controller.addPicboard(picBoard);

    expect(controller.getState()).toMatch('ready');
    expect(controller.getStatus()).toMatch(/ready/i);
  });

  test('It should report correct state and status after being started', () => {
    const picBoard = phototag.createPictureBoard();

    const controller = phototag.createChallengeController(picBoard, getChallengeData("timed", 30000, false));
    controller.start();

    // Challenge is created when someone chooses one
    expect(controller.getState()).toMatch('playing');
    expect(controller.getStatus()).toMatch(/click/i);
  });

  test('it should throw an error if start is called after start has already been called', () => {
    const picBoard = phototag.createPictureBoard();

    const controller = phototag.createChallengeController(picBoard, getChallengeData("timed", 30000, true));
    controller.start();
    expect(() => controller.start()).toThrow();
  });

  test('It should report correct status and state when an unlimited time challenge is over', () => {
    const itemArr = [];
    const picBoard = phototag.createPictureBoard();
    picBoard.addItem(phototag.createItem(getTestItem("item1", 1, 1, 3)));
    // Need to save this for later mock of Date.now
    const controllerCreated = performance.now();
    const controller = phototag.createChallengeController(picBoard, getChallengeData("untimed", 0, true));
    controller.start();
    // Need to do this just before last item is clicked
    performance.now = jest.fn().mockImplementation(function() { return controllerCreated + 5000; });
    controller.clickPicture({x: 2, y: 2});
    expect(controller.getState()).toMatch('over');
    expect(controller.getStatus()).toMatch(/finished/i);
    expect(controller.getStatus()).toMatch(/5\.0/i);
  });

  test('It should report correct status and state when challenge is completed before time expires on a timed challenge, undirected', () => {
    jest.useFakeTimers();
    const picBoard = phototag.createPictureBoard();
    picBoard.addItem(phototag.createItem(getTestItem("item1", 1, 1, 3)));
    const challengeTime = 3000;
    const challengeData = getChallengeData("timed", challengeTime, false);
    const completedTime = 2000;
    const controller = phototag.createChallengeController(picBoard, challengeData);
    controller.start();
    jest.advanceTimersByTime(completedTime);
    controller.clickPicture({x: 2, y: 2});
    expect(controller.getState()).toMatch('over');
    expect(controller.getStatus()).toMatch(/finished/i);
    jest.clearAllTimers()
  });

  test('It should report correct status and state when time expires on a time limited challenge, undirected', () => {
    jest.useFakeTimers();
    const picBoard = phototag.createPictureBoard();
    picBoard.addItem(phototag.createItem(getTestItem("item1", 1, 1, 3)));
    const challengeTime = 30000;
    const challengeData = getChallengeData("timed", challengeTime, false);
    const controller = phototag.createChallengeController(picBoard, challengeData);
    controller.start();
    controller.clickPicture({x: 10, y: 10});
    jest.advanceTimersByTime(challengeTime);
    expect(controller.getState()).toMatch('over');
    expect(controller.getStatus()).toMatch(/failed/i);
  });

  test('it should report game over only if items are clicked in directed order', () => {
    jest.useFakeTimers();
    const picBoard = phototag.createPictureBoard();
    picBoard.addItem(phototag.createItem(getTestItem("item1", 1, 1, 3)));
    picBoard.addItem(phototag.createItem(getTestItem("item2", 6, 6, 3)));
    picBoard.addItem(phototag.createItem(getTestItem("item3", 11, 11, 3)));
    picBoard.addItem(phototag.createItem(getTestItem("item4", 16, 16, 3)));
    const origRandom = Math.random;
    Math.random = jest.fn();
    Math.random.mockReturnValueOnce(2).mockReturnValueOnce(3).mockReturnValueOnce(1).mockReturnValueOnce(4);
    const controller = phototag.createChallengeController(picBoard, getChallengeData("timed", 30000, true));
    Math.random = origRandom;
    controller.start();
    expect(controller.getStatus()).toMatch(/item3/i);
    controller.clickPicture({x: 2, y: 2});
    controller.clickPicture({x: 7, y: 7});
    controller.clickPicture({x: 12, y: 12});
    expect(controller.getStatus()).toMatch(/item1/i);
    controller.clickPicture({x: 17, y: 17});
    expect(controller.getState()).toMatch('playing');
    // item3 was clicked above
    controller.clickPicture({x: 2, y: 2});
    expect(controller.getStatus()).toMatch(/item2/i);
    controller.clickPicture({x: 7, y: 7});
    expect(controller.getStatus()).toMatch(/item4/i);
    controller.clickPicture({x: 17, y: 17});
    expect(controller.getState()).toMatch('over');
  });

  test('It should throw an error if click is called before game is started', () => {
    const picBoard = phototag.createPictureBoard();
    picBoard.addItem(phototag.createItem(getTestItem("item1", 1, 1, 3)));
    const controller = phototag.createChallengeController(picBoard, getChallengeData("timed", 30000, true));
    expect(() => controller.clickPicture({x: 2, y: 2})).toThrow();
  });

  test('It should throw an error if click is called after game is over', () => {
    const picBoard = phototag.createPictureBoard();
    picBoard.addItem(phototag.createItem(getTestItem("item1", 1, 1, 3)));
    const controller = phototag.createChallengeController(picBoard, getChallengeData("timed", 30000, true));
    controller.start();
    controller.clickPicture({x: 2, y: 2});
    expect(controller.getState()).toMatch('over');
    expect(() => controller.clickPicture({x: 2, y: 2})).toThrow();
  });

  test('it should return zero padded representation of a current elpased time of 0 for untimed challenge', ()=> {
    const picBoard = phototag.createPictureBoard();
    const controller = phototag.createChallengeController(picBoard, getChallengeData("untimed", 0, true));
    const origPerformance = performance.now;
    performance.now = jest.fn().mockReturnValue(0);
    controller.start();
    expect(controller.getTextCurrElapsedTime()).toMatch(/^00:00:00$/);
    performance.now = origPerformance;
  });

  test('it should return correct` representation of a current elpased time of 11:55:55 for untimed challenge', ()=> {
    const picBoard = phototag.createPictureBoard();
    const metaData = {"ctype": "untimed", true: "true"};
    const controller = phototag.createChallengeController(picBoard, getChallengeData("untimed", 0, true));
    const origPerformance = performance.now;
    performance.now = jest.fn().mockReturnValue(0);
    controller.start();
    performance.now = jest.fn().mockReturnValue(715550);
    expect(controller.getTextCurrElapsedTime()).toMatch(/^11:55:55$/);
    performance.now = origPerformance;
  });

  test('it should return zero padded representation of current time for timed challenge', () => {
    const picBoard = phototag.createPictureBoard();
    const controller = phototag.createChallengeController(picBoard, getChallengeData("timed", 30000, true));
    const origPerformance = performance.now;
    performance.now = jest.fn().mockReturnValue(0);
    controller.start();
    expect(controller.getTextCurrElapsedTime()).toMatch(/^00:30:00$/);
    performance.now = origPerformance;
  });

  test('it should return correct` representation of a current elpased time for timed challenge', ()=> {
    const picBoard = phototag.createPictureBoard();
    const metaData = {"ctype": "untimed", true: "true"};
    const controller = phototag.createChallengeController(picBoard, getChallengeData("timed", 30000, true));
    const origPerformance = performance.now;
    performance.now = jest.fn().mockReturnValue(0);
    controller.start();
    performance.now = jest.fn().mockReturnValue(20000);
    expect(controller.getTextCurrElapsedTime()).toMatch(/^00:10:00$/);
    performance.now = origPerformance;
  });
});
