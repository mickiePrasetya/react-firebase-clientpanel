import { NOTIFY_USER } from './types';

export const notifyUser = (message, messageType) => {
	return {
		type: NOTIFY_USER,
		message: message,
		messageType: messageType
	};
};

/////////////////////////////////
// Equal to

// export const notifyUser = (message, messageType) => {
// 		type: NOTIFY_USER, message,	messageType
// };
