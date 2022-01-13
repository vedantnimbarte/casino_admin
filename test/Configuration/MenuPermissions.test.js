describe('Menu Permissions Page', () => {
    beforeEach(async () => {
        await page.goto('http://localhost:3000/configuration/menu-permissions');
    });

    it('should open menu permissions page', async () => {
        const menuPermissionsPageSelector = 'div.css-0>div>div>div>span';
        await page.waitForSelector(menuPermissionsPageSelector);
        const menuPermissionsPageTitle = await page.$eval(menuPermissionsPageSelector, (el) => el.innerText);
        expect(menuPermissionsPageTitle).toMatch('Menu Permissions');
    });
});
