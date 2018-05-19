import * as React from "react";

import VideoInput from '../VideoInput/VideoInput';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import VideoList from '../VideoList/VideoList';

import Video from '../../models/Video';
import IVideo from '../../models/IVideo';

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

    add(id) {
        if (this.ifExists(id)) {
            alert('Item Exists!');

           return;
        }

        YoutubeService.get(id).then((res) => this.handleAdd(res));
    }

    handleAdd(res: IVideo) {
        const video = new Video(res.id, res.title, res.duration, res.thumbnail);
        
        let videos = this.state.videos;

        videos.push(video);

        this.setState({ videos: videos });
    }

    ifExists(id: string) : boolean {
        let flag = false;

        this.state.videos.forEach((video) => {
            if (video.id === id) {
                flag = true;
            }
        });

        return flag;
    }

    pop(position?) {
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

    onDrop(item) {
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
                    <VideoInput onSubmit={(id) => this.add(id)} />
                    <VideoList onDrop={(item) => this.onDrop(item)} onRemove={(position) => this.pop(position)} videos={this.state.videos} />
                </div>
                <div className="video-container-item">
                    <VideoPlayer id={this.getCurrent()} onFinish={() => this.pop()} />
                </div>
            </div>
        );
    }
}