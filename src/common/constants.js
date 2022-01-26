/* eslint:disable:max-classes-per-file */

// const API_URL = 'http://143.110.183.1:3002/admin';
const API_URL = 'http://192.168.29.78:3002/admin';
const IMAGE_URL = 'http://192.168.29.78:3002';

class InternalAPI {
    static AGENTTYPE = '/agenttype';
    static AGENT = '/agent';
    static GAMEGROUP = '/gametype';
    static FAQ = '/faq';
    static COINPACK = '/coinpack';
    static LOYALTYPACK = '/loyalty';
    static SETTINGS = '/setting';
    static GAMES = '/game';
    static SLIDER = '/slider';
    static PERMISSIONS = '/permission';
    static MENU = '/menu';
    static MENUPERMISSIONS = '/menupermissions';
}

class SubRoutes {
    static LIST = '/list';
    static FILE = '/file';
}

export { API_URL, IMAGE_URL, InternalAPI, SubRoutes };
