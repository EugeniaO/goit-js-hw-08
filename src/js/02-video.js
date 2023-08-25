import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const loadCurrentVideoTime = function() { 
    const currentTime = localStorage.getItem('videoplayer-current-time');

    if (currentTime) {
        player.setCurrentTime(+currentTime);
    }
}

window.addEventListener('load', loadCurrentVideoTime);

const saveCurrentVideoTime = function({ seconds }) {
    localStorage.setItem("videoplayer-current-time", seconds);
};

player.on('timeupdate', throttle(saveCurrentVideoTime, 1000));