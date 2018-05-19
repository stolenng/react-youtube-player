import Video from '../../models/Video';

export default interface IVideoPlayer{
    videos: Array<Video>;
    onRemove: (position : number) => void;
    onDrop: (item : any) => void;
}