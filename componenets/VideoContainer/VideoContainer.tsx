import * as React from "react";

import VideoInput from '../VideoInput/VideoInput';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import VideoList from '../VideoList/VideoList';

import Video from '../../models/Video';
import IVideo from '../../models/IVideo';
import IDropResult from './IDropResult';

import YoutubeService from '../../services/youtube.service';

type State = {
    videos: Array<Video>;
};

export default class VideoContainer extends React.Component<any, State> {
    state: State = {
        videos: []
    };

    constructor(props: any) {
        super(props);
    }

    add = (id: string) => {
        if (this.ifExists(id)) {
            alert('Item Exists!');

           return;
        }

        YoutubeService.get(id).then(this.handleAdd);
    }

    handleAdd = (res: Video) => {
        const video: Video = res;
        
        let videos = this.state.videos;

        videos.push(video);

        this.setState({ videos: videos });
    }

    ifExists(id: string) : boolean {
        return this.state.videos.filter(video => video.id === id).length ? true : false;
    }

    pop = (position? : number) => {
        let videos = this.state.videos;
        let current;
        
        if (position !== null) {
            videos.splice(position, 1);
        }
        else {
            videos.unshift();
        }

        this.setState({ videos: videos });
    }

    onDrop = (item: IDropResult) => {
        const newIndex = item.addedIndex;
        const prevIndex = item.removedIndex;
        const currentVideo = this.state.videos[prevIndex];
        let videos = this.state.videos;

        //Remove Prev from array
        videos.splice(prevIndex, 1);
        //Insert new position
        videos.splice(newIndex, 0, currentVideo);   
        
        this.setState({ videos: videos });
    }


    getCurrent(): string {
        if (this.state.videos.length === 0) {
            return '';
        }

        return this.state.videos[0].id;
    }

    render() {
        return (
            <div className="video-container">
                <div className="video-container-item">
                    <VideoInput onSubmit={this.add} />
                    <VideoList onDrop={this.onDrop} onRemove={this.pop} videos={this.state.videos} />
                </div>
                <div className="video-container-item">
                    <VideoPlayer id={this.getCurrent()} onFinish={this.pop} />
                </div>
            </div>
        );
    }
}