
import * as React from "react";
import * as ReactDOM from "react-dom";
import { hot } from 'react-hot-loader'

import VideoContainer from '../VideoContainer/VideoContainer';


const App = () => (
  <div className="app">
    <VideoContainer />
  </div>
)

export default hot(module)(App);
