import * as React from "react";

import IVideoList from './IVideoList';
import Video from '../../models/Video';
import { Container, Draggable } from 'react-smooth-dnd';

type State = {
    videos: Array<Video>;
};


export default class VideoList extends React.Component<IVideoList, State> {
    state: State = {
        videos: []
    };

    constructor(props: IVideoList) {
        super(props);
    }

    static getDerivedStateFromProps(nextProps: State, prevStat: State): State {
        return nextProps;
    }

    render() {
        return (
            <div className="videos-list">
                <ul>
                    <Container onDrop={this.props.onDrop}>
                        {
                            this.state.videos.map((video, index) => {
                                return (
                                    <Draggable key={`${video.id}-${index}`}>
                                        <li>
                                            <img src={video.thumbnail} />
                                            <h3>{video.title}</h3>
                                            <span>Duration: {video.duration}</span>
                                            <button className="fa fa-close" onClick={() => this.props.onRemove(index)}></button>
                                        </li>
                                    </Draggable>
                                )
                            })
                        }
                    </Container>
                </ul>
            </div>
        );
    }
}