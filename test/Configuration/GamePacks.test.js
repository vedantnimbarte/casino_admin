describe('Game Packs Page', () => {
    beforeEach(async () => {
        await page.goto('http://localhost:3000/configuration/game-pack');
    });

    it('should open game packs page', async () => {
        const gamePacksPageSelector = 'div.css-0>div>div>div>span';
        await page.waitForSelector(gamePacksPageSelector);
        const gamePacksPageTitle = await page.$eval(gamePacksPageSelector, (el) => el.innerText);
        expect(gamePacksPageTitle).toMatch('Game Packs');
    });

    it('should show game pack cards', async () => {
        const gamePackCardTitle = await page.$eval('p[id=game-pack-title]', (el) => el.innerText);
        expect(gamePackCardTitle).toMatch('Pack 1');
    });

    it('should show add game pack button', async () => {
        const gamePackBtn = await page.$eval('button[id=add-game-pack]', (el) => el.innerText);
        expect(gamePackBtn).toMatch('Add Game Pack');
    });

    it('should show add game pack modal', async () => {
        const gamePackBtn = await page.$('button[id=add-game-pack]');
        await gamePackBtn.click();

        const gamePackModalTitle = await page.$eval('button[type=submit]', (el) => el.innerText);
        expect(gamePackModalTitle).toMatch('Submit');
    });

    it('should give error when input field is touched and not inserted data', async () => {
        const gamePackBtn = await page.$('button[id=add-game-pack]');
        await gamePackBtn.click();

        const nameField = await page.$('input[id=name]');
        const coinsField = await page.$('input[id=coins]');
        const diamondsField = await page.$('input[id=diamonds]');
        const priceField = await page.$('input[id=price]');
        const gamePackModalTitle = await page.$('button[type=submit]');

        await nameField.click();
        await coinsField.click();
        await diamondsField.click();
        await priceField.click();
        await gamePackModalTitle.click();

        const nameError = await page.$eval('p[id=pack-name-error]', (el) => el.innerText);
        const coinsError = await page.$eval('p[id=coins-error]', (el) => el.innerText);
        const diamondsError = await page.$eval('p[id=diamonds-error]', (el) => el.innerText);
        const priceError = await page.$eval('p[id=price-error]', (el) => el.innerText);

        expect(nameError).toMatch('Please enter pack name');
        expect(coinsError).toMatch('Please enter coins amount');
        expect(diamondsError).toMatch('Please enter diamonds amount');
        expect(priceError).toMatch('Please enter price');
    });
});
