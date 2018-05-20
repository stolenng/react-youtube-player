import * as React from "react";
import { shallow } from "enzyme";

import App from "../App/App";
import VideoContainer from "../VideoContainer/VideoContainer";
import VideoList from "../VideoList/VideoList";
import VideoInput from "../VideoInput/VideoInput";
import Video from '../../models/Video';


describe('Video Container', () => {
   
    it("render video container component", () => {
        const result = shallow(<App />).contains(
            <div className="app">
                <VideoContainer />
            </div>
        );

        expect(result).toBeTruthy();
    });


    it('Test add item to list', () => {
       const VideoContainerComponent = shallow(
            <VideoContainer></VideoContainer>
        );
     
        let instance = VideoContainerComponent.instance() as VideoContainer;
        
        instance.setState({ videos: [new Video('Ms3nnRs1SJs', '', '', '')]})
        
        expect(instance.state.videos.length).toEqual(1);   
    });


    it('Test remove item from list', () => {         
         const VideoContainerComponent = shallow(
             <VideoContainer></VideoContainer>
         );
       
         let instance = VideoContainerComponent.instance() as VideoContainer;
 
         instance.setState({ videos: [new Video('Ms3nnRs1SJs', '', '', '')]})
         
         instance.pop();
         
         expect(instance.state.videos.length).toEqual(0);       
     }); 
});