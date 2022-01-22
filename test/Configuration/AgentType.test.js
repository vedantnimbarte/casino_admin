const puppeteer = require('puppeteer');
jest.setTimeout(30000);

describe('Agent Type Page', () => {
    beforeEach(async () => {
        await page.goto('http://localhost:3000/configuration/roles');
    });

    it('should open agent type page', async () => {
        const agentTypePageSelector = 'div.css-0>div>div>div>span';
        await page.waitForSelector(agentTypePageSelector);
        const agentTypePageTitle = await page.$eval(agentTypePageSelector, (el) => el.innerText);
        expect(agentTypePageTitle).toMatch('Agent Type');
    });

    it('should show add agent type button', async () => {
        const agentTypeBtn = await page.$eval('button[id=add-agent-type]', (el) => el.innerText);
        expect(agentTypeBtn).toMatch('Add Agent Type');
    });

    it('should show add agent type modal', async () => {
        const agentTypeBtn = await page.$('button[id=add-agent-type]');
        await agentTypeBtn.click();

        const agentTypeModalTitle = await page.$eval('button[type=submit]', (el) => el.innerText);
        expect(agentTypeModalTitle).toMatch('Submit');
    });

    it('should give error when input field is touched and not inserted data', async () => {
        const agentTypeBtn = await page.$('button[id=add-agent-type]');
        await agentTypeBtn.click();

        const nameField = await page.$('input[id=agent-name]');

        const submitBtn = await page.$('button[type=submit]');

        await nameField.click();
        await submitBtn.click();

        const nameError = await page.$eval('p[id=name-error]', (el) => el.innerText);

        expect(nameError).toMatch('Please enter the role name');
    });

    it('should create new agent type', async () => {
        const dropdownSelector =
            'body > div.MuiModal-root.css-bpw6f8-MuiModal-root > div.MuiGrid-root.MuiGrid-grid-xs-6.MuiGrid-grid-sm-6.MuiGrid-grid-md-6.MuiGrid-grid-lg-6.css-jf2p1o-MuiGrid-root > div > div.MuiCardContent-root.css-17pmaar-MuiCardContent-root > div > form > div:nth-child(2) > div > input';

        const agentTypeBtn = await page.$('button[id=add-agent-type]');
        await agentTypeBtn.click();

        await page.waitForTimeout(3000);
        const nameField = await page.$('input[id=agent-name]');
        await nameField.click();
        await page.keyboard.type('CASHIOR');

        await page.waitForSelector(dropdownSelector);
        await page.click(dropdownSelector);
        await page.click('#item0');
        await page.waitForTimeout(1000);
        await page.click('#description');
        await page.keyboard.type('I am cashior');

        await page.click('button[type=submit]');
        const alertEl = await page.waitForSelector('#alert');
        expect(alertEl).toMatch('Create Successfully');
    });

    it('should give duplicate entry error', async () => {
        const dropdownSelector =
            'body > div.MuiModal-root.css-bpw6f8-MuiModal-root > div.MuiGrid-root.MuiGrid-grid-xs-6.MuiGrid-grid-sm-6.MuiGrid-grid-md-6.MuiGrid-grid-lg-6.css-jf2p1o-MuiGrid-root > div > div.MuiCardContent-root.css-17pmaar-MuiCardContent-root > div > form > div:nth-child(2) > div > input';

        const agentTypeBtn = await page.$('button[id=add-agent-type]');
        await agentTypeBtn.click();

        await page.waitForTimeout(3000);
        const nameField = await page.$('input[id=agent-name]');
        await nameField.click();
        await page.keyboard.type('CASHIOR');

        await page.waitForSelector(dropdownSelector);
        await page.click(dropdownSelector);
        await page.click('#item0');
        await page.waitForTimeout(1000);
        await page.click('#description');
        await page.keyboard.type('I am cashior');

        await page.click('button[type=submit]');
        const alertEl = await page.waitForSelector('#alert');
        expect(alertEl).toMatch('Role-Name must be unique');
    });
});
