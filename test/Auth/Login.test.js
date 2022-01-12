describe('Login page test', () => {
    beforeEach(async () => {
        await page.goto('http://localhost:3000/');
    });

    it('should give email validation error', async () => {
        await page.click('input[name=email]');
        await page.type('input[name=email]', 'testingemail.com ');

        await page.click('input[type=password]');
        await page.type('input[type=password]', '123456789');

        await page.click('button[type=submit]');

        const el = await page.$eval('p[id=standard-weight-helper-text-email-login]', (text) => text.innerText);

        await expect(el).toMatch('Must be a valid email');
    });

    it('should login successfully', async () => {
        await page.click('input[name=email]');
        // await page.type('input[name=email]', 'testing@email.com');
        await page.click('input[type=password]');
        // await page.type('input[type=password]', '123456789');
        await page.click('button[type=submit]');
        const el = await page.$eval('p.css-102lq7w-MuiTypography-root', (text) => text.innerText);
        await expect(el).toMatch('Majestic Casino');
    });

    it('should email required error', async () => {
        const emailField = await page.$('input[name=email]');
        await emailField.click({ clickCount: 3 });
        await page.keyboard.press('Backspace');
        await page.click('button[type=submit]');
        const emailError = await page.$eval('p[id=standard-weight-helper-text-email-login]', (el) => el.innerText);
        await expect(emailError).toMatch('Email is required');
    });

    it('should password required error', async () => {
        const passwordField = await page.$('input[type=password');

        await passwordField.click({ clickCount: 3 });
        await page.keyboard.press('Backspace');

        await page.click('button[type=submit]');

        const passwordError = await page.$eval('p[id=standard-weight-helper-text-password-login]', (el) => el.innerText);

        await expect(passwordError).toMatch('Password is required');
    });

    it('should email and password required error', async () => {
        const emailField = await page.$('input[name=email]');
        const passwordField = await page.$('input[type=password');

        await emailField.click({ clickCount: 3 });
        await page.keyboard.press('Backspace');
        await passwordField.click({ clickCount: 3 });
        await page.keyboard.press('Backspace');
        await page.click('button[type=submit]');

        const emailError = await page.$eval('p[id=standard-weight-helper-text-email-login]', (el) => el.innerText);
        const passwordError = await page.$eval('p[id=standard-weight-helper-text-password-login]', (el) => el.innerText);

        await expect(emailError).toMatch('Email is required');
        await expect(passwordError).toMatch('Password is required');
    });
});
