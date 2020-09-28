import ACTION_TYPES from "./actionType";
import jsonPath from "jsonpath";

export const updateJsonPathQuery = (query: string) => {
  return (dispatch: Function) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_JSON_PATH_QUERY,
      data: query,
    });
  };
};

export const filterJsonData = (query: string, jsonData: any) => {
  return (dispatch: Function) => {
    try {
      const filteredData = jsonPath.query(jsonData, query);
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
