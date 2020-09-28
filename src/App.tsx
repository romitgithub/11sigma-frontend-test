import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from "store/store";
import JsonPathVisualizer from "containers/JsonPathVisualizer";
import Header from "components/Header";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Router>
          <Route path="/" exact component={JsonPathVisualizer} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
