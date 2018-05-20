import axios from 'axios';
import Video from '../models/Video';

const API_KEY = 'AIzaSyCsbRE9QbDsptnRr4ETENN-DMpCeFfJPBs';

const covtime = (youtube_time: string) => {
    let array = youtube_time.match(/(\d+)(?=[MHS])/ig) || [];

    let formatted = array.map((item, index) => {
        if (item.length < 2) return '0' + item;
        if (index === array.length-1) return parseInt(item) - 1;
        
        return item;
    }).join(':');
    
    return formatted;
}


const YoutubeService = {
    get(id: string) : Promise<Video> {
        return axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${API_KEY}&part=contentDetails,snippet`).then(res => {
            if (res.status !== 200) {
                throw new Error('Bad Api Response');
            }

            return new Video(id, res.data.items[0].snippet.title, covtime(res.data.items[0].contentDetails.duration), res.data.items[0].snippet.thumbnails.default.url);
        });
    }
};


export default YoutubeService;