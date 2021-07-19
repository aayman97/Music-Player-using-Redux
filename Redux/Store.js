import { combineReducers, createStore } from "redux";
import { PlayerBackLength } from "./Reducers/PlayerBackLength";
import { songAndStatusReducers } from "./Reducers/SongdAndStatusReducers";

const rootReducer = combineReducers({
  song: songAndStatusReducers,
  length: PlayerBackLength,
});
export const store = createStore(rootReducer);
