
/**
 * secret for internal api auth
 */
const { NODE_ENV, API_GATEWAY, } = process.env;

const JWT_SECRET = process.env.JWT_SECRET || 'U5ZnTwt0tpmUHAVhES51iXM52mFSbxsOojFs5JNnZUv082ZACjnsuRNklomA';    // life time token secret
const JWT_HEADER = process.env.JWT_HEADER || 'x-token';
const USER_JWT_TOKEN_TTL = NODE_ENV === 'development' ? '10y' : '20m';
const UPLOAD_DESTINATION = './static/uploads';
const SERVER_DOMAIN = `http://${API_GATEWAY}`;

const INSPECTION_DUMMY_IMAGE = `https://cdn.travel2next.com/wp-content/uploads/driving-across-canada-5.jpg`;


export {
    UPLOAD_DESTINATION,
    SERVER_DOMAIN,
    JWT_SECRET,
    JWT_HEADER,
    USER_JWT_TOKEN_TTL,
    INSPECTION_DUMMY_IMAGE,
};
