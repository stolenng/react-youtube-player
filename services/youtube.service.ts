import axios from 'axios';

const API_KEY = 'AIzaSyCsbRE9QbDsptnRr4ETENN-DMpCeFfJPBs';

const covtime = (youtube_time) => {
    let array = youtube_time.match(/(\d+)(?=[MHS])/ig) || [];
    let formatted = array.map(function (item) {
        if (item.length < 2) return '0' + item;
        return item;
    }).join(':');
    
    return formatted;
}


const YoutubeService = {
    get(id: string) {
        return axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${API_KEY}&part=contentDetails,snippet`).then(res => {
            if (res.status !== 200) {
                throw new Error('Bad Api Response');
            }

            return { id: id, title: res.data.items[0].snippet.title, duration: covtime(res.data.items[0].contentDetails.duration), thumbnail: res.data.items[0].snippet.thumbnails.default.url };
        });
    }
};


export default YoutubeService;