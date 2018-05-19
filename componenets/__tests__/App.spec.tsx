import * as React from "react";
import { shallow } from "enzyme";

import App from "../App/App";
import VideoContainer from "../VideoContainer/VideoContainer";

it("render app component", () => {
    const result = shallow(<App />).contains(
        <div className="app">
            <VideoContainer />
        </div>
    );

    expect(result).toBeTruthy();
});