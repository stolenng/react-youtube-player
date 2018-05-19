import IVideo from './IVideo';

export default class Video implements IVideo {
    constructor(public id: string, public title: string,  public duration: string, public thumbnail: string) {
        this.title = title;
        this.id = id;
        this.duration = duration;
    }
}