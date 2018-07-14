const phototag = require('./phototag');
const phototagAPI = require('./phototagAPIUtils');

const phototagAPIInterface = {
  getChallenges(displayCallback, errorCallback) {
  phototagAPI.makeAPIGetRequest(phototagAPI.apiPaths.challengePath, {}, displayCallback, errorCallback);
  },

  getPhotoInfo(image, displayCallback, errorCallback) {
    phototagAPI.makeAPIGetRequest(phototagAPI.apiPaths.photoPath, {image_filename: `${image}`}, displayCallback, errorCallback);
  },

  updateLeaderboard(appid, initials, time, displayCallback, errorCallback) {
    const paramsHash = {appid: `${appid}`};
    const payload = { player: { name: `${initials}`, challenge_time: `${time}` }};
    console.log(paramsHash);
    console.log(payload);
    phototagAPI.makeAPIPostRequest(phototagAPI.apiPaths.leaderBoardPath, paramsHash, payload, displayCallback, errorCallback)
  },
};

const phototagUI = {
  interfaces: {
    picBoard: null,
    challengeController: null
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
    popupID: 'popup',
    timeFormID: 'time-form',
    sideboardID: 'side-board',
    submitTimeID: 'submit-time',
    timerID: 'timer'
  },

  appName() {
    return "Identicize";
  },

  getRootElement() {
    return document.getElementById('root');
  },

  getXYTopLeftPic() {
    return {"top_left_x": 250, "top_left_y": 32}
  },

  getTimeInSeconds(elapsedTime) {
    return parseFloat((elapsedTime / 1000 / 10).toFixed(1));
  },

  createWrapperElement(id) {
    const div = document.createElement('div');
    div.id = id;
    return div;
  },

  createTitleBanner() {
    const title = phototagUI.createWrapperElement(phototagUI.identifiers.appTitleID);
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
    const container = phototagUI.createWrapperElement(phototagUI.identifiers.popupWrapperID);
    container.classList.add('block');
    return container;
  },

  createPopup() {
    const popup = phototagUI.createWrapperElement(phototagUI.identifiers.popupID);
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

    for (let i = 0; i < photo[0]["items"].length; i += 1) {
      picboard.addItem(phototag.createItem(photo[0]["items"][i]));
    }

    return picboard;
  },

  initInterfaces(photo) {
    phototagUI.interfaces.picBoard = phototagUI.createPicboard(photo);
    phototagUI.interfaces.challengeController.addPicboard(phototagUI.interfaces.picBoard);
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
    if (phototagUI.interfaces.challengeController.getState() !== 'over') {
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
    const itemsClicked = phototagUI.interfaces.picBoard.getItemsClicked().split(',');

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
    phototagUI.updatePicboard(photo[0]["image_filename"]);
    requestAnimationFrame(phototagUI.updateTimer);
    phototagUI.interfaces.challengeController.start();
    phototagUI.updateNotice();
    phototagUI.updateItemList();
  },

  buildSubmitTimeForm() {
    const displayContainer = phototagUI.createPopupWrapper();
    const popupContainer = phototagUI.createPopup();

    const form = document.createElement('form');
    form.id = phototagUI.identifiers.submitTimeID;
    form.setAttribute('action', "#");

    const label = document.createElement('label');
    label.setAttribute('for', 'initials');
    label.textContent = 'Initials:';

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'initials');
    input.setAttribute('required', 'required');
    input.setAttribute('maxlength', '3');

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(phototagUI.createSubmitTimeButton());
    form.appendChild(phototagUI.createCloseModal());

    popupContainer.appendChild(form);
    displayContainer.appendChild(popupContainer);
    phototagUI.getRootElement().appendChild(displayContainer);
  },

  closeModal() {
    const rootElement = phototagUI.getRootElement();
    const wrapper = document.getElementById(phototagUI.identifiers.popupWrapperID);

    rootElement.removeChild(wrapper);
  },

  handleUpdateSuccess() {
    phototagUI.updateNotice('Your score was successfully submitted');
  },

  handleUpdateError() {
    phototagUI.updateNotice('There was an error submitting your score');
  },

  listeners: {
    loadChallenge(e) {
      const td = e.target.parentNode;
      const image = td.childNodes[3].textContent;
      const challengeData = td.childNodes[4].textContent;
      phototagUI.interfaces.challengeController = phototag.createChallengeController(null, challengeData);
      phototagUI.buildChallengePage();
      phototagAPIInterface.getPhotoInfo(image, phototagUI.handlePhotoResponse, phototagUI.handleErr);
    },

    handlePicClick(e) {
      const {top_left_x, top_left_y} = phototagUI.getXYTopLeftPic();
      // Adjust for offset from left and top
      const x = e.clientX - top_left_x;
      const y = e.clientY - top_left_y;

      phototagUI.interfaces.challengeController.clickPicture({x: `${x}`, y: `${y}`});

      phototagUI.updateNotice();
      phototagUI.updateItemList();

      if (phototagUI.interfaces.challengeController.getState() === 'over') {
        phototagUI.buildSubmitTimeForm();
        e.target.removeEventListener('click', phototagUI.listeners.handlePicClick);
      }
    },
    
    handleSubmitTime(e) {
      e.preventDefault();
      const form = e.target.parentNode;
      const initials = form.querySelector('input[name="initials"]');
      const initialsVal = initials.value.toUpperCase();
      initials.textContent = initialsVal;
      const time = phototagUI.getTimeInSeconds(phototagUI.interfaces.challengeController.getElapsedTime());
      const appid = JSON.parse(phototagUI.interfaces.challengeController.getChallengeData()).appid;
      phototagAPIInterface.updateLeaderboard(appid, initialsVal, time, phototagUI.handleUpdateSucess, phototagUI.handleUpdateError);
      phototagUI.closeModal();
    },

    handleCloseModal(e) {
      phototagUI.closeModal();
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
      tr.appendChild(phototagUI.createDataCell('td',challenges[i]["name"]));
      tr.childNodes[0].addEventListener('click', phototagUI.listeners.loadChallenge);
      if (challenges[i]["leaderboards"].length > 0) {
        tr.appendChild(phototagUI.createDataCell('td',challenges[i]["leaderboards"][0].challenge_time));
        tr.appendChild(phototagUI.createDataCell('td',challenges[i]["leaderboards"][0].name));
      } else {
        tr.appendChild(phototagUI.createDataCell('td','---'));
        tr.appendChild(phototagUI.createDataCell('td','---'));
      }
      tr.appendChild(phototagUI.createDataCell('td',challenges[i].photo_name, true));
      delete challenges[i]["leaderboards"];
      tr.appendChild(phototagUI.createDataCell('td', JSON.stringify(challenges[i]), true));
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
    phototagAPIInterface.getChallenges(phototagUI.addChallengeMenu, phototagUI.handleFetchErr);
  },

  buildChallengePage() {
    phototagUI.removeElement(phototagUI.identifiers.menuPageID);
    const challenge = JSON.parse(phototagUI.interfaces.challengeController.getChallengeData());
    const rootElement = phototagUI.getRootElement();
    const challengePage = phototagUI.createWrapperElement(phototagUI.identifiers.challengePageID);
    const displayBoard = phototagUI.createWrapperElement(phototagUI.identifiers.displayBoardID);
    // sideboard
    const sideboard = phototagUI.createWrapperElement(phototagUI.identifiers.sideboardID);
    let p = document.createElement('p');
    p.textContent = challenge.name;
    sideboard.appendChild(p);
    p = document.createElement('p');
    p.textContent = challenge.desc;
    sideboard.appendChild(p);
    p = document.createElement('p');
    p.id = phototagUI.identifiers.timerID;
    p.textContent = '00:00:00';
    sideboard.appendChild(p);
    p = document.createElement('p');
    p.textContent = 'To be found:';
    sideboard.appendChild(p);
    const itemList = document.createElement('ul');
    itemList.id = phototagUI.identifiers.itemListID;
    sideboard.appendChild(itemList);
    displayBoard.appendChild(sideboard);
    // mainboard
    const mainboard = phototagUI.createWrapperElement(phototagUI.identifiers.mainBoardID);
    const picboard = phototagUI.createWrapperElement(phototagUI.identifiers.picboardID);
    picboard.appendChild(phototagUI.createFetchingNotice('challenge photo'));
    const img = document.createElement('img');
    img.id = phototagUI.identifiers.photoID;
    img.addEventListener('click', phototagUI.listeners.handlePicClick);
    picboard.appendChild(img);
    mainboard.appendChild(picboard);
    mainboard.appendChild(phototagUI.createWrapperElement(phototagUI.identifiers.noticeID));
    displayBoard.appendChild(mainboard);
    challengePage.appendChild(displayBoard);
    rootElement.appendChild(challengePage);
  },

  buildMenuPage() {
    const rootElement = phototagUI.getRootElement();
    rootElement.appendChild(phototagUI.createTitleBanner());
    const menuPage = phototagUI.createWrapperElement(phototagUI.identifiers.menuPageID);
    rootElement.appendChild(menuPage);
    menuPage.appendChild(phototagUI.createFetchingNotice('challenges'));
    phototagUI.requestChallenges();
  },
};

module.exports = phototagUI;
