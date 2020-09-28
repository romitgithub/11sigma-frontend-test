import React from "react";
import { connect } from "react-redux";
import debounce from "lodash.debounce";

import * as actions from "./actions";
import styles from "./JsonPathVisualizer.module.css";

import FileUploadBox from "components/FileUploadBox";
import JsonObject from "components/JsonObject";

interface State {
  query: string;
  filteredData: any;
  jsonData: any;
}

interface Props {
  jsonData: any;
  query: string;
  isLoading: boolean;
  filteredJsonData: any;
  updateJsonPathQuery: Function;
  filterJsonData: Function;
  saveFileData: Function;
  startFileRead: Function;
  stopFileRead: Function;
  resetData: Function;
}

class JsonPathVisualizer extends React.Component<Props, State> {
  state = {
    query: "",
    filteredData: [],
    jsonData: {},
  };

  handleJsonQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateJsonPathQuery(event.target.value);
    this.filterJsonData(event.target.value);
  };

  filterJsonData = (query: string) => {
    this.props.filterJsonData(query, this.props.jsonData);
  };

  handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      this.props.resetData();
      this.props.startFileRead();
      this.readDataFromFile(event);
    }
  };

  readDataFromFile = (event: any) => {
    var reader = new FileReader();
    reader.onload = this.onReaderLoad;
    reader.readAsText(event.target.files[0]);
  };

  onReaderLoad = (event: any) => {
    var jsonData = JSON.parse(event.target.result);
    this.props.stopFileRead();
    this.props.saveFileData(jsonData);
  };

  render() {
    console.log(this.props);

    const { jsonData, query, filteredJsonData, isLoading } = this.props;

    return (
      <>
        <div className={styles.formContainer}>
          <input
            className={`${styles.inputField} ${styles.queryField}`}
            value={query}
            type="text"
            placeholder="enter your json path query here..."
            onChange={this.handleJsonQueryChange}
            disabled={!jsonData}
          />

          <FileUploadBox handleFileUpload={this.handleFileUpload} />
        </div>

        {isLoading && <p>Loading...</p>}

        {jsonData && (
          <div className={styles.jsonContainer}>
            <JsonObject jsonObj={jsonData} filteredData={filteredJsonData} />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  ...state.jsonPathVisualizerReducer,
});

const mapDispatchToProps = (dispatch: Function) => ({
  updateJsonPathQuery: (query: string) => {
    dispatch(actions.updateJsonPathQuery(query));
  },
  filterJsonData: (query: string, jsonData: any) => {
    dispatch(actions.filterJsonData(query, jsonData));
  },
  saveFileData: (jsonData: any) => {
    dispatch(actions.saveFileData(jsonData));
  },
  startFileRead: () => {
    dispatch(actions.startFileRead());
  },
  stopFileRead: () => {
    dispatch(actions.stopFileRead());
  },
  resetData: () => {
    dispatch(actions.resetData());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(JsonPathVisualizer);
