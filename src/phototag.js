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
  }),

  itemHelpers: {
    coords_within_rect(coords, state, helpers) {
      const {x, y} = coords;

      const leftX = helpers.getXY(state.top_left_loc).x;
      const rightX = helpers.getXY(state.bottom_right_loc).x;
      const bottomY = helpers.getXY(state.bottom_right_loc).y;
      const topY = helpers.getXY(state.top_left_loc).y;

      return x > leftX && x < rightX && y > bottomY && y < topY;

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
      bottom_left_loc: item.bottom_left_loc,
      top_left_loc: item.top_left_loc,
      top_right_loc: item.top_right_loc,
      bottom_right_loc: item.bottom_right_loc,
      clicked: false
    };

    return Object.assign({}, phototag.nameable(state), phototag.clickableItem(state, phototag.itemHelpers));
  },

  itemable: state => ({
    addItem: (item) => { state.items.push(item)},
    getItem: (index) => state.items[index],
  }), 

  clickableBoard: (state, helpers) => ({
    click: (coords) => {
      for (let i = 0; i < state.items.length; i += 1) {
        state.items[i].click(coords)
      }
      helpers.updateAllItemsClicked(state);
    },
    allItemsClicked: () => state.allItemsClicked,
  }),

  boardHelpers: {
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
      allItemsClicked: false
    }

    return Object.assign({}, phototag.itemable(state), phototag.clickableBoard(state, phototag.boardHelpers));
  },

  phaseable: state => ({
    getStatus: () => state.gameStatus,
    getState: () => state.phase,
  }),

  playable: state => ({
    clickPicture: (coords) => {
      if (state.phase !== 'playing') {
        throw('Clicked was called when game was not being played');
      }

      state.picBoard.click(coords);
      if (state.picBoard.allItemsClicked()) {
        state.elapsedTime = Date.now() - state.timeStart;
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
      phase: 'playing',
      gameStatus: 'Click on objects and/or people',
      timeStart: Date.now(),
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

