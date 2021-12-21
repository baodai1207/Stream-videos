import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3001',
});

// Store Firebase
// Socket.io: syncs signal to different instance of the app
