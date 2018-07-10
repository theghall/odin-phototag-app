/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);\n/* harmony import */ var _assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n// eslint-disable-next-line import/no-extraneous-dependencies\n__webpack_require__(1);\n\n// normalize.css must be loaded first before app css, so disable eslint check\n/* eslint-disable import/first */\n\n/* eslint-enable import/first */\n\nconst phototagUI = __webpack_require__(3);\n\nphototagUI.buildMenuPage();\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./node_modules/normalize.css/normalize.css?");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/assets/css/style.scss?");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

eval("const phototag = __webpack_require__(4);\nconst phototagAPI = __webpack_require__(5);\n\nconst phototagAPIInterface = {\n  getChallenges(displayCallback, errorCallback) {\n    phototagAPI.makeAPIGetRequest(phototagAPI.apiPaths.challengePath, {}, displayCallback, errorCallback);\n  },\n};\n\nconst phototagUI = {\n  interfaces: {\n    picBoard: null,\n    challengeController: null\n  },\n\n  identifiers: {\n    appTitleID: 'title',\n    menuPageID: 'menu-page',\n    fetchingID: 'fetching'\n  },\n\n  appName() {\n    return \"Identicize\";\n  },\n\n  getRootElement() {\n    return document.getElementById('root');\n  },\n\n  createWrapperElement(id) {\n    const div = document.createElement('div');\n    div.id = id;\n    return div;\n  },\n\n  createTitleBanner() {\n    const title = phototagUI.createWrapperElement(phototagUI.identifiers.appTitleID);\n    title.textContent = phototagUI.appName();\n    return title;\n  },\n\n  createFetchingMessage(item) {\n    const p = document.createElement('p');\n    p.id = phototagUI.identifiers.fetchingID;\n    p.textContent = `Fetching ${item} ......`;\n    return p;\n  },\n\n  removeFetchingMessage() {\n    const p = document.getElementById(phototagUI.identifiers.fetchingID);\n    const parentElem = p.parentNode;\n    parentElem.removeChild(p);\n  },\n\n  listeners: {\n    loadChallenge(e) {\n      console.log(e);\n    },\n  },\n\n  createDataCell(tag, text, hidden = false) {\n    const elem = document.createElement(tag);\n    if (hidden) elem.classList.add('hidden');\n    elem.textContent = text;\n    return elem;\n  },\n\n  addHeaders(table) {\n    const colHeaders = ['Challenge', 'Best Time', 'Initials', ''];\n    const thead = document.createElement('thead');\n    const tr = document.createElement('tr');\n\n    for (let i = 0; i < colHeaders.length; i += 1) {\n      tr.appendChild(phototagUI.createDataCell('th', colHeaders[i]));\n    }\n    thead.appendChild(tr);\n    table.appendChild(thead);\n  },\n\n  addRows(table, challenges) {\n    console.log(challenges);\n    const tbody = document.createElement('tbody');\n\n    for (let i = 0; i < challenges.length; i += 1) {\n      const tr = document.createElement('tr');\n      tr.appendChild(phototagUI.createDataCell('td',challenges[i][\"name\"]));\n      tr.childNodes[0].addEventListener('click', phototagUI.listeners.loadChallenge);\n      if (challenges[i][\"leaderboards\"].length > 0) {\n        tr.appendChild(phototagUI.createDataCell('td',challenges[i][\"leaderboards\"][0].challenge_time));\n        tr.appendChild(phototagUI.createDataCell('td',challenges[i][\"leaderboards\"][0].name));\n      } else {\n        tr.appendChild(phototagUI.createDataCell('td','---'));\n        tr.appendChild(phototagUI.createDataCell('td','---'));\n      }\n      tr.appendChild(phototagUI.createDataCell('td',challenges[i].photo_name, true));\n      tbody.appendChild(tr);\n    }\n    table.appendChild(tbody);\n  },\n\n  addChallengeMenu(challenges) {\n    phototagUI.removeFetchingMessage();\n\n    const menuPage = document.getElementById(phototagUI.identifiers.menuPageID);\n    const table = document.createElement('table');\n    phototagUI.addHeaders(table);\n    phototagUI.addRows(table, challenges);\n    menuPage.appendChild(table);\n  },\n\n  handleFetchErr(error) {\n    alert(error);\n  },\n\n  requestChallenges() {\n    phototagAPIInterface.getChallenges(phototagUI.addChallengeMenu, phototagUI.handleFetchErr);\n  },\n\n  buildMenuPage() {\n    const rootElement = phototagUI.getRootElement();\n    const menuPage = phototagUI.createWrapperElement(phototagUI.identifiers.menuPageID);\n    menuPage.appendChild(phototagUI.createTitleBanner());\n    rootElement.appendChild(menuPage);\n    menuPage.appendChild(phototagUI.createFetchingMessage('challenges'));\n    phototagUI.requestChallenges();\n  },\n};\n\nmodule.exports = phototagUI;\n\n\n//# sourceURL=webpack:///./src/phototagUI.js?");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

eval("const phototag = {\n  nameable: state => ({\n    getName: () => state.name,\n  }),\n\n  clickableItem: (state, helpers) => ({\n    click: (coords) => {\n      if (!state.clicked) {\n        state.clicked = helpers.coords_within_rect(coords, state, helpers);\n      }\n    },\n    clicked: () => state.clicked,\n  }),\n\n  itemHelpers: {\n    coords_within_rect(coords, state, helpers) {\n      const {x, y} = coords;\n\n      const leftX = helpers.getXY(state.top_left_loc).x;\n      const rightX = helpers.getXY(state.bottom_right_loc).x;\n      const bottomY = helpers.getXY(state.bottom_right_loc).y;\n      const topY = helpers.getXY(state.top_left_loc).y;\n\n      return x > leftX && x < rightX && y > topY && y < bottomY;\n\n    },\n\n    getXY(loc) {\n      const locArr = loc.split(\",\");\n\n      const x = parseInt(locArr[0], 10);\n      const y = parseInt(locArr[1], 10);\n\n      return {\"x\": x, \"y\": y}\n    },\n  },\n\n  createItem(item) {\n    const state = {\n      name: item.name,\n      bottom_left_loc: item.bottom_left_loc,\n      top_left_loc: item.top_left_loc,\n      top_right_loc: item.top_right_loc,\n      bottom_right_loc: item.bottom_right_loc,\n      clicked: false\n    };\n\n    return Object.assign({}, phototag.nameable(state), phototag.clickableItem(state, phototag.itemHelpers));\n  },\n\n  itemable: state => ({\n    addItem: (item) => { state.items.push(item)},\n    getItem: (index) => state.items[index],\n  }), \n\n  clickableBoard: (state, helpers) => ({\n    click: (coords) => {\n      let itemClicked = null;\n\n      for (let i = 0; i < state.items.length; i += 1) {\n        state.items[i].click(coords)\n        if (state.items[i].clicked()) {\n          itemClicked = state.items[i].getName();\n          helpers.updateItemsClicked(itemClicked, state);\n        }\n      }\n      helpers.updateAllItemsClicked(state);\n\n      return itemClicked;\n    },\n    getItemsClicked: () => state.itemsClicked.toString(),\n    allItemsClicked: () => state.allItemsClicked,\n  }),\n\n  boardHelpers: {\n    updateItemsClicked: (itemName, state) => {\n      if (state.itemsClicked.indexOf(itemName) === -1) {\n        state.itemsClicked.push(itemName);\n      }\n    },\n    updateAllItemsClicked: (state) => {\n      const clicked = [];\n\n      for (let i = 0; i < state.items.length; i += 1) {\n        clicked[i] = state.items[i].clicked();\n      }\n\n      state.allItemsClicked = !clicked.includes(false);\n    },\n  },\n      \n  createPictureBoard() {\n    const state = {\n      items: [],\n      itemsClicked: [],\n      allItemsClicked: false\n    }\n\n    return Object.assign({}, phototag.itemable(state), phototag.clickableBoard(state, phototag.boardHelpers));\n  },\n\n  phaseable: state => ({\n    getStatus: () => state.gameStatus,\n    getState: () => state.phase,\n  }),\n\n  playable: state => ({\n    clickPicture: (coords) => {\n      if (state.phase !== 'playing') {\n        throw('Clicked was called when game was not being played');\n      }\n\n      state.picBoard.click(coords);\n      if (state.picBoard.allItemsClicked()) {\n        state.elapsedTime = Date.now() - state.timeStart;\n        state.phase = 'over';\n        state.gameStatus = `You finished in ${(state.elapsedTime/1000).toFixed(1)} seconds`\n\n        if (state.challengeTime !== null) {\n          state.timedSuccess = true;\n          clearTimeout(state.timerID);\n        }\n      }\n    },\n    getElapsedTime: () => state.elapsedTime,\n  }),\n\n  timed: (state) => (\n    state.timerID = setTimeout(function() { \n      state.phase = 'over';\n      state.timedSuccess = false;\n      state.elapsedTime = state.challengeTime;\n      state.gameStatus = 'You failed to complete the challenge on time';\n    },\n    state.challengeTime)\n  ),\n\n  createChallengeController(picBoard, challengeTime = null) {\n    let controller = null;\n\n    const state = {\n      picBoard: picBoard,\n      phase: 'playing',\n      gameStatus: 'Click on objects and/or people',\n      timeStart: Date.now(),\n      elapsedTime: 0,\n      challengeTime: challengeTime,\n      timerID: null,\n      timedSuccess: false\n    }\n\n    if (challengeTime === null) {\n      controller = Object.assign({}, phototag.phaseable(state), phototag.playable(state));\n    } else {\n      controller = Object.assign({}, phototag.phaseable(state), phototag.playable(state), phototag.timed(state));\n    }\n\n    return controller;\n\n  },\n\n};\n\nmodule.exports = phototag;\n\n\n\n//# sourceURL=webpack:///./src/phototag.js?");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

eval("\nconst phototagAPIUtils = {\n  apiPaths: {\n    photoPath: '/api/v1/photos',\n    leaderBoardPath: '/api/v1/leaderboards',\n    challengePath: '/api/v1/challenges'\n  },\n\n  buildApiUrl(path, paramHash) {\n    let uri = `http://localhost:3000${path}?APITOKEN=9931c7c14267f95303df6518c28d8fd6`;\n\n    for (let key in paramHash) {\n      uri += `&${key}=${paramHash[key]}`;\n    }\n\n    return uri;\n  },\n\n  async doAPIGet(path, paramHash) {\n    let response;\n\n    try {\n      response = await fetch(phototagAPIUtils.buildApiUrl(path, paramHash));\n    } catch(err) {\n      return Promise.reject(err);\n    }\n\n    if (response.ok) {\n      return Promise.resolve(response.json());\n    } else {\n      return Promise.reject(response.json());\n    }\n  },\n\n  makeAPIGetRequest(path, paramsHash, handleResp, handleErr) {\n    // TODO: figure out how to use async here\n    const timeoutPromise = new Promise((resolve, reject) => {\n      const id = setTimeout(() => {\n        clearTimeout(id);\n        reject('Photo server took too long to respond.');\n      }, 20000);\n    });\n\n    const apiRequest = Promise.race([phototagAPIUtils.doAPIGet(path, paramsHash), timeoutPromise]);\n\n    apiRequest.then(\n      response => {\n        handleResp(response);\n      },\n      error => {\n        handleErr(error);\n      }\n    );\n  },\n\n  buildPayload(body) {\n    const jsonBody = JSON.stringify(body);\n    return { \"method\" : \"POST\", \"headers\": { \"Content-Type\": \"application/json; charset=utf-8\" }, \"body\": jsonBody};\n  },\n\n  async doAPIPost(path, paramHash, body) {\n    let response;\n\n    const payload = phototagAPIUtils.buildPayload(body);\n\n    try {\n      response = await fetch(phototagAPIUtils.buildApiUrl(path, paramHash), payload);\n    } catch(err) {\n      return Promise.reject(err);\n    }\n\n    if (response.ok) {\n      return Promise.resolve(response);\n    } else {\n      return Promise.reject(response.json());\n    }\n  },\n\n  makeAPIPostRequest(path, paramsHash, body, handleResp, handleErr) {\n    // TODO: figure out how to use async here\n    const timeoutPromise = new Promise((resolve, reject) => {\n      const id = setTimeout(() => {\n        clearTimeout(id);\n        reject('Photo server took too long to respond.');\n      }, 20000);\n    });\n\n    const apiRequest = Promise.race([phototagAPIUtils.doAPIPost(path, paramsHash, body), timeoutPromise]);\n\n    apiRequest.then(\n      response => {\n        handleResp(response);\n      },\n      error => {\n        handleErr(error);\n      }\n    );\n  },\n};\n\nmodule.exports = phototagAPIUtils;\n\n\n//# sourceURL=webpack:///./src/phototagAPIUtils.js?");

/***/ })
/******/ ]);