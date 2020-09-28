import { combineReducers } from "redux";

import jsonPathVisualizerReducer from "containers/JsonPathVisualizer/reducer";

const appReducer = combineReducers({
  jsonPathVisualizerReducer,
});

export default appReducer;
