const phototag = require('./phototag');
const phototagAPI = require('./phototagAPIUtils');

const phototagAPIInterface = {
  getChallenges(displayCallback, errorCallback) {
    phototagAPI.makeAPIGetRequest(phototagAPI.apiPaths.challengePath, {}, displayCallback, errorCallback);
  },
};

const phototagUI = {
  interfaces: {
    picBoard: null,
    challengeController: null
  },

  identifiers: {
    appTitleID: 'title',
    menuPageID: 'menu-page',
    fetchingID: 'fetching'
  },

  appName() {
    return "Identicize";
  },

  getRootElement() {
    return document.getElementById('root');
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

  createFetchingMessage(item) {
    const p = document.createElement('p');
    p.id = phototagUI.identifiers.fetchingID;
    p.textContent = `Fetching ${item} ......`;
    return p;
  },

  removeFetchingMessage() {
    const p = document.getElementById(phototagUI.identifiers.fetchingID);
    const parentElem = p.parentNode;
    parentElem.removeChild(p);
  },

  listeners: {
    loadChallenge(e) {
      console.log(e);
    },
  },

  createDataCell(tag, text, hidden = false) {
    const elem = document.createElement(tag);
    if (hidden) elem.classList.add('hidden');
    elem.textContent = text;
    return elem;
  },

  addHeaders(table) {
    const colHeaders = ['Challenge', 'Best Time', 'Initials', ''];
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    for (let i = 0; i < colHeaders.length; i += 1) {
      tr.appendChild(phototagUI.createDataCell('th', colHeaders[i]));
    }
    thead.appendChild(tr);
    table.appendChild(thead);
  },

  addRows(table, challenges) {
    console.log(challenges);
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
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
  },

  addChallengeMenu(challenges) {
    phototagUI.removeFetchingMessage();

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

  buildMenuPage() {
    const rootElement = phototagUI.getRootElement();
    const menuPage = phototagUI.createWrapperElement(phototagUI.identifiers.menuPageID);
    menuPage.appendChild(phototagUI.createTitleBanner());
    rootElement.appendChild(menuPage);
    menuPage.appendChild(phototagUI.createFetchingMessage('challenges'));
    phototagUI.requestChallenges();
  },
};

module.exports = phototagUI;
