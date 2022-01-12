describe('Permissions Page', () => {
    beforeEach(async () => [await page.goto('http://localhost:3000/configuration/permissions')]);

    it('should open permissions page', async () => {
        const permissionsPageTitleSelector = 'div.css-0>div>div>div>span';
        await page.waitForSelector(permissionsPageTitleSelector);
        const permissionsPageTitle = await page.$eval(permissionsPageTitleSelector, (el) => el.innerText);
        expect(permissionsPageTitle).toMatch('Permissions Allocated');
    });
});
