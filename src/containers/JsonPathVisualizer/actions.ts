import ACTION_TYPES from "./actionType";
import jsonPath from "jsonpath";

export const filterJsonData = (query: string, jsonData: any) => {
  return (dispatch: Function) => {
    try {
      console.log("time before start: ", new Date().getTime());
      const filteredData = jsonPath.query(jsonData, query);
      console.log("time after end: ", new Date().getTime());
      dispatch({
        type: ACTION_TYPES.FILTER_JSON_DATA,
        data: filteredData,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: ACTION_TYPES.FILTER_JSON_DATA,
        data: [],
      });
    }
  };
};

export const saveFileData = (jsonData: any) => {
  return (dispatch: Function) => {
    dispatch({
      type: ACTION_TYPES.SAVE_FILE_DATA,
      data: jsonData,
    });
  };
};

export const startFileRead = () => {
  return (dispatch: Function) => {
    dispatch({
      type: ACTION_TYPES.START_FILE_READ,
    });
  };
};

export const stopFileRead = () => {
  return (dispatch: Function) => {
    dispatch({
      type: ACTION_TYPES.STOP_FILE_READ,
    });
  };
};

export const resetData = () => {
  return (dispatch: Function) => {
    dispatch({
      type: ACTION_TYPES.RESET_DATA,
    });
  };
};
