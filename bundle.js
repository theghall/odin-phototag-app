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

eval("const phototag = __webpack_require__(4);\nconst phototagAPI = __webpack_require__(5);\n\nconst phototagAPIInterface = {\n  getChallenges(displayCallback, errorCallback) {\n  phototagAPI.makeAPIGetRequest(phototagAPI.apiPaths.challengePath, {}, displayCallback, errorCallback);\n  },\n\n  getPhotoInfo(image, displayCallback, errorCallback) {\n    phototagAPI.makeAPIGetRequest(phototagAPI.apiPaths.photoPath, {image_filename: `${image}`}, displayCallback, errorCallback);\n  },\n};\n\nconst phototagUI = {\n  interfaces: {\n    picBoard: null,\n    challengeController: null\n  },\n\n  identifiers: {\n    appTitleID: 'title',\n    challengePageID: 'challenge-page',\n    displayBoardID: 'display-board',\n    fetchingID: 'fetching',\n    itemListID: 'item-list',\n    mainBoardID: 'main-board',\n    menuPageID: 'menu-page',\n    noticeID: 'status',\n    photoID: 'challenge-photo',\n    picboardID: 'pic-board',\n    sideboardID: 'side-board',\n    timerID: 'timer'\n  },\n\n  appName() {\n    return \"Identicize\";\n  },\n\n  getRootElement() {\n    return document.getElementById('root');\n  },\n\n  getXYTopLeftPic() {\n    return {\"top_left_x\": 250, \"top_left_y\": 32}\n  },\n\n  createWrapperElement(id) {\n    const div = document.createElement('div');\n    div.id = id;\n    return div;\n  },\n\n  createTitleBanner() {\n    const title = phototagUI.createWrapperElement(phototagUI.identifiers.appTitleID);\n    title.textContent = phototagUI.appName();\n    return title;\n  },\n\n  createFetchingNotice(item) {\n    const p = document.createElement('p');\n    p.id = phototagUI.identifiers.fetchingID;\n    p.textContent = `Fetching ${item} .....`;\n    return p;\n  },\n\n  removeElement(id) {\n    const elem = document.getElementById(id);\n    const parentElem = elem.parentNode;\n    parentElem.removeChild(elem);\n  },\n\n  createPicboard(photo) {\n    const picboard = phototag.createPictureBoard();\n\n    for (let i = 0; i < photo[0][\"items\"].length; i += 1) {\n      picboard.addItem(phototag.createItem(photo[0][\"items\"][i]));\n    }\n\n    return picboard;\n  },\n\n  initInterfaces(photo) {\n    phototagUI.interfaces.picBoard = phototagUI.createPicboard(photo);\n    phototagUI.interfaces.challengeController.addPicboard(phototagUI.interfaces.picBoard);\n  },\n\n  linkPhoto(image_filename) {\n    const img = document.getElementById(phototagUI.identifiers.photoID);\n    img.setAttribute('src', `${phototagAPI.getHostUrl()}/${image_filename}`);\n  },\n\n  updatePicboard(image_filename) {\n    phototagUI.removeElement(phototagUI.identifiers.fetchingID);\n    phototagUI.linkPhoto(image_filename);\n  },\n\n  updateTimer() {\n    const timer = document.getElementById(phototagUI.identifiers.timerID);\n    timer.textContent = phototagUI.interfaces.challengeController.getTextCurrElapsedTime();\n    if (phototagUI.interfaces.challengeController.getState() != 'over') {\n      requestAnimationFrame(phototagUI.updateTimer);\n    } else {\n      phototagUI.updateNotice();\n    }\n  },\n\n  updateNotice() {\n    const notice = document.getElementById(phototagUI.identifiers.noticeID);\n    notice.textContent = phototagUI.interfaces.challengeController.getStatus();\n  },\n\n  updateItemList() {\n    const itemsClicked = phototagUI.interfaces.picBoard.getItemsClicked().split(',');\n\n    const ul = document.getElementById(phototagUI.identifiers.itemListID);\n   \n    while (ul.firstChild) {\n      ul.removeChild(ul.firstChild);\n    }\n\n    const items = phototagUI.interfaces.picBoard.getItemList();\n\n    for (let i = 0; i < items.length; i += 1) {\n      const li = document.createElement('li');\n      li.textContent = items[i];\n      if (itemsClicked.includes(items[i])) {\n        li.classList.add('strike');\n      }\n      ul.appendChild(li);\n    }\n  },\n\n  handlePhotoResponse(photo) {\n    phototagUI.initInterfaces(photo);\n    phototagUI.updatePicboard(photo[0][\"image_filename\"]);\n    requestAnimationFrame(phototagUI.updateTimer);\n    phototagUI.interfaces.challengeController.start();\n    phototagUI.updateNotice();\n    phototagUI.updateItemList();\n  },\n\n\n  listeners: {\n    loadChallenge(e) {\n      const td = e.target.parentNode;\n      const image = td.childNodes[3].textContent;\n      const challengeData = td.childNodes[4].textContent;\n      phototagUI.interfaces.challengeController = phototag.createChallengeController(null, challengeData);\n      phototagUI.buildChallengePage();\n      phototagAPIInterface.getPhotoInfo(image, phototagUI.handlePhotoResponse, phototagUI.handleErr);\n    },\n\n    handlePicClick(e) {\n      const {top_left_x, top_left_y} = phototagUI.getXYTopLeftPic();\n      // Adjust for offset from left and top\n      const x = e.clientX - top_left_x;\n      const y = e.clientY - top_left_y;\n      phototagUI.interfaces.challengeController.clickPicture({x: `${x}`, y: `${y}`});\n      phototagUI.updateNotice();\n      phototagUI.updateItemList();\n    }\n  },\n\n  createDataCell(tag, text, hidden = false) {\n    const elem = document.createElement(tag);\n    if (hidden) elem.classList.add('hidden');\n    elem.textContent = text;\n    return elem;\n  },\n\n  addHeaders(table) {\n    const colHeaders = ['Challenge', 'Best Time', 'Initials', '', ''];\n    const thead = document.createElement('thead');\n    const tr = document.createElement('tr');\n\n    for (let i = 0; i < colHeaders.length; i += 1) {\n      tr.appendChild(phototagUI.createDataCell('th', colHeaders[i]));\n    }\n    thead.appendChild(tr);\n    table.appendChild(thead);\n  },\n\n  addRows(table, challenges) {\n    const tbody = document.createElement('tbody');\n\n    for (let i = 0; i < challenges.length; i += 1) {\n      const tr = document.createElement('tr');\n      tr.appendChild(phototagUI.createDataCell('td',challenges[i][\"name\"]));\n      tr.childNodes[0].addEventListener('click', phototagUI.listeners.loadChallenge);\n      if (challenges[i][\"leaderboards\"].length > 0) {\n        tr.appendChild(phototagUI.createDataCell('td',challenges[i][\"leaderboards\"][0].challenge_time));\n        tr.appendChild(phototagUI.createDataCell('td',challenges[i][\"leaderboards\"][0].name));\n      } else {\n        tr.appendChild(phototagUI.createDataCell('td','---'));\n        tr.appendChild(phototagUI.createDataCell('td','---'));\n      }\n      tr.appendChild(phototagUI.createDataCell('td',challenges[i].photo_name, true));\n      delete challenges[i][\"leaderboards\"];\n      tr.appendChild(phototagUI.createDataCell('td', JSON.stringify(challenges[i]), true));\n      tbody.appendChild(tr);\n    }\n    table.appendChild(tbody);\n  },\n\n  addChallengeMenu(challenges) {\n    phototagUI.removeElement(phototagUI.identifiers.fetchingID);\n\n    const menuPage = document.getElementById(phototagUI.identifiers.menuPageID);\n    const table = document.createElement('table');\n    phototagUI.addHeaders(table);\n    phototagUI.addRows(table, challenges);\n    menuPage.appendChild(table);\n  },\n\n  handleFetchErr(error) {\n    alert(error);\n  },\n\n  requestChallenges() {\n    phototagAPIInterface.getChallenges(phototagUI.addChallengeMenu, phototagUI.handleFetchErr);\n  },\n\n  createSideboard(challenge) {\n    const sideboard = phototagUI.createWrapperElement(phototagUI.identifiers.sideboardID);\n    // Challenge name\n    let p = document.createElement('p');\n    p.textContent = challenge.name;\n    sideboard.appendChild(p);\n    // Challenge description\n    p = document.createElement('p');\n    p.textContent = challenge.desc;\n    sideboard.appendChild(p);\n    // Timer\n    p = document.createElement('p');\n    p.id = phototagUI.identifiers.timerID;\n    p.textContent = '00:00:00';\n    sideboard.appendChild(p);\n    p = document.createElement('p');\n    // Item list\n    p.textContent = 'To be found:';\n    sideboard.appendChild(p);\n    const itemList = document.createElement('ul');\n    itemList.id = phototagUI.identifiers.itemListID;\n    sideboard.appendChild(itemList);\n\n    return sideboard;\n  },\n\n  createMainboard() {\n    // mainboard\n    const mainboard = phototagUI.createWrapperElement(phototagUI.identifiers.mainBoardID);\n    const picboard = phototagUI.createWrapperElement(phototagUI.identifiers.picboardID);\n    picboard.appendChild(phototagUI.createFetchingNotice('challenge photo'));\n    const img = document.createElement('img');\n    img.id = phototagUI.identifiers.photoID;\n    img.addEventListener('click', phototagUI.listeners.handlePicClick);\n    picboard.appendChild(img);\n    mainboard.appendChild(picboard);\n    mainboard.appendChild(phototagUI.createWrapperElement(phototagUI.identifiers.noticeID));\n\n    return mainboard;\n  },\n\n  buildChallengePage() {\n    phototagUI.removeElement(phototagUI.identifiers.menuPageID);\n    const challenge = JSON.parse(phototagUI.interfaces.challengeController.getChallengeData());\n    const rootElement = phototagUI.getRootElement();\n    const challengePage = phototagUI.createWrapperElement(phototagUI.identifiers.challengePageID);\n    const displayBoard = phototagUI.createWrapperElement(phototagUI.identifiers.displayBoardID);\n    displayBoard.appendChild(phototagUI.createSideboard(challenge));\n    displayBoard.appendChild(phototagUI.createMainboard());\n    challengePage.appendChild(displayBoard);\n    rootElement.appendChild(challengePage);\n  },\n\n  buildMenuPage() {\n    const rootElement = phototagUI.getRootElement();\n    rootElement.appendChild(phototagUI.createTitleBanner());\n    const menuPage = phototagUI.createWrapperElement(phototagUI.identifiers.menuPageID);\n    rootElement.appendChild(menuPage);\n    menuPage.appendChild(phototagUI.createFetchingNotice('challenges'));\n    phototagUI.requestChallenges();\n  },\n};\n\nmodule.exports = phototagUI;\n\n\n//# sourceURL=webpack:///./src/phototagUI.js?");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

eval("const phototag = {\n  nameable: state => ({\n    getName: () => state.name,\n  }),\n\n  clickableItem: (state, helpers) => ({\n    click: (coords) => {\n      if (!state.clicked) {\n        state.clicked = helpers.coords_within_rect(coords, state, helpers);\n      }\n    },\n    clicked: () => state.clicked,\n    getNameOfClicked(coords) {\n      if (helpers.coords_within_rect(coords, state, helpers)) {\n        return state.name;\n      } else {\n        return(\"\");\n      }\n    }\n  }),\n\n  itemHelpers: {\n    coords_within_rect(coords, state, helpers) {\n      const {x, y} = coords;\n\n      const leftX = helpers.getXY(state.top_left_loc).x;\n      const rightX = helpers.getXY(state.bottom_right_loc).x;\n      const bottomY = helpers.getXY(state.bottom_right_loc).y;\n      const topY = helpers.getXY(state.top_left_loc).y;\n\n      return x > leftX && x < rightX && y > topY && y < bottomY;\n\n    },\n\n    getXY(loc) {\n      const locArr = loc.split(\",\");\n\n      const x = parseInt(locArr[0], 10);\n      const y = parseInt(locArr[1], 10);\n\n\n      return {\"x\": x, \"y\": y}\n    },\n  },\n\n  createItem(item) {\n    const state = {\n      name: item.name,\n      top_left_loc: item.top_left_loc,\n      bottom_right_loc: item.bottom_right_loc,\n      clicked: false\n    };\n\n    return Object.assign({}, phototag.nameable(state), phototag.clickableItem(state, phototag.itemHelpers));\n  },\n\n  itemable: state => ({\n    addItem: (item) => { state.items.push(item);},\n    getItem: (index) => { return Object.assign({},state.items[index]); },\n    getItemList: () => {return state.items.map(item => item.getName()); },\n  }), \n\n  clickableBoard: (state, helpers) => ({\n    click: (coords) => {\n      let itemClicked = null;\n\n      for (let i = 0; i < state.items.length; i += 1) {\n        state.items[i].click(coords)\n        if (state.items[i].clicked()) {\n          itemClicked = state.items[i].getName();\n          helpers.updateItemsClicked(itemClicked, state);\n        }\n      }\n      helpers.updateAllItemsClicked(state);\n\n      return itemClicked;\n    },\n    getItemsClicked: () => state.itemsClicked.toString(),\n    allItemsClicked: () => state.allItemsClicked,\n    getNameOfClicked: (coords) => {\n      let name = '';\n      for (let i = 0; i < state.items.length; i += 1) {\n        name = state.items[i].getNameOfClicked(coords);\n        if (name.length > 0) {\n          break;\n        }\n      }\n      return name;\n    },\n  }),\n\n  boardHelpers: {\n    updateItemsClicked: (itemName, state) => {\n      if (state.itemsClicked.indexOf(itemName) === -1) {\n        state.itemsClicked.push(itemName);\n      }\n    },\n    updateAllItemsClicked: (state) => {\n      const clicked = [];\n\n      for (let i = 0; i < state.items.length; i += 1) {\n        clicked[i] = state.items[i].clicked();\n      }\n\n      state.allItemsClicked = !clicked.includes(false);\n    },\n  },\n      \n  createPictureBoard() {\n    const state = {\n      items: [],\n      itemsClicked: [],\n      allItemsClicked: false\n    }\n\n    return Object.assign({}, phototag.itemable(state), phototag.clickableBoard(state, phototag.boardHelpers));\n  },\n\n  phaseable: (state, helpers)  => ({\n    getStatus: () => state.gameStatus,\n    getState: () => state.phase,\n    start: () => {\n      if (state.phase === 'ready') {\n        state.phase = 'playing';\n        if (state.directedArray !== null) {\n          state.gameStatus = \"Find \" + `${state.directedArray[0]}`;\n        } else {\n          state.gameStatus = 'Click on objects and/or people';\n        }\n        state.timeStart = performance.now();\n      } else {\n        throw('Start called before controller is ready');\n      }\n    },\n    addPicboard: (picboard) => {\n      state.picBoard = picboard;\n      state.phase = 'ready';\n      state.gameStatus = 'ready';\n\n      const meta_data = JSON.parse(JSON.parse(state.challenge).meta_data);\n      if (meta_data.directed) {\n        helpers.createDirectedArray(state)\n      }\n    },\n    getChallengeData: () => state.challenge,\n  }),\n\n  playable: state => ({\n    clickPicture: (coords) => {\n      if (state.phase !== 'playing') {\n        throw('Clicked was called when game was not being played');\n      }\n\n      // Only mark item clicked if it is what is being asked for\n      if (state.directedArray !== null) {\n        if (state.picBoard.getNameOfClicked(coords) === state.directedArray[0]) {\n          state.picBoard.click(coords);\n          state.directedArray.splice(0,1);\n          state.gameStatus = 'Find ' + `${state.directedArray[0]}`;\n        }\n      } else {\n        state.picBoard.click(coords);\n      }\n\n      if (state.picBoard.allItemsClicked()) {\n        state.elapsedTime = performance.now() - state.timeStart;\n        state.phase = 'over';\n        state.gameStatus = `You finished in ${(state.elapsedTime/1000).toFixed(1)} seconds`\n\n        if (state.challengeTime !== null) {\n          state.timedSuccess = true;\n          clearTimeout(state.timerID);\n        }\n      }\n    },\n    getElapsedTime: () => state.elapsedTime,\n    getTextCurrElapsedTime: () => {\n      let textTime = '';\n      let timeDiff = performance.now() - state.timeStart;\n      // Fake a countdown timer\n      if (state.timerID !== null) {\n        timeDiff = state.challengeTime - timeDiff;\n      }\n      const minutes = Math.floor(timeDiff / 60000);\n      textTime += minutes.toString().padStart(2, '0');\n      const seconds = (timeDiff % 60000) / 1000;\n      textTime += ':';\n      textTime += Math.floor(seconds).toString().padStart(2, '0');\n      const hundreths = Math.round(seconds % 1 * 100);\n      textTime += ':';\n      textTime += hundreths.toString().padStart(2, '0');\n      return textTime;\n    },\n    \n  }),\n\n  timed: (state) => (\n    state.timerID = setTimeout(function() { \n      state.phase = 'over';\n      state.timedSuccess = false;\n      state.elapsedTime = state.challengeTime;\n      state.gameStatus = 'You failed to complete the challenge on time';\n    },\n    state.challengeTime)\n  ),\n\n  challengeHelpers: {\n    createDirectedArray(state) {\n      // Grabbed from StackOverflow, Schwartzian transform\n      state.directedArray = state.picBoard.getItemList()\n        .map((a) => ({sort: Math.random(), value: a}))\n        .sort((a, b) => a.sort - b.sort)\n        .map((a) => a.value);\n    },\n  },\n\n  createChallengeController(picBoard, challenge) {\n    let controller = null;\n    const meta_data = JSON.parse(JSON.parse(challenge).meta_data);\n    const timedChallenge = meta_data.ctype === 'timed';\n\n    const state = {\n      challenge: challenge,\n      picBoard: picBoard,\n      phase: null,\n      gameStatus: null,\n      timeStart: null,\n      elapsedTime: 0,\n      challengeTime: null,\n      timerID: null,\n      timedSuccess: false,\n      directedArray: null\n    }\n\n    state.phase = (picBoard === null ? 'created' : 'ready');\n    state.gameStatus = (picBoard === null ? 'Created' : 'ready');\n\n    if (picBoard !== null && meta_data.directed) {\n      phototag.challengeHelpers.createDirectedArray(state)\n    }\n\n    if (timedChallenge) {\n      state.challengeTime = meta_data.ctime;\n      controller = Object.assign({}, phototag.phaseable(state, phototag.challengeHelpers), phototag.playable(state), phototag.timed(state));\n    } else {\n      controller = Object.assign({}, phototag.phaseable(state, phototag.challengeHelpers), phototag.playable(state));\n    }\n\n    return controller;\n\n  },\n\n};\n\nmodule.exports = phototag;\n\n\n\n//# sourceURL=webpack:///./src/phototag.js?");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

eval("\nconst phototagAPIUtils = {\n  apiPaths: {\n    photoPath: '/api/v1/photos',\n    leaderBoardPath: '/api/v1/leaderboards',\n    challengePath: '/api/v1/challenges'\n  },\n\n  getHostUrl() {\n    return('http://localhost:3000');\n  },\n\n  buildApiUrl(path, paramHash) {\n    let uri = `${phototagAPIUtils.getHostUrl()}${path}?APITOKEN=9931c7c14267f95303df6518c28d8fd6`;\n\n    for (let key in paramHash) {\n      uri += `&${key}=${paramHash[key]}`;\n    }\n\n    return uri;\n  },\n\n  async doAPIGet(path, paramHash) {\n    let response;\n\n    try {\n      response = await fetch(phototagAPIUtils.buildApiUrl(path, paramHash));\n    } catch(err) {\n      return Promise.reject(err);\n    }\n\n    if (response.ok) {\n      return Promise.resolve(response.json());\n    } else {\n      return Promise.reject(response.json());\n    }\n  },\n\n  makeAPIGetRequest(path, paramsHash, handleResp, handleErr) {\n    // TODO: figure out how to use async here\n    const timeoutPromise = new Promise((resolve, reject) => {\n      const id = setTimeout(() => {\n        clearTimeout(id);\n        reject('Photo server took too long to respond.');\n      }, 20000);\n    });\n\n    const apiRequest = Promise.race([phototagAPIUtils.doAPIGet(path, paramsHash), timeoutPromise]);\n\n    apiRequest.then(\n      response => {\n        handleResp(response);\n      },\n      error => {\n        handleErr(error);\n      }\n    );\n  },\n\n  buildPayload(body) {\n    const jsonBody = JSON.stringify(body);\n    return { \"method\" : \"POST\", \"headers\": { \"Content-Type\": \"application/json; charset=utf-8\" }, \"body\": jsonBody};\n  },\n\n  async doAPIPost(path, paramHash, body) {\n    let response;\n\n    const payload = phototagAPIUtils.buildPayload(body);\n\n    try {\n      response = await fetch(phototagAPIUtils.buildApiUrl(path, paramHash), payload);\n    } catch(err) {\n      return Promise.reject(err);\n    }\n\n    if (response.ok) {\n      return Promise.resolve(response);\n    } else {\n      return Promise.reject(response.json());\n    }\n  },\n\n  makeAPIPostRequest(path, paramsHash, body, handleResp, handleErr) {\n    // TODO: figure out how to use async here\n    const timeoutPromise = new Promise((resolve, reject) => {\n      const id = setTimeout(() => {\n        clearTimeout(id);\n        reject('Photo server took too long to respond.');\n      }, 20000);\n    });\n\n    const apiRequest = Promise.race([phototagAPIUtils.doAPIPost(path, paramsHash, body), timeoutPromise]);\n\n    apiRequest.then(\n      response => {\n        handleResp(response);\n      },\n      error => {\n        handleErr(error);\n      }\n    );\n  },\n};\n\nmodule.exports = phototagAPIUtils;\n\n\n//# sourceURL=webpack:///./src/phototagAPIUtils.js?");

/***/ })
/******/ ]);