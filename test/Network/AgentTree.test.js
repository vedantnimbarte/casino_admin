describe('Agent Tree Page', () => {
    beforeEach(async () => {
        await page.goto('http://localhost:3000/network/agent-tree');
    });

    it('should load agent tree page', async () => {
        const agentTreePageSelector = 'div.css-0>div>div>div>span';
        await page.waitForSelector(agentTreePageSelector);
        const agentTreePageTitle = await page.$eval(agentTreePageSelector, (el) => el.innerText);
        expect(agentTreePageTitle).toMatch('Agent Tree');
    });

    it('should show agent tree table', async () => {
        const agentTreeTableTitleSelector = 'div.MUIDataTableToolbar-titleRoot-19>h6';
        await page.waitForSelector(agentTreeTableTitleSelector);

        const tableTitle = await page.$eval(agentTreeTableTitleSelector, (el) => el.innerText);
        expect(tableTitle).toMatch('Agent Types');
    });
});
