import React from "react";
import { connect } from "react-redux";
import debounce from "lodash.debounce";

import * as actions from "./actions";
import styles from "./JsonPathVisualizer.module.css";

import SearchBox from "components/SearchBox";
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
  filterJsonData: Function;
  saveFileData: Function;
  startFileRead: Function;
  stopFileRead: Function;
  resetData: Function;
}

class JsonPathVisualizer extends React.Component<Props, State> {
  static whyDidYouRender = true;

  constructor(props: Props) {
    super(props);

    this.filterJsonData = debounce(this.filterJsonData.bind(this), 1500);
  }

  handleJsonQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    const { jsonData, filteredJsonData, isLoading } = this.props;

    return (
      <>
        <div className={styles.formContainer}>
          <SearchBox
            disabled={!jsonData}
            handleInputChange={this.handleJsonQueryChange}
          />

          <FileUploadBox handleFileUpload={this.handleFileUpload} />
        </div>

        {isLoading && <div className={styles.loader}>Loading {`{...}`}</div>}

        {!isLoading && !jsonData && (
          <div className={styles.loader}>Please upload a json file</div>
        )}

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
