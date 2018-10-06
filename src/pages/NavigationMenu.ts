import Login from './Login';
import Checkboxes from './Checkboxes';
import HoversPage from './HoversPage';

const config = require('../config/config.json');
const selectors = require('../selectors/navMenu.json');

const baseURL = config.baseURL;

export default class NavigationMenu {
    page: any;
    constructor(page) {
        this.page = page;
    }

    async loadNavigationMenu() : Promise<void> {
        await this.page.goto(baseURL);
        await this.page.waitFor(selectors.defaultPresenceLocator);
    }

    async loadFormAuthenticationPage() : Promise<Login> {
        const url:string = `${baseURL}${config.login}`;
        await this.page.goto(url);
        return new Login(this.page);
    }

    async getNumberOfLinks() : Promise<number> {
        /*
        Do not chain the commands togther, otherwise an empty set will be returned,
        e.g. await this.page.$$(selectors.navLinks).length returns [0]
        while the below code returns an integer greater than zero.
        */
        return await this.page.$$(selectors.navLinks).then(e => e.length);
    }

    async loadCheckboxesPage() : Promise<Checkboxes> {
        const url:string = `${baseURL}${config.checkboxes}`;
        await this.page.goto(url);
        return new Checkboxes(this.page);
    }

    async loadHoversPage() : Promise<HoversPage> {
        const url = `${baseURL}${config.hovers}`;
        await this.page.goto(url);
        return new HoversPage(this.page);
    }
}
