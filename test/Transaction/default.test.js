describe('Transaction Page', () => {
    beforeEach(async () => {
        await page.goto('http://localhost:3000/transaction');
    });

    it('should load transaction page', async () => {
        const playerTxnTabSelector = 'button[id=playerTxnTab]';
        const agentTxnTabSelector = 'button[id=agentTxnTab]';

        const playerTxnTabTitle = await page.$eval(playerTxnTabSelector, (el) => el.innerText);
        const agentTxnTabTitle = await page.$eval(agentTxnTabSelector, (el) => el.innerText);

        expect(playerTxnTabTitle).toMatch('Player Transaction');
        expect(agentTxnTabTitle).toMatch('Agent Transaction');
    });
});
