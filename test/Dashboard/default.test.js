describe('dashboard', () => {
    beforeEach(async () => {
        await page.goto('http://localhost:3000/dashboard');
    });

    it('should show create player modal after click on create player button', async () => {
        const createPlayerButton = await page.$('button[type=button]>p.css-102lq7w-MuiTypography-root');
        await createPlayerButton.click();

        const newPlayerModalSelector = 'div[role=presentation]>div>div>div.css-1nvdc5e-MuiCardHeader-root>div>span';
        await page.waitForSelector(newPlayerModalSelector);

        const playerModalTitle = await page.$eval(newPlayerModalSelector, (el) => el.innerText);
        expect(playerModalTitle).toMatch('Add New Player');
    });
});
