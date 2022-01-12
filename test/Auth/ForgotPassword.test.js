describe('Forgot Password Form', () => {
    beforeEach(async () => {
        await page.goto('http://localhost:3000/forget-password');
    });
    it('Should give email required error', async () => {
        const emailField = await page.$('input[name=email]');
        const submitBtn = await page.$('button[type=submit]');
        await emailField.click({ clickCount: 3 });
        await page.keyboard.press('Backspace');
        await submitBtn.click();
        const emailError = await page.$eval('p[id=standard-weight-helper-text-email-login]', (el) => el.innerText);
        expect(emailError).toMatch('Email is required');
    });

    it('Should successfully send email', async () => {
        const emailField = await page.$('input[name=email]');
        const submitBtn = await page.$('button[type=submit]');
        // await emailField.type('sample@email.com');
        await submitBtn.click();
    });

    it('Should redirect to login page', async () => {
        const goToLoginBtn = await page.$('a.css-h66x2s-MuiTypography-root');
        await goToLoginBtn.click();
        await page.waitForSelector('h6.css-1h9fw24-MuiTypography-root');
        const loginPageText = await page.$eval('h6.css-1h9fw24-MuiTypography-root', (el) => el.innerText);
        await expect(loginPageText).toMatch('Sign in with Email address');
    });
});
