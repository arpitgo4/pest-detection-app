
/**
 * secret for internal api auth
 */
const { NODE_ENV, SERVER_IP, } = process.env;

const JWT_SECRET = process.env.JWT_SECRET || 'U5ZnTwt0tpmUHAVhES51iXM52mFSbxsOojFs5JNnZUv082ZACjnsuRNklomA';    // life time token secret
const JWT_HEADER = 'x-token';
const USER_JWT_TOKEN_TTL = NODE_ENV === 'development' ? '10y' : '20m';
const UPLOAD_DESTINATION = './static/uploads';
const SERVER_DOMAIN = NODE_ENV === 'development' ? `http://127.0.0.1:8080` : `http://${SERVER_IP}`;

const MSS_SERVER_ADDR = process.env.MSS_SERVER_ADDR;

const MSS_SERVER_APIS = {

};

const MICROSERVICES = {
    MSS_SERVER: {
        url: MSS_SERVER_ADDR,
        apis: MSS_SERVER_APIS,
    }
};

const getAPI = (microservice: any, api: string, params: object = {}) => {
    Object.keys(params).forEach(key => {
        api = api.replace(`:${key}`, params[key]);
    });

    return `${microservice.url}${api}`;
};

const USER_ROLES = {
    GUEST_USER: 'GUEST User',
    CLIENT_USER: 'Client User',
    SUPER_USER: 'Super User',
    ADMIN_GUEST: 'GUEST Admin',
    ADMIN: 'Admin',
};

const GUEST_COMPANY = 'GUEST Co.';

const INSPECTION_DUMMY_IMAGE = `https://cdn.travel2next.com/wp-content/uploads/driving-across-canada-5.jpg`;

const dummy_inspection = {
    'company': {
        'name': 'Gas Producer Co.'
    },
    'site': {
        'name': 'Site B',
        'lat': 51.048615,
        'long': -114.070847,
        'lsd': 'datum...',
        'uid': '100.16-09-010-09W1.00'
    },
    'facility': {
        'name': 'Facility C',
        'lat': 51.048615,
        'long': -114.070847,
        'lsd': 'datum...',
        'uid': '100.16-09-010-09W1.00'
    },
    'inspector': {
        'name': 'Bob Randolph',
        'company': 'ABC Inspections',
        'certification': 'N/A'
    },
    'inspection': {
        'date': '10/4/18',
        'time': '4:41 PM',
        'name': 'Compressor 15 using illuminator from 3m',
        'image_url': INSPECTION_DUMMY_IMAGE,
        'cam_direction': 180.000000,
        'wind_speed': 10,
        'wind_speed_units': 'mph',
        'wind_direction': 15.000000,
        'leaks': [
            {
                'number': 1,
                'pressure': 1000.000000,
                'pressure_units': 'PSI',
                'mass_rate': 10.111111,
                'mass_rate_units': 'g/min',
                'vol_rate': 10.111111,
                'vol_rate_units': 'SLPM'
            },
            {
                'number': 2,
                'pressure': 1000.000000,
                'pressure_units': 'PSI',
                'mass_rate': 12.444444,
                'mass_rate_units': 'g/min',
                'vol_rate': 10.111111,
                'vol_rate_units': 'SLPM'
            },
        ]
    }
};


export {
    UPLOAD_DESTINATION,
    SERVER_DOMAIN,
    JWT_SECRET,
    JWT_HEADER,
    getAPI,
    USER_ROLES,
    MICROSERVICES,
    dummy_inspection,
    USER_JWT_TOKEN_TTL,
    GUEST_COMPANY,
    INSPECTION_DUMMY_IMAGE,
};
