describe('Loyalty Points Page', () => {
    beforeEach(async () => {
        await page.goto('http://localhost:3000/configuration/loyalty-points');

        const addLoyaltyPointBtn = await page.$('button.css-1ln8qjd-MuiButtonBase-root-MuiButton-root');
        await addLoyaltyPointBtn.click();
    });

    it('should load loyalty points page', async () => {
        const loyaltyPointsPageTitleSelector = 'div.css-0>div>div>div>span';
        await page.waitForSelector(loyaltyPointsPageTitleSelector);
        const loyaltyPointsPageTitle = await page.$eval(loyaltyPointsPageTitleSelector, (el) => el.innerText);
        expect(loyaltyPointsPageTitle).toMatch('Loyalty Points');
    });

    it('should load open add loyalty points modal', async () => {
        const loyaltyLevelModalSelector = 'div[role=presentation]>div>div>div.css-1nvdc5e-MuiCardHeader-root>div>span';
        await page.waitForSelector(loyaltyLevelModalSelector);

        const loyaltyLevelModalTitle = await page.$eval(loyaltyLevelModalSelector, (el) => el.innerText);
        expect(loyaltyLevelModalTitle).toMatch('Add New Loyalty Level');
    });

    it('should validation errors on touching the input but not entering the data', async () => {
        const loyaltyLevelModalSelector = 'div[role=presentation]>div>div>div.css-1nvdc5e-MuiCardHeader-root>div>span';
        await page.waitForSelector(loyaltyLevelModalSelector);

        const levelField = await page.$('input[id=level]');
        const pointsNeededField = await page.$('input[id=points-needed]');
        const multiplierField = await page.$('input[id=multiplier]');
        const submitBtn = await page.$('button[type=submit]');

        await levelField.click();
        await pointsNeededField.click();
        await multiplierField.click();
        await submitBtn.click();

        const levelFieldError = await page.$eval('p[id=level-error]', (el) => el.innerText);
        expect(levelFieldError).toMatch('Please enter loyalty level');

        const pointsNeededFieldError = await page.$eval('p[id=pointsNeeded-error]', (el) => el.innerText);
        expect(pointsNeededFieldError).toMatch('Please enter points needed for loyalty level');

        const multiplierFieldError = await page.$eval('p[id=multiplier-error]', (el) => el.innerText);
        expect(multiplierFieldError).toMatch('Please enter multiplier for loyalty level');
    });

    it('should show calculations after entering points needed and multiplier', async () => {
        const loyaltyLevelModalSelector = 'div[role=presentation]>div>div>div.css-1nvdc5e-MuiCardHeader-root>div>span';
        await page.waitForSelector(loyaltyLevelModalSelector);

        const levelField = await page.$('input[id=level]');
        const pointsNeededField = await page.$('input[id=points-needed]');
        const multiplierField = await page.$('input[id=multiplier]');

        await levelField.click();
        await levelField.type('Newb');
        await pointsNeededField.click();
        await pointsNeededField.type('1000');
        await multiplierField.click();
        await multiplierField.type('2');

        const calculationsTitle = await page.$eval('p[id=calculations-title]', (el) => el.innerText);
        expect(calculationsTitle).toMatch('* CALCULATIONS AS PER ENTERED DATA *');
    });

    it('should disable the submit button until all fields are filled', async () => {
        const submitBtnDisabled = await page.$eval('button[type=submit]', (el) => el.disabled);
        expect(submitBtnDisabled).toBe(true);
    });
});
