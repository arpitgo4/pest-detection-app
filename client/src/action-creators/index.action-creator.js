
import { error, success } from 'react-notification-system-redux';

import * as pestActionCreators from './pest';
import * as authActionCreators from './auth';


export const showErrorNotification = message => {
    const notification = {
        uid: require('uuid').v4(), 
        title: 'Error',
        message: message,
        position: 'tr',
        autoDismiss: 0
    };

    return error(notification);
};

export {
    authActionCreators,
    pestActionCreators,
};