export const PlayerBackLength = (state = null, action) => {
  if (action.type === "ADD_LENGTH") {
    state = action.payload;
    return state;
  } else {
    return state;
  }
};
