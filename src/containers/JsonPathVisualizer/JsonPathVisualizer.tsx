import React from "react";
import jsonPath from "jsonpath";
import styles from "./JsonPathVisualizer.module.css";

import FileUploadBox from "components/FileUploadBox";
import JsonObject from "components/JsonObject";

interface State {
  query: string;
  filteredData: any;
  jsonData: any;
}

interface Props {}

class JsonPathVisualizer extends React.Component<Props, State> {
  state = {
    query: "",
    filteredData: [],
    jsonData: {},
  };

  handleJsonQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      {
        query: event.target.value,
      },
      () => {
        this.filterJsonData();
      }
    );
  };

  filterJsonData = () => {
    try {
      const filteredData = jsonPath.query(
        this.state.jsonData,
        this.state.query
      );
      this.setState({ filteredData });
    } catch (e) {
      console.log(e);
    }
  };

  handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      this.setState({ jsonData: {} });
      this.onChange(event);
    }
  };

  onChange = (event: any) => {
    var reader = new FileReader();
    reader.onload = this.onReaderLoad;
    reader.readAsText(event.target.files[0]);
  };

  onReaderLoad = (event: any) => {
    var obj = JSON.parse(event.target.result);
    this.setState({ jsonData: obj });
  };

  render() {
    const { query, filteredData, jsonData } = this.state;

    return (
      <>
        <div className={styles.formContainer}>
          <input
            className={`${styles.inputField} ${styles.queryField}`}
            value={query}
            type="text"
            placeholder="enter your json path query here..."
            onChange={this.handleJsonQueryChange}
          />

          <FileUploadBox handleFileUpload={this.handleFileUpload} />
        </div>

        {jsonData && (
          <div className={styles.jsonContainer}>
            <JsonObject jsonObj={jsonData} filteredData={filteredData} />
          </div>
        )}
      </>
    );
  }
}

export default JsonPathVisualizer;
