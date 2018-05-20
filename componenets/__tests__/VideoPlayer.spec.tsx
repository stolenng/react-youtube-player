import * as React from "react";
import { shallow } from "enzyme";
import * as renderer from 'react-test-renderer';

import VideoPlayer from '../VideoPlayer/VideoPlayer';

describe('VideoPlayer', () => {
    it("Init VideoPlayer Componenet", () => {
        const mockFn = jest.fn();
        
        const tree = renderer
            .create(<VideoPlayer id='Ms3nnRs1SJs' onFinish={mockFn}></VideoPlayer>)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('Test start video', () => {
        const mockFn = jest.fn();
        
        const VideoInputComponent = shallow(
            <VideoPlayer id='Ms3nnRs1SJs' onFinish={mockFn}></VideoPlayer>
        );

        const instance = VideoInputComponent.instance() as VideoPlayer;

        instance.setState({ id: 'Ms3nnRs1SJs'});
        
        //Let youtube update state
        setTimeout(() => {
            expect(instance.playerStatus).toEqual(1);                    
        }, 500);
    });

    it('Test start video', () => {
        const mockFn = jest.fn();
        
        const VideoInputComponent = shallow(
            <VideoPlayer id='Ms3nnRs1SJs' onFinish={mockFn}></VideoPlayer>
        );

        const instance = VideoInputComponent.instance() as VideoPlayer;

        instance.setState({ id: 'Ms3nnRs1SJs'});
        
        instance.setState({ id: ''});
        
        //Let youtube update state
        setTimeout(() => {
            expect(instance.playerStatus).toEqual(-1);                                
        }, 500);
    });
});