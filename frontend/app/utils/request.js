export const METHODS = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PUT: 'PUT',
};

export const getUrl = (handle, queryParams = {}) => {
    const reqHandle = handle;

    let url = '';
    try {
        // const cookies = new Cookies();
        // const token = cookies.get(TOKEN_COOKIE_NAME);
        const isHandleIncludesHttp = reqHandle.includes('http');
        const isHandleIncludesParams = reqHandle.includes('?');
        const apiUrl = isHandleIncludesHttp ? '' : API_URL;
        // const deviceModel = `${browserName}-${browserVersion}`;

        const apiKey = `${isHandleIncludesParams ? `&` : `?`}`;
        const query = qs.stringify({
            token: token || undefined,
            deviceId: deviceId || undefined,
            deviceType: isServerSide ? undefined : deviceType,
            deviceModel: isServerSide ? undefined : deviceModel,
            ...queryParams,
            platform: queryParams.platform || PLATFORM,
        });

        url = `${apiUrl}${reqHandle}${apiKey}&${query}`;
    } catch (error) {
        console.log('API REQUEST ERROR: 🙀', error, handle, queryParams);
    }

    return url;
};


export default function request(url, params = {}) {
    const {
        method = METHODS.GET,
        credentials = 'include',
        headers = { 'Content-Type': 'application/json' },
        queryParams = {},
        body,
    } = params;

    const response = {
        data: null,
        status: null,
        url: null,
        error: null,
    };

    return new Promise(resolve => {
        response.url = url;

        fetch(url, {
            method,
            credentials,
            headers,
            ...(body ? { body: typeof body === 'string' ? body : JSON.stringify(body) } : {}),
        })
        .then(async res => {
            response.status = res?.status;

            if (res?.status < 400) {
                response.data = await res.json().catch(() => null);
            } else {
                response.error = await res.json();
            }
        })
        .catch(error => {
            response.error = error;
        })
        .finally(() => {
            resolve(response);
        });
    });
}
