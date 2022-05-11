import React from "react";
import ReactDOM from "react-dom";
import Weather from "./component/Weather";
import "./style/App.scss";



const App = () => {
  return (
    <div>
      <Weather />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
