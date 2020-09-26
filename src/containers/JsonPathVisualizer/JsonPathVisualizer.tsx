import React from "react";
import jsonPath from "jsonpath";
import { DUMMY_JSON, DUMMY_JSON_BIG } from "data/";
import styles from "./JsonPathVisualizer.module.css";

import JsonObject from "components/JsonObject";

interface State {
  query: string;
  filteredData: any;
}

interface Props {}

class JsonPathVisualizer extends React.Component<Props, State> {
  state = {
    query: "",
    filteredData: [],
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

  render() {
    const { query, filteredData } = this.state;

    return (
      <div>
        <h4>JSON Path Visualizer</h4>

        <input
          className={`${styles.inputField} ${styles.queryField}`}
          value={query}
          type="text"
          placeholder="enter your json path query here..."
          onChange={this.handleJsonQueryChange}
        />
        <div className={styles.jsonContainer}>
          <JsonObject jsonObj={DUMMY_JSON} filteredData={filteredData} />
        </div>
      </div>
    );
  }
}

export default JsonPathVisualizer;
