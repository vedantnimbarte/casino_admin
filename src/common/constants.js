/* eslint:disable:max-classes-per-file */

// const API_URL = 'http://192.168.29.78:3002/admin';
const API_URL = 'http://143.110.183.1:3002/admin';

class InternalAPI {
    static AGENT = '/agenttype';
    static GAMEGROUP = '/gametype';
    static FAQ = '/faq';
    static COINPACK = '/coinpack';
    static LOYALTYPACK = '/loyalty';
    static SETTINGS = '/setting';
    static GAMES = '/games';
    static SLIDER = '/slider';
    static PERMISSIONS = '/permissions';
    static MENUPERMISSIONS = '/menupermissions';
}

class SubRoutes {
    static LIST = '/list';
}

export { API_URL, InternalAPI, SubRoutes };
