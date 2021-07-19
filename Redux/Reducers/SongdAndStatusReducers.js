export const songAndStatusReducers = (state = null, action) => {
  if (action.type === "ADD_SONG") {
    state = action.payload;
    return state;
  } else {
    return state;
  }
};
