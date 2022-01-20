/* eslint:disable:max-classes-per-file */

const API_URL = 'http://192.168.29.78:3002/admin';
// const API_URL = 'http://143.110.183.1:3002/admin';

class InternalAPI {
    static AGENT = '/agenttype';
    static GAMEGROUP = '/gametype';
    static FAQ = '/faq';
    static COINPACK = '/coinpack';
    static SETTINGS = '/setting';
}

class SubRoutes {
    static LIST = '/list';
}

export { API_URL, InternalAPI, SubRoutes };
