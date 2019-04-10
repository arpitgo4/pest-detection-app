
import * as moment from 'moment';
import formatcoords from 'formatcoords';

import { getTokenFromLS, getUserFromLS } from './local-storage';
import { parseMomentToUnixTimeStamp } from './utils';


const ONE_DAY = 86400;
const end_timestamp = parseMomentToUnixTimeStamp(moment.now());

const initialState = {
	auth: {
		token: getTokenFromLS(),
		logged_in_user: getUserFromLS(),
		misc: {
			is_loading: false
		}
	},
	pest_detections: [],
	misc: {},
	notifications: [],				// react-redux-notifications component
};


export default initialState;