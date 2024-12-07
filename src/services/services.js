import reels from './reels';
import appImages from './appImages';
import auth from './auth';
import chat from './chat';
import userActivity from './userActivity';
import wallet from './wallet';

export const services = {
  reels,
  appImages,
  auth,
  chat,
  userActivity,
  wallet
};

// Optionally, if you want to access all services via a single object
export default services;