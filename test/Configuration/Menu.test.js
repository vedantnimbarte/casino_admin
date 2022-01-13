describe('Menu Page', () => {
    beforeEach(async () => {
        await page.goto('http://localhost:3000/configuration/menu');
    });

    it('should open menu page', async () => {
        const menuPageSelector = 'div.css-0>div>div>div>span';
        await page.waitForSelector(menuPageSelector);
        const menuPageTitle = await page.$eval(menuPageSelector, (el) => el.innerText);
        expect(menuPageTitle).toMatch('Menu Items');
    });
});
