import {io} from 'socket.io-client';

const initialState = {
  socket: io('http://34.92.207.101:5000'),
};

const socket = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_SOCKET':
      return {
        ...state,
        socket: io('http://34.92.207.101:5000'),
      };
    default:
      return initialState;
  }
};

export default socket;
