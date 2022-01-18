describe('Players Page', () => {
    beforeEach(async () => {
        await page.goto('http://localhost:3000/player');
    });

    it('should load players page', async () => {
        const playersPageSelector = 'div.css-0>div>div>div>div>span';
        await page.waitForSelector(playersPageSelector);
        const playersPageTitle = await page.$eval(playersPageSelector, (el) => el.innerText);
        expect(playersPageTitle).toMatch('Players List');
    });

    it('should show add player button', async () => {
        const addPlayerBtn = await page.$eval('button[id=add-player-btn]', (el) => el.innerText);
        expect(addPlayerBtn).toMatch('Add Player');
    });

    it('should show add player modal', async () => {
        const addPlayerBtn = await page.$('button[id=add-player-btn]');
        await addPlayerBtn.click();

        const addPlayerModalTitle = await page.$eval('button[type=submit]', (el) => el.innerText);
        expect(addPlayerModalTitle).toMatch('Submit');
    });

    it('should give error when input field is touched and not inserted data', async () => {
        const addPlayerBtn = await page.$('button[id=add-player-btn]');
        await addPlayerBtn.click();

        const nameField = await page.$('input[id=name]');
        const usernameField = await page.$('input[id=username]');
        const emailField = await page.$('input[id=email]');
        const passwordField = await page.$('input[id=password]');
        const confirmPasswordField = await page.$('input[id=confirm_password]');
        const phoneNoField = await page.$('input[id=phone_no');

        await nameField.click();
        await usernameField.click();
        await emailField.click();
        await passwordField.click();
        await confirmPasswordField.click();
        await phoneNoField.click();
        await confirmPasswordField.click();

        const nameError = await page.$eval('p[id=name-error]', (el) => el.innerText);
        const usernameError = await page.$eval('p[id=username-error]', (el) => el.innerText);
        const emailError = await page.$eval('p[id=email-error]', (el) => el.innerText);
        const passwordError = await page.$eval('p[id=password-error]', (el) => el.innerText);
        const confirmPasswordError = await page.$eval('p[id=cpassword-error]', (el) => el.innerText);
        const phoneNoError = await page.$eval('p[id=phone_no-error]', (el) => el.innerText);

        expect(nameError).toMatch('Please enter your name');
        expect(usernameError).toMatch('please enter username');
        expect(emailError).toMatch('Please enter your email address');
        expect(passwordError).toMatch('Please enter the password');
        expect(confirmPasswordError).toMatch('Please enter the password');
        expect(phoneNoError).toMatch('Please enter phone number');
    });
});
