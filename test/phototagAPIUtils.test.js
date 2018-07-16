const phototagAPIUtils = require('../src/phototagAPIUtils');

function mockFetch(data) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data
    })
  );
}

function mockFetchTimeout() {
  return jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject('Timeout error occured');
      }, 30000);
    });
  });
}

function mockFetchError(error) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: false,
      status: 400,
      json: () => error
    })
  );
}

function mockPostFetch() {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      status: 201
    })
  );
}
describe('Testing helpers....', () => {
  test('it should return the correct URL', () => {
    const token = "9931c7c14267f95303df6518c28d8fd6";
    const path = phototagAPIUtils.apiPaths.photoPath;
    const host = "https://tagphoto.herokuapp.com";

    expect(phototagAPIUtils.buildApiUrl(path)).toMatch(
      `${host}${path}?APITOKEN=${token}`);
    expect(phototagAPIUtils.buildApiUrl(path, {category: "cat1"})).toMatch(
      `${host}${path}?APITOKEN=${token}&category=cat1`);
    expect(phototagAPIUtils.buildApiUrl(path, {category: "cat1", difficulty: "hard"})).toMatch(
      `${host}${path}?APITOKEN=${token}&category=cat1&difficulty=hard`);
    expect(phototagAPIUtils.buildApiUrl(path, {category: "cat1", difficulty: "hard", number: "1"})).toMatch(
      `${host}${path}?APITOKEN=${token}&category=cat1&difficulty=hard&number=1`);
  });
});

describe('Testing API GET interface...', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('it should call fetch with correct params', () => {
    const path = phototagAPIUtils.apiPaths.photoPath;
    const paramsHash = {"category":"cat1"};
    const handleResp = jest.fn();
    const handleErr = jest.fn();
    expect.assertions(2);
    fetch = mockFetch('[{}]');
    const resp = phototagAPIUtils.makeAPIGetRequest(phototagAPIUtils.apiPaths.photoPath, paramsHash, handleResp, handleErr);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(phototagAPIUtils.buildApiUrl(path, paramsHash));
  });

  test('it should handle a data response', (done) => {
    const data='[{"name":"hello","desc":"cool","difficulty":"hard","category":"cat1","image_filename":"aaa.png","items":[{"name":"Clock","bottom_left_loc":"1,1","top_left_loc":"1,3","top_right_loc":"3,3","bottom_right_loc":"3,1"},{"name":"Brush","bottom_left_loc":"5,5","top_left_loc":"5,7","top_right_loc":"7,7","bottom_right_loc":"7,5"}]}]';
    const handleResp = jest.fn().mockImplementation(function (response) {
      expect(response).toMatch(data); 
      done();
    });
    const handleErr = jest.fn();
    const paramsHash = {"category": "cat1"}
    fetch = mockFetch(data);
    phototagAPIUtils.makeAPIGetRequest(phototagAPIUtils.apiPaths.photoPath, paramsHash, handleResp, handleErr);
  });

  test('it should handle a timeout response', (done) => {
    const handleResp = jest.fn();
    const handleErr = jest.fn().mockImplementation(function (error) {
      expect(error).toMatch('Photo server took too long to respond.');
      done();
    });
    const paramsHash = {"category": "cat1"}
    const data = '{[]}';
    // Once advance timers is called, this timeout will lose, simulating a server timeout
    // mockFn.restoreMock does not work
    const origdoAPIGet = phototagAPIUtils.doAPIGet;
    phototagAPIUtils.doAPIGet = mockFetchTimeout();
    fetch = mockFetch(data);
    phototagAPIUtils.makeAPIGetRequest(phototagAPIUtils.apiPaths.photoPath, paramsHash, handleResp, handleErr);
    jest.advanceTimersByTime(20000);
    phototagAPIUtils.doAPIGet = origdoAPIGet;
  });

  test('it should handle an error response', (done) => {
    expect.assertions(1);
    const error = '[{"code": 400, "errors": ["bad request"]}]';
    const handleResp = jest.fn().mockImplementation(function (response) {
      // If this is called then test will fail since done() is not called
    });
    const handleErr = jest.fn().mockImplementation(function (error) {
      expect(error).toMatch(error);
      done();
    });
    const paramsHash = {};
    fetch = mockFetchError(error);
    phototagAPIUtils.makeAPIGetRequest(phototagAPIUtils.apiPaths.photoPath, paramsHash, handleResp, handleErr);
  });
});

describe('Testing API POST interface...', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('it should call fetch with correct params', () => {
    expect.assertions(2);
    const path = phototagAPIUtils.apiPaths.leaderBoardPath;
    const paramsHash = {"appid": "4b10c09f65eb6f5a"};
    const body = JSON.stringify({ leaderboard: { name: "ABC", challenge_time: "5.6" }});
    const payload = phototagAPIUtils.buildPayload(body);
    const handleResp = jest.fn();
    const handleErr = jest.fn();
    fetch = mockPostFetch();
    phototagAPIUtils.makeAPIPostRequest(path, paramsHash, body, handleResp, handleErr);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(phototagAPIUtils.buildApiUrl(path, paramsHash), payload);
  });

  test('it should handle a 201 response to an update', (done) => {
    expect.assertions(1);
    const path = phototagAPIUtils.apiPaths.leaderBoardPath;
    const paramsHash = {"appid": "4b10c09f65eb6f5a"};
    const body = JSON.stringify({ leaderboard: { name: "ABC", challenge_time: "5.6" }});
    const handleResp = jest.fn().mockImplementation(function (response) {
      expect(response.status).toBe(201);
      done();
    });
    const handleErr = jest.fn().mockImplementation(function (error) {
      // If this is called then test will fail since done() is not called
    });
    fetch = mockPostFetch();
    phototagAPIUtils.makeAPIPostRequest(path, paramsHash, body, handleResp, handleErr);
  });

  test('it should handle a timeout response', (done) => {
    const path = phototagAPIUtils.apiPaths.leaderBoardPath;
    const paramsHash = {"appid": "4b10c09f65eb6f5a"};
    const body = JSON.stringify({ leaderboard: { name: "ABC", challenge_time: "5.6" }});
    const handleResp = jest.fn();
    const handleErr = jest.fn().mockImplementation(function (error) {
      expect(error).toMatch('Photo server took too long to respond.');
      done();
    });
    // Once advance timers is called, this timeout will lose, simulating a server timeout
    // mockFn.restoreMock does not work
    const origdoAPIPost = phototagAPIUtils.doAPIPost;
    phototagAPIUtils.doAPIPost = mockFetchTimeout();
    fetch = mockPostFetch();
    phototagAPIUtils.makeAPIPostRequest(path, paramsHash, body, handleResp, handleErr);
    jest.advanceTimersByTime(20000);
    phototagAPIUtils.doAPIPost = origdoAPIPost;
  });

  test('it should handle an error response', (done) => {
    expect.assertions(1);
    const path = phototagAPIUtils.apiPaths.leaderBoardPath;
    const paramsHash = {"appid": "4b10c09f65eb6f5a"};
    const body = JSON.stringify({ leaderboard: { name: "ABC", challenge_time: "5.6" }});
    const error = '[{"code": 400, "errors": ["bad request"]}]';
    const handleResp = jest.fn().mockImplementation(function (response) {
      // If this is called then test will fail since done() is not called
    });
    const handleErr = jest.fn().mockImplementation(function (error) {
      expect(error).toMatch(error);
      done();
    });
    fetch = mockFetchError(error);
    phototagAPIUtils.makeAPIPostRequest(path, paramsHash, body, handleResp, handleErr);
  });


});


