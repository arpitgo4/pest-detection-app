

const API_SERVER_IP = API_GATEWAY;

class ApiFactory {

    get(api, params, query_params) {
        let url = api.url;

        if(params) {
            Object.keys(params)
            .forEach(key => {
                const value = params[key];
                url = url.replace(`:${key}`, value);
            });
        }

        if (query_params) {
            url += `?`;
            Object.keys(query_params)
            .forEach(key => {
                const value = query_params[key];

                if (value !== undefined)
                    url += `${key}=${encodeURIComponent(value)}&`;
            });
        }

        return Object.assign({}, api, { url: `${this.API_SERVER}${url}` });
    }
}


class AuthApiFactory extends ApiFactory {
    API_SERVER = `http://${API_SERVER_IP}/api/v1/auth`;

    API_TABLE = {
        GET_TOKEN: { url: `/token`, type: 'POST' },
        POST_USER: { url: `/user`, type: `POST`, },
    };
}

class PestApiFactory extends ApiFactory {
    API_SERVER = `http://${API_SERVER_IP}/api/v1/pest`;

    API_TABLE = {
        GET_PEST_DETECTIONS: { url: `/`, type: `GET` },
        POST_PEST_DETECTION: { url: `/`, type: `POST`, },
    };
}

class MiscApiFactory extends ApiFactory {
    API_SERVER = `http://${API_SERVER_IP}/api/v1/misc`;

    API_TABLE = {
        GET_COMPANIES: { url: `/companies`, type: `GET` },
    };
}

export const authApiFactory = new AuthApiFactory();
export const pestApiFactory = new PestApiFactory();
