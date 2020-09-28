import React from "react";
import JsonPathVisualizer from "containers/JsonPathVisualizer";
import Header from "components/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <JsonPathVisualizer />
    </div>
  );
}

export default App;
