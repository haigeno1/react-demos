import { StrictMode } from "react";
import ReactDOM from "react-dom";

//https://juejin.cn/post/6932425746493210632

import WrongApp from "./WrongApp";
import App1 from "./App1";
import App2 from "./App2";
import WrongApp2 from "./WrongApp2";
import App3 from "./App3";
import App4 from "./App4";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <WrongApp />
    {/* <App1 /> */}
    {/* <App2 /> */}
    {/* <WrongApp2 /> */}
    {/* <App3 /> */}
    {/* <App4 /> */}
  </StrictMode>,
  rootElement
);
