import {io} from 'socket.io-client';

const socket = io('http://learning-application.online:5000');
export default socket;
