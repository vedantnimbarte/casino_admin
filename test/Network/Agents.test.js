describe('Agents Page', () => {
    beforeEach(async () => {
        await page.goto('http://localhost:3000/network/agents');
    });

    it('should load agents page', async () => {
        const agentsPageSelector = 'div.css-0>div>div>div>div>span';
        await page.waitForSelector(agentsPageSelector);
        const agentsPageTitle = await page.$eval(agentsPageSelector, (el) => el.innerText);
        expect(agentsPageTitle).toMatch('Agents List');
    });
});
