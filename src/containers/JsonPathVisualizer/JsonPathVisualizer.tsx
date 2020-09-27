import React from "react";
import jsonPath from "jsonpath";
import { DUMMY_JSON, DUMMY_JSON_BIG } from "data/";
import styles from "./JsonPathVisualizer.module.css";
import uploadImg from "assets/img/upload.png";

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
        const filteredData = jsonPath.query(DUMMY_JSON, this.state.query);
        this.setState({ filteredData });
      }
    );
  };

  handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    this.onChange(event);
  };

  onChange = (event: any) => {
    var reader = new FileReader();
    reader.onload = this.onReaderLoad;
    reader.readAsText(event.target.files[0]);
  };

  onReaderLoad = (event: any) => {
    console.log(event.target.result);
    var obj = JSON.parse(event.target.result);
    console.log(obj);
    this.setState({ jsonData: obj });
  };

  render() {
    const { query, filteredData, jsonData } = this.state;

    return (
      <>
        <h4>JSON Path Visualizer</h4>

        <label className={styles.fileUploadBox} htmlFor="fileUpload">
          <img
            className={styles.fileUploadIcon}
            src={uploadImg}
            alt="Upload Json File"
          />
          <p>Upload File</p>
        </label>
        <input
          className={styles.fileUploadInput}
          id="fileUpload"
          type="file"
          accept="application/json"
          onChange={this.handleFileUpload}
        />

        <input
          className={`${styles.inputField} ${styles.queryField}`}
          value={query}
          type="text"
          placeholder="enter your json path query here..."
          onChange={this.handleJsonQueryChange}
        />

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
