const phototag = {
  nameable: state => ({
    getName: () => state.name,
  }),

  clickableItem: (state, helpers) => ({
    click: (coords) => {
      state.clicked = helpers.coords_within_rect(coords, state, helpers);
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
};

module.exports = phototag;

