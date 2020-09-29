import APP_INITIAL_STATE from "store/initialState";
import ACTION_TYPES from "./actionType";

const jsonPathVisualizerReducer = (
  state = APP_INITIAL_STATE.jsonPathVisualizerReducer,
  action: { type: string; data: { [key: string]: any } }
) => {
  switch (action.type) {
    case ACTION_TYPES.FILTER_JSON_DATA:
      return { ...state, filteredJsonData: action.data };
    case ACTION_TYPES.SAVE_FILE_DATA:
      return { ...state, jsonData: action.data };
    case ACTION_TYPES.RESET_DATA:
      return APP_INITIAL_STATE.jsonPathVisualizerReducer;
    case ACTION_TYPES.START_FILE_READ:
      return { ...state, isLoading: true };
    case ACTION_TYPES.STOP_FILE_READ:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default jsonPathVisualizerReducer;
