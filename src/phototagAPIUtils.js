
const phototagAPIUtils = {
  apiPaths: {
    photoPath: '/api/v1/photos',
    leaderBoardPath: '/api/v1/leaderboards',
    challengePath: '/api/v1/challenges'
  },

  getHostUrl() {
    return('http://localhost:3000');
  },

  buildApiUrl(path, paramHash) {
    let uri = `${phototagAPIUtils.getHostUrl()}${path}?APITOKEN=9931c7c14267f95303df6518c28d8fd6`;

    for (let key in paramHash) {
      uri += `&${key}=${paramHash[key]}`;
    }

    return uri;
  },

  async doAPIGet(path, paramHash) {
    let response;

    try {
      response = await fetch(phototagAPIUtils.buildApiUrl(path, paramHash));
    } catch(err) {
      return Promise.reject(err);
    }

    if (response.ok) {
      return Promise.resolve(response.json());
    } else {
      return Promise.reject(response.json());
    }
  },

  makeAPIGetRequest(path, paramsHash, handleResp, handleErr) {
    // TODO: figure out how to use async here
    const timeoutPromise = new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject('Photo server took too long to respond.');
      }, 20000);
    });

    const apiRequest = Promise.race([phototagAPIUtils.doAPIGet(path, paramsHash), timeoutPromise]);

    apiRequest.then(
      response => {
        handleResp(response);
      },
      error => {
        handleErr(error);
      }
    );
  },

  buildPayload(body) {
    const jsonBody = JSON.stringify(body);
    return { "method" : "POST", "headers": { "Content-Type": "application/json; charset=utf-8" }, "body": jsonBody};
  },

  async doAPIPost(path, paramHash, body) {
    let response;

    const payload = phototagAPIUtils.buildPayload(body);

    try {
      response = await fetch(phototagAPIUtils.buildApiUrl(path, paramHash), payload);
    } catch(err) {
      return Promise.reject(err);
    }

    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response.json());
    }
  },

  makeAPIPostRequest(path, paramsHash, body, handleResp, handleErr) {
    // TODO: figure out how to use async here
    const timeoutPromise = new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject('Photo server took too long to respond.');
      }, 20000);
    });

    const apiRequest = Promise.race([phototagAPIUtils.doAPIPost(path, paramsHash, body), timeoutPromise]);

    apiRequest.then(
      response => {
        handleResp(response);
      },
      error => {
        handleErr(error);
      }
    );
  },
};

module.exports = phototagAPIUtils;
