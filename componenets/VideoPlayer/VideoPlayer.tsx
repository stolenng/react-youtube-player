import * as React from "react";
import YouTube from 'react-youtube';

import IVideoPlayer from './IVideoPlayer';


type State = {
    id: string
};


export default class VideoPlayer extends React.Component<IVideoPlayer, State> {
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
    playerStatus: any;
    player: YT.Player;

    constructor(props: IVideoPlayer) {
        super(props);
    }

    static getDerivedStateFromProps(nextProps: State, prevState: State): State {
        return nextProps;
    }

    onPlayerStateChange = (event: any) => {
        //save player state for testing
        this.playerStatus = event.data;

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
                    onStateChange={this.onPlayerStateChange}
                />          
            </div>
        );
    }
}