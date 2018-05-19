import * as React from "react";
import { shallow } from "enzyme";
import * as renderer from 'react-test-renderer';

import VideoInput from '../VideoInput/VideoInput';




describe('VideoInput', () => {
    it("Init input Componenet", () => {
        const tree = renderer
            .create(<VideoInput onSubmit={() => { }}></VideoInput>)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('Test input validation', () => {
        const mockFn = jest.fn();
        
        const VideoInputComponent = shallow(
            <VideoInput onSubmit={mockFn}></VideoInput>
        );

        const url = 'https://www.youtube.com/watch?v=M3w2xDPHr90&list=RDkTRhXVq_8Nw&index=4';

        const instance = VideoInputComponent.instance() as VideoInput;

        expect(instance.validate(url)).toEqual(true);        
    });

    it('Test input id extraction', () => {
        const mockFn = jest.fn();
        
        const VideoInputComponent = shallow(
            <VideoInput onSubmit={mockFn}></VideoInput>
        );

        const url = 'https://www.youtube.com/watch?v=M3w2xDPHr90&list=RDkTRhXVq_8Nw&index=4';

        const instance = VideoInputComponent.instance() as VideoInput;

        expect(instance.extractId(url)).toEqual('M3w2xDPHr90');        
    });
});