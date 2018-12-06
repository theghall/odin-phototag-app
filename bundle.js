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
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0__);
// eslint-disable-next-line import/no-extraneous-dependencies
__webpack_require__(1);

// normalize.css must be loaded first before app css, so disable eslint check
/* eslint-disable import/first */

/* eslint-enable import/first */

const phototagUI = __webpack_require__(3);

phototagUI.initPhototag();



/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const phototag = __webpack_require__(4);
const phototagAPI = __webpack_require__(5);

const phototagAPIInterface = {
  getChallenges(displayCallback, errorCallback) {
    phototagAPI.makeAPIGetRequest(
      phototagAPI.apiPaths.challengePath,
      {},
      displayCallback,
      errorCallback
    );
  },

  getPhotoInfo(image, displayCallback, errorCallback) {
    phototagAPI.makeAPIGetRequest(
      phototagAPI.apiPaths.photoPath,
      { image_filename: `${image}` },
      displayCallback,
      errorCallback
    );
  },

  updateLeaderboard(appid, initials, time, displayCallback, errorCallback) {
    const paramsHash = { appid: `${appid}` };
    const payload = {
      leaderboard: { name: `${initials}`, challenge_time: `${time}` },
    };
    phototagAPI.makeAPIPostRequest(
      phototagAPI.apiPaths.leaderBoardPath,
      paramsHash,
      payload,
      displayCallback,
      errorCallback
    );
  },

  getLeaders(appid, displayCallback, errorCallback) {
    const paramsHash = { appid: `${appid}` };
    phototagAPI.makeAPIGetRequest(
      phototagAPI.apiPaths.leaderBoardPath,
      paramsHash,
      displayCallback,
      errorCallback
    );
  },
};

const phototagUI = {
  interfaces: {
    picBoard: null,
    challengeController: null,
  },

  resetInterfaces() {
    phototagUI.interfaces.picBoard = null;
    phototagUI.interfaces.challengeController = null;
  },

  identifiers: {
    appTitleID: 'title',
    challengePageID: 'challenge-page',
    closeModalID: 'close-modal',
    displayBoardID: 'display-board',
    fetchingID: 'fetching',
    itemListID: 'item-list',
    mainBoardID: 'main-board',
    menuPageID: 'menu-page',
    noticeID: 'status',
    photoID: 'challenge-photo',
    picboardID: 'pic-board',
    popupWrapperID: 'popup-wrapper',
    sideboardID: 'side-board',
    submitPopupID: 'submit-popup',
    submitTimeID: 'submit-time',
    timerID: 'timer',
    timeFormID: 'time-form',
    topTenID: 'topten',
    toptenPopupID: 'topten-popup',
  },

  appName() {
    return 'Identicize';
  },

  getRootElement() {
    return document.getElementById('root');
  },

  getXYTopLeftPic() {
    return { top_left_x: 250, top_left_y: 32 };
  },

  getTextTime(elapsedTimeSecs) {
    let textTime = '';
    const minutes = Math.floor(elapsedTimeSecs / 60);
    if (minutes > 0) {
      textTime += `${minutes}m `;
    }
    const seconds = elapsedTimeSecs % 60;
    textTime += `${seconds.toFixed(1)}s`;

    return textTime;
  },

  getTimeInSeconds(elapsedTime) {
    return parseFloat((elapsedTime / 1000).toFixed(1));
  },

  filterInitials(initials) {
    const stops = ['ASS', 'TIT', 'FUK'];
    let filtered = '';

    if (stops.includes(initials)) {
      filtered = initials.slice(0, 2);
    } else {
      filtered = initials;
    }

    return filtered;
  },

  createWrapperElement(id) {
    const div = document.createElement('div');
    div.id = id;
    return div;
  },

  createTitleBanner() {
    const title = phototagUI.createWrapperElement(
      phototagUI.identifiers.appTitleID
    );
    title.textContent = phototagUI.appName();
    return title;
  },

  createFetchingNotice(item) {
    const p = document.createElement('p');
    p.id = phototagUI.identifiers.fetchingID;
    p.textContent = `Fetching ${item} .....`;
    return p;
  },

  createPopupWrapper() {
    const container = phototagUI.createWrapperElement(
      phototagUI.identifiers.popupWrapperID
    );
    container.classList.add('block');
    return container;
  },

  createPopup(id) {
    const popup = phototagUI.createWrapperElement(id);
    return popup;
  },

  createCloseModal() {
    const button = document.createElement('button');
    button.id = phototagUI.identifiers.closeModalID;
    button.classList.add('btn');
    button.textContent = 'Close';
    button.addEventListener('click', phototagUI.listeners.handleCloseModal);

    return button;
  },

  createSubmitTimeButton() {
    const button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.classList.add('btn');
    button.textContent = 'Submit Time';
    button.addEventListener('click', phototagUI.listeners.handleSubmitTime);

    return button;
  },

  removeElement(id) {
    const elem = document.getElementById(id);
    const parentElem = elem.parentNode;
    parentElem.removeChild(elem);
  },

  createPicboard(photo) {
    const picboard = phototag.createPictureBoard();

    for (let i = 0; i < photo[0]['items'].length; i += 1) {
      picboard.addItem(phototag.createItem(photo[0]['items'][i]));
    }

    return picboard;
  },

  initInterfaces(photo) {
    phototagUI.interfaces.picBoard = phototagUI.createPicboard(photo);
    phototagUI.interfaces.challengeController.addPicboard(
      phototagUI.interfaces.picBoard
    );
  },

  linkPhoto(image_filename) {
    const img = document.getElementById(phototagUI.identifiers.photoID);
    img.setAttribute('src', `${phototagAPI.getHostUrl()}/${image_filename}`);
  },

  updatePicboard(image_filename) {
    phototagUI.removeElement(phototagUI.identifiers.fetchingID);
    phototagUI.linkPhoto(image_filename);
  },

  updateTimer() {
    const timer = document.getElementById(phototagUI.identifiers.timerID);
    timer.textContent = phototagUI.interfaces.challengeController.getTextCurrElapsedTime();
    if (!phototagUI.interfaces.challengeController.gameOver()) {
      requestAnimationFrame(phototagUI.updateTimer);
    } else {
      phototagUI.updateNotice();
    }
  },

  updateNotice(content = null) {
    const notice = document.getElementById(phototagUI.identifiers.noticeID);
    if (content === null) {
      notice.textContent = phototagUI.interfaces.challengeController.getStatus();
    } else {
      notice.textContent = content;
    }
  },

  updateItemList() {
    const itemsClicked = phototagUI.interfaces.picBoard
      .getItemsClicked()
      .split(',');

    const ul = document.getElementById(phototagUI.identifiers.itemListID);

    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }

    const items = phototagUI.interfaces.picBoard.getItemList();

    for (let i = 0; i < items.length; i += 1) {
      const li = document.createElement('li');
      li.textContent = items[i];
      if (itemsClicked.includes(items[i])) {
        li.classList.add('strike');
      }
      ul.appendChild(li);
    }
  },

  handlePhotoResponse(photo) {
    phototagUI.initInterfaces(photo);
    phototagUI.updatePicboard(photo[0]['image_filename']);
    requestAnimationFrame(phototagUI.updateTimer);
    phototagUI.interfaces.challengeController.start();
    phototagUI.updateNotice();
    phototagUI.updateItemList();
  },

  buildSubmitTimeForm() {
    const displayContainer = phototagUI.createPopupWrapper();
    const popupContainer = phototagUI.createPopup(
      phototagUI.identifiers.submitPopupID
    );

    const form = document.createElement('form');
    form.id = phototagUI.identifiers.submitTimeID;
    form.setAttribute('action', '#');

    const label = document.createElement('label');
    label.setAttribute('for', 'initials');
    label.textContent = 'Initials:';

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'initials');
    input.setAttribute('required', 'required');
    input.setAttribute('autofocus', 'autofocus');
    input.setAttribute('maxlength', '3');

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(phototagUI.createSubmitTimeButton());
    form.appendChild(phototagUI.createCloseModal());

    popupContainer.appendChild(form);
    displayContainer.appendChild(popupContainer);
    phototagUI.getRootElement().appendChild(displayContainer);
  },

  buildLeaderPopup(leaders) {
    phototagUI.updateNotice('');
    const displayContainer = phototagUI.createPopupWrapper();
    const popupContainer = phototagUI.createPopup(
      phototagUI.identifiers.toptenPopupID
    );
    const topten = phototagUI.createWrapperElement(
      phototagUI.identifiers.topTenID
    );

    const p = document.createElement('p');
    p.textContent = 'Top Ten for this challenge';

    const ol = document.createElement('ol');

    // Display top 10
    for (let i = 0; i < 10; i += 1) {
      const li = document.createElement('li');
      // Lets us create empty slots
      if (i < leaders.length) {
        const textTime = phototagUI.getTextTime(
          parseFloat(leaders[i]['challenge_time'])
        );
        li.textContent = leaders[i]['name'] + ' ' + textTime;
      }
      ol.appendChild(li);
    }

    topten.appendChild(p);
    topten.appendChild(ol);
    topten.appendChild(phototagUI.createCloseModal());

    popupContainer.appendChild(topten);
    displayContainer.appendChild(popupContainer);
    phototagUI.getRootElement().appendChild(displayContainer);
  },

  closeModal() {
    const rootElement = phototagUI.getRootElement();
    const wrapper = document.getElementById(
      phototagUI.identifiers.popupWrapperID
    );

    rootElement.removeChild(wrapper);
  },

  handleUpdateSuccess() {
    phototagUI.updateNotice('Your score was successfully submitted');
    const appid = JSON.parse(
      phototagUI.interfaces.challengeController.getChallengeData()
    ).appid;
    phototagUI.updateNotice('Fetching top ten list...');
    phototagAPIInterface.getLeaders(
      appid,
      phototagUI.buildLeaderPopup,
      phototagUI.handleErr
    );
  },

  handleUpdateError() {
    phototagUI.updateNotice('There was an error submitting your score');
  },

  handleError() {
    phototagUI.updateNotice('There was an error with the server');
  },

  listeners: {
    loadChallenge(e) {
      const td = e.target.parentNode;
      const image = td.childNodes[3].textContent;
      const challengeData = td.childNodes[4].textContent;
      phototagUI.interfaces.challengeController = phototag.createChallengeController(
        null,
        challengeData
      );
      phototagUI.buildChallengePage();
      phototagAPIInterface.getPhotoInfo(
        image,
        phototagUI.handlePhotoResponse,
        phototagUI.handleErr
      );
    },

    handlePicClick(e) {
      const { top_left_x, top_left_y } = phototagUI.getXYTopLeftPic();
      // Adjust for offset from left and top
      const x = e.clientX - top_left_x;
      const y = e.clientY - top_left_y;

      phototagUI.interfaces.challengeController.clickPicture({
        x: `${x}`,
        y: `${y}`,
      });

      phototagUI.updateNotice();
      phototagUI.updateItemList();

      if (phototagUI.interfaces.challengeController.gameOver()) {
        phototagUI.buildSubmitTimeForm();
        e.target.removeEventListener(
          'click',
          phototagUI.listeners.handlePicClick
        );
      }
    },

    handleSubmitTime(e) {
      const form = e.target.parentNode;
      if (form.checkValidity()) {
        const initials = form.querySelector('input[name="initials"]');
        const initialsVal = phototagUI.filterInitials(
          initials.value.toUpperCase()
        );
        initials.textContent = initialsVal;
        const time = phototagUI.getTimeInSeconds(
          phototagUI.interfaces.challengeController.getElapsedTime()
        );
        const appid = JSON.parse(
          phototagUI.interfaces.challengeController.getChallengeData()
        ).appid;
        phototagAPIInterface.updateLeaderboard(
          appid,
          initialsVal,
          time,
          phototagUI.handleUpdateSuccess,
          phototagUI.handleUpdateError
        );
        phototagUI.closeModal();
      }
    },

    handleCloseModal(e) {
      phototagUI.closeModal();
    },

    handleGotoMenu(e) {
      phototagUI.resetInterfaces();
      phototagUI.removeElement(phototagUI.identifiers.challengePageID);
      phototagUI.buildMenuPage();
    },
  },

  createDataCell(tag, text, hidden = false) {
    const elem = document.createElement(tag);
    if (hidden) elem.classList.add('hidden');
    elem.textContent = text;
    return elem;
  },

  addHeaders(table) {
    const colHeaders = ['Challenge', 'Best Time', 'Initials', '', ''];
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    for (let i = 0; i < colHeaders.length; i += 1) {
      tr.appendChild(phototagUI.createDataCell('th', colHeaders[i]));
    }
    thead.appendChild(tr);
    table.appendChild(thead);
  },

  addRows(table, challenges) {
    const tbody = document.createElement('tbody');

    for (let i = 0; i < challenges.length; i += 1) {
      const tr = document.createElement('tr');
      tr.appendChild(phototagUI.createDataCell('td', challenges[i]['name']));
      tr.childNodes[0].addEventListener(
        'click',
        phototagUI.listeners.loadChallenge
      );
      if (challenges[i]['leaderboards'].length > 0) {
        const textTime = phototagUI.getTextTime(
          parseFloat(challenges[i]['leaderboards'][0].challenge_time)
        );
        tr.appendChild(phototagUI.createDataCell('td', textTime));
        tr.appendChild(
          phototagUI.createDataCell('td', challenges[i]['leaderboards'][0].name)
        );
      } else {
        tr.appendChild(phototagUI.createDataCell('td', '---'));
        tr.appendChild(phototagUI.createDataCell('td', '---'));
      }
      tr.appendChild(
        phototagUI.createDataCell('td', challenges[i].photo_name, true)
      );
      delete challenges[i]['leaderboards'];
      tr.appendChild(
        phototagUI.createDataCell('td', JSON.stringify(challenges[i]), true)
      );
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
  },

  addChallengeMenu(challenges) {
    phototagUI.removeElement(phototagUI.identifiers.fetchingID);

    const menuPage = document.getElementById(phototagUI.identifiers.menuPageID);
    const table = document.createElement('table');
    phototagUI.addHeaders(table);
    phototagUI.addRows(table, challenges);
    menuPage.appendChild(table);
  },

  handleFetchErr(error) {
    alert(error);
  },

  requestChallenges() {
    phototagAPIInterface.getChallenges(
      phototagUI.addChallengeMenu,
      phototagUI.handleFetchErr
    );
  },

  createSideboard(challenge) {
    const sideboard = phototagUI.createWrapperElement(
      phototagUI.identifiers.sideboardID
    );
    const infoWrapper = document.createElement('div');
    // Challenge name
    let p = document.createElement('p');
    p.textContent = challenge.name;
    infoWrapper.appendChild(p);
    // Challenge description
    p = document.createElement('p');
    p.textContent = challenge.desc;
    infoWrapper.appendChild(p);
    // Timer
    p = document.createElement('p');
    p.id = phototagUI.identifiers.timerID;
    p.textContent = '00:00:00';
    infoWrapper.appendChild(p);
    // Item list
    p = document.createElement('p');
    p.textContent = 'To be found:';
    infoWrapper.appendChild(p);
    const itemList = document.createElement('ul');
    itemList.id = phototagUI.identifiers.itemListID;
    infoWrapper.appendChild(itemList);
    // Button area
    const buttonWrapper = document.createElement('div');
    const button = document.createElement('button');
    button.classList.add('btn');
    button.textContent = 'Challenge Menu';
    button.addEventListener('click', phototagUI.listeners.handleGotoMenu);
    buttonWrapper.appendChild(button);

    sideboard.appendChild(infoWrapper);
    sideboard.appendChild(buttonWrapper);

    return sideboard;
  },

  createMainboard() {
    // mainboard
    const mainboard = phototagUI.createWrapperElement(
      phototagUI.identifiers.mainBoardID
    );
    const picboard = phototagUI.createWrapperElement(
      phototagUI.identifiers.picboardID
    );
    picboard.appendChild(phototagUI.createFetchingNotice('challenge photo'));
    const img = document.createElement('img');
    img.id = phototagUI.identifiers.photoID;
    img.addEventListener('click', phototagUI.listeners.handlePicClick);
    picboard.appendChild(img);
    mainboard.appendChild(picboard);
    mainboard.appendChild(
      phototagUI.createWrapperElement(phototagUI.identifiers.noticeID)
    );

    return mainboard;
  },

  buildChallengePage() {
    phototagUI.removeElement(phototagUI.identifiers.menuPageID);
    const challenge = JSON.parse(
      phototagUI.interfaces.challengeController.getChallengeData()
    );
    const rootElement = phototagUI.getRootElement();
    const challengePage = phototagUI.createWrapperElement(
      phototagUI.identifiers.challengePageID
    );
    const displayBoard = phototagUI.createWrapperElement(
      phototagUI.identifiers.displayBoardID
    );
    displayBoard.appendChild(phototagUI.createSideboard(challenge));
    displayBoard.appendChild(phototagUI.createMainboard());
    challengePage.appendChild(displayBoard);
    rootElement.appendChild(challengePage);
  },

  buildMenuPage() {
    const rootElement = phototagUI.getRootElement();
    const menuPage = phototagUI.createWrapperElement(
      phototagUI.identifiers.menuPageID
    );
    rootElement.appendChild(menuPage);
    menuPage.appendChild(phototagUI.createFetchingNotice('challenges'));
    phototagUI.requestChallenges();
  },

  initPhototag() {
    const rootElement = phototagUI.getRootElement();
    rootElement.appendChild(phototagUI.createTitleBanner());
    phototagUI.buildMenuPage();
  },
};

module.exports = phototagUI;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

const phototag = {
  nameable: state => ({
    getName: () => state.name,
  }),

  clickableItem: (state, helpers) => ({
    click: coords => {
      if (!state.clicked) {
        state.clicked = helpers.coords_within_rect(coords, state, helpers);
      }
    },
    clicked: () => state.clicked,
    getNameOfClicked(coords) {
      if (helpers.coords_within_rect(coords, state, helpers)) {
        return state.name;
      } else {
        return '';
      }
    },
  }),

  itemHelpers: {
    coords_within_rect(coords, state, helpers) {
      const { x, y } = coords;

      const leftX = helpers.getXY(state.top_left_loc).x;
      const rightX = helpers.getXY(state.bottom_right_loc).x;
      const bottomY = helpers.getXY(state.bottom_right_loc).y;
      const topY = helpers.getXY(state.top_left_loc).y;

      return x > leftX && x < rightX && y > topY && y < bottomY;
    },

    getXY(loc) {
      const locArr = loc.split(',');

      const x = parseInt(locArr[0], 10);
      const y = parseInt(locArr[1], 10);

      return { x: x, y: y };
    },
  },

  createItem(item) {
    const state = {
      name: item.name,
      top_left_loc: item.top_left_loc,
      bottom_right_loc: item.bottom_right_loc,
      clicked: false,
    };

    return Object.assign(
      {},
      phototag.nameable(state),
      phototag.clickableItem(state, phototag.itemHelpers)
    );
  },

  itemable: state => ({
    addItem: item => {
      state.items.push(item);
    },
    getItem: index => {
      return Object.assign({}, state.items[index]);
    },
    getItemList: () => {
      return state.items.map(item => item.getName());
    },
  }),

  clickableBoard: (state, helpers) => ({
    click: coords => {
      let itemClicked = null;

      for (let i = 0; i < state.items.length; i += 1) {
        state.items[i].click(coords);
        if (state.items[i].clicked()) {
          itemClicked = state.items[i].getName();
          helpers.updateItemsClicked(itemClicked, state);
        }
      }
      helpers.updateAllItemsClicked(state);

      return itemClicked;
    },
    getItemsClicked: () => state.itemsClicked.toString(),
    allItemsClicked: () => state.allItemsClicked,
    getNameOfClicked: coords => {
      let name = '';
      for (let i = 0; i < state.items.length; i += 1) {
        name = state.items[i].getNameOfClicked(coords);
        if (name.length > 0) {
          break;
        }
      }
      return name;
    },
  }),

  boardHelpers: {
    updateItemsClicked: (itemName, state) => {
      if (state.itemsClicked.indexOf(itemName) === -1) {
        state.itemsClicked.push(itemName);
      }
    },
    updateAllItemsClicked: state => {
      const clicked = [];

      for (let i = 0; i < state.items.length; i += 1) {
        clicked[i] = state.items[i].clicked();
      }

      state.allItemsClicked = !clicked.includes(false);
    },
  },

  createPictureBoard() {
    const state = {
      items: [],
      itemsClicked: [],
      allItemsClicked: false,
    };

    return Object.assign(
      {},
      phototag.itemable(state),
      phototag.clickableBoard(state, phototag.boardHelpers)
    );
  },

  phaseable: (state, helpers) => ({
    getStatus: () => state.gameStatus,
    getState: () => state.phase,
    gameOver: () => state.phase === 'over',
    start: () => {
      if (state.phase === 'ready') {
        state.phase = 'playing';
        if (state.directedArray !== null) {
          state.gameStatus = 'Find ' + `${state.directedArray[0]}`;
        } else {
          state.gameStatus = 'Click on objects and/or people';
        }
        state.timeStart = performance.now();
      } else {
        throw 'Start called before controller is ready';
      }
    },
    addPicboard: picboard => {
      state.picBoard = picboard;
      state.phase = 'ready';
      state.gameStatus = 'ready';

      const meta_data = JSON.parse(JSON.parse(state.challenge).meta_data);
      if (meta_data.directed) {
        helpers.createDirectedArray(state);
      }
    },
    getChallengeData: () => state.challenge,
  }),

  playable: state => ({
    clickPicture: coords => {
      if (state.phase !== 'playing') {
        throw 'Clicked was called when game was not being played';
      }

      // Only mark item clicked if it is what is being asked for
      if (state.directedArray !== null) {
        if (
          state.picBoard.getNameOfClicked(coords) === state.directedArray[0]
        ) {
          state.picBoard.click(coords);
          state.directedArray.splice(0, 1);
          state.gameStatus = 'Find ' + `${state.directedArray[0]}`;
        }
      } else {
        state.picBoard.click(coords);
      }

      if (state.picBoard.allItemsClicked()) {
        state.elapsedTime = performance.now() - state.timeStart;
        state.phase = 'over';
        state.gameStatus = `You finished in ${(
          state.elapsedTime / 1000
        ).toFixed(1)} seconds`;

        if (state.challengeTime !== null) {
          state.timedSuccess = true;
          clearTimeout(state.timerID);
        }
      }
    },
    getElapsedTime: () => state.elapsedTime,
    getTextCurrElapsedTime: () => {
      let textTime = '';
      let timeDiff = performance.now() - state.timeStart;
      // Fake a countdown timer
      if (state.timerID !== null) {
        timeDiff = state.challengeTime - timeDiff;
      }
      const minutes = Math.floor(timeDiff / 60000);
      textTime += minutes.toString().padStart(2, '0');
      const seconds = (timeDiff % 60000) / 1000;
      textTime += ':';
      textTime += Math.floor(seconds)
        .toString()
        .padStart(2, '0');
      let hundreths = Math.round((seconds % 1) * 100);
      textTime += ':';
      if (state.phase === 'over' && !state.timedSuccess) {
        hundreths = 0;
      }
      textTime += hundreths.toString().padStart(2, '0');
      return textTime;
    },
  }),

  timed: state =>
    (state.timerID = setTimeout(function() {
      state.phase = 'over';
      state.timedSuccess = false;
      state.elapsedTime = state.challengeTime;
      state.gameStatus = 'You failed to complete the challenge on time';
    }, state.challengeTime)),

  challengeHelpers: {
    createDirectedArray(state) {
      // Grabbed from StackOverflow, Schwartzian transform
      state.directedArray = state.picBoard
        .getItemList()
        .map(a => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value);
    },
  },

  createChallengeController(picBoard, challenge) {
    let controller = null;
    const meta_data = JSON.parse(JSON.parse(challenge).meta_data);
    const timedChallenge = meta_data.ctype === 'timed';

    const state = {
      challenge: challenge,
      picBoard: picBoard,
      phase: null,
      gameStatus: null,
      timeStart: null,
      elapsedTime: 0,
      challengeTime: null,
      timerID: null,
      timedSuccess: false,
      directedArray: null,
    };

    state.phase = picBoard === null ? 'created' : 'ready';
    state.gameStatus = picBoard === null ? 'Created' : 'ready';

    if (picBoard !== null && meta_data.directed) {
      phototag.challengeHelpers.createDirectedArray(state);
    }

    if (timedChallenge) {
      state.challengeTime = meta_data.ctime;
      controller = Object.assign(
        {},
        phototag.phaseable(state, phototag.challengeHelpers),
        phototag.playable(state),
        phototag.timed(state)
      );
    } else {
      controller = Object.assign(
        {},
        phototag.phaseable(state, phototag.challengeHelpers),
        phototag.playable(state)
      );
    }

    return controller;
  },
};

module.exports = phototag;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const phototagAPIUtils = {
  apiPaths: {
    photoPath: '/api/v1/photos',
    leaderBoardPath: '/api/v1/leaderboards',
    challengePath: '/api/v1/challenges',
  },

  getHostUrl() {
    return 'https://tagphoto.herokuapp.com';
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
    } catch (err) {
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

    const apiRequest = Promise.race([
      phototagAPIUtils.doAPIGet(path, paramsHash),
      timeoutPromise,
    ]);

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
    return {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: jsonBody,
    };
  },

  async doAPIPost(path, paramHash, body) {
    let response;

    const payload = phototagAPIUtils.buildPayload(body);

    try {
      response = await fetch(
        phototagAPIUtils.buildApiUrl(path, paramHash),
        payload
      );
    } catch (err) {
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

    const apiRequest = Promise.race([
      phototagAPIUtils.doAPIPost(path, paramsHash, body),
      timeoutPromise,
    ]);

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map