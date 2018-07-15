const phototag = {
  nameable: state => ({
    getName: () => state.name,
  }),

  clickableItem: (state, helpers) => ({
    click: (coords) => {
      if (!state.clicked) {
        state.clicked = helpers.coords_within_rect(coords, state, helpers);
      }
    },
    clicked: () => state.clicked,
    getNameOfClicked(coords) {
      if (helpers.coords_within_rect(coords, state, helpers)) {
        return state.name;
      } else {
        return("");
      }
    }
  }),

  itemHelpers: {
    coords_within_rect(coords, state, helpers) {
      const {x, y} = coords;

      const leftX = helpers.getXY(state.top_left_loc).x;
      const rightX = helpers.getXY(state.bottom_right_loc).x;
      const bottomY = helpers.getXY(state.bottom_right_loc).y;
      const topY = helpers.getXY(state.top_left_loc).y;

      return x > leftX && x < rightX && y > topY && y < bottomY;

    },

    getXY(loc) {
      const locArr = loc.split(",");

      const x = parseInt(locArr[0], 10);
      const y = parseInt(locArr[1], 10);


      return {"x": x, "y": y}
    },
  },

  createItem(item) {
    const state = {
      name: item.name,
      top_left_loc: item.top_left_loc,
      bottom_right_loc: item.bottom_right_loc,
      clicked: false
    };

    return Object.assign({}, phototag.nameable(state), phototag.clickableItem(state, phototag.itemHelpers));
  },

  itemable: state => ({
    addItem: (item) => { state.items.push(item);},
    getItem: (index) => { return Object.assign({},state.items[index]); },
    getItemList: () => {return state.items.map(item => item.getName()); },
  }), 

  clickableBoard: (state, helpers) => ({
    click: (coords) => {
      let itemClicked = null;

      for (let i = 0; i < state.items.length; i += 1) {
        state.items[i].click(coords)
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
    getNameOfClicked: (coords) => {
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
    updateAllItemsClicked: (state) => {
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
      allItemsClicked: false
    }

    return Object.assign({}, phototag.itemable(state), phototag.clickableBoard(state, phototag.boardHelpers));
  },

  phaseable: (state, helpers)  => ({
    getStatus: () => state.gameStatus,
    getState: () => state.phase,
    start: () => {
      if (state.phase === 'ready') {
        state.phase = 'playing';
        if (state.directedArray !== null) {
          state.gameStatus = "Find " + `${state.directedArray[0]}`;
        } else {
          state.gameStatus = 'Click on objects and/or people';
        }
        state.timeStart = performance.now();
      } else {
        throw('Start called before controller is ready');
      }
    },
    addPicboard: (picboard) => {
      state.picBoard = picboard;
      state.phase = 'ready';
      state.gameStatus = 'ready';

      const meta_data = JSON.parse(JSON.parse(state.challenge).meta_data);
      if (meta_data.directed) {
        helpers.createDirectedArray(state)
      }
    },
    getChallengeData: () => state.challenge,
  }),

  playable: state => ({
    clickPicture: (coords) => {
      if (state.phase !== 'playing') {
        throw('Clicked was called when game was not being played');
      }

      // Only mark item clicked if it is what is being asked for
      if (state.directedArray !== null) {
        if (state.picBoard.getNameOfClicked(coords) === state.directedArray[0]) {
          state.picBoard.click(coords);
          state.directedArray.splice(0,1);
          state.gameStatus = 'Find ' + `${state.directedArray[0]}`;
        }
      } else {
        state.picBoard.click(coords);
      }

      if (state.picBoard.allItemsClicked()) {
        state.elapsedTime = performance.now() - state.timeStart;
        state.phase = 'over';
        state.gameStatus = `You finished in ${(state.elapsedTime/1000).toFixed(1)} seconds`

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
      textTime += Math.floor(seconds).toString().padStart(2, '0');
      let hundreths = Math.round(seconds % 1 * 100);
      textTime += ':';
      if (state.phase === 'over' && !state.timedSucess) {
        hundreths = 0;
      }
      textTime += hundreths.toString().padStart(2, '0');
      return textTime;
    },
    
  }),

  timed: (state) => (
    state.timerID = setTimeout(function() { 
      state.phase = 'over';
      state.timedSuccess = false;
      state.elapsedTime = state.challengeTime;
      state.gameStatus = 'You failed to complete the challenge on time';
    },
    state.challengeTime)
  ),

  challengeHelpers: {
    createDirectedArray(state) {
      // Grabbed from StackOverflow, Schwartzian transform
      state.directedArray = state.picBoard.getItemList()
        .map((a) => ({sort: Math.random(), value: a}))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
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
      directedArray: null
    }

    state.phase = (picBoard === null ? 'created' : 'ready');
    state.gameStatus = (picBoard === null ? 'Created' : 'ready');

    if (picBoard !== null && meta_data.directed) {
      phototag.challengeHelpers.createDirectedArray(state)
    }

    if (timedChallenge) {
      state.challengeTime = meta_data.ctime;
      controller = Object.assign({}, phototag.phaseable(state, phototag.challengeHelpers), phototag.playable(state), phototag.timed(state));
    } else {
      controller = Object.assign({}, phototag.phaseable(state, phototag.challengeHelpers), phototag.playable(state));
    }

    return controller;

  },

};

module.exports = phototag;

