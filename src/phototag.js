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

  phaseable: state => ({
    getStatus: () => state.gameStatus,
    getState: () => state.phase,
    start: () => {
      state.phase = 'playing';
      state.gameStatus = 'Click on objects and/or people';
      state.timeStart = performance.now();
    }
  }),

  playable: state => ({
    clickPicture: (coords) => {
      if (state.phase !== 'playing') {
        throw('Clicked was called when game was not being played');
      }

      state.picBoard.click(coords);
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

  createChallengeController(picBoard, challengeTime = null) {
    let controller = null;

    const state = {
      picBoard: picBoard,
      phase: 'ready',
      gameStatus: 'Game is ready to start',
      timeStart: null,
      elapsedTime: 0,
      challengeTime: challengeTime,
      timerID: null,
      timedSuccess: false
    }

    if (challengeTime === null) {
      controller = Object.assign({}, phototag.phaseable(state), phototag.playable(state));
    } else {
      controller = Object.assign({}, phototag.phaseable(state), phototag.playable(state), phototag.timed(state));
    }

    return controller;

  },

};

module.exports = phototag;

