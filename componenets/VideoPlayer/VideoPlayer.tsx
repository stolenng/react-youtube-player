import * as React from "react";
import YouTube from 'react-youtube';

import IVideoPlayer from './IVideoPlayer';


type State = {
    id: string
};


export default class VideoInputComponent extends React.Component<IVideoPlayer, State> {
    state: State = {
        id: ''
    };
    opts = {
        height: '450',
        width: '640',
        playerVars: {
            autoplay: 1
        }
    };
    player: YT.Player;

    constructor(props: IVideoPlayer) {
        super(props);
    }

    static getDerivedStateFromProps(nextProps, prevState): State {
        return nextProps;
    }

    onPlayerStateChange(event) {
        if (YT.PlayerState.ENDED === event.data) {
            this.props.onFinish();            
        }        
    }

    isEmpty(): string {
        return this.state.id.length > 0 ? '' : 'video-empty';
    }

    render() {
        return (
            <div className={`videos-player ${this.isEmpty()}`}>
                <YouTube
                    videoId={this.state.id}
                    opts={this.opts}
                    onStateChange={(event) => this.onPlayerStateChange(event)}
                />          
            </div>
        );
    }
}