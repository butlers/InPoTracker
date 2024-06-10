const assert = require('assert');
const generateFinanceTerms = require('../services/generateFinanceTerms');

describe('Generate Finance Terms', () => {
    // Test to ensure proper calculations of fields
    it('should return a single finance term with correct values', () => {
        const policies = [
            {
                premium: 200,
                taxFee: 50,
                insuredName: "Sam Butler",
                policyName: "Policy A"
            },
            {
                premium: 300,
                taxFee: 50,
                insuredName: "Sam Butler",
                policyName: "Policy B"
            }
        ];
        const dueDate = "2028-06-09T10:20:30Z";

        const financeTerms = generateFinanceTerms(policies, dueDate);

        assert.strictEqual(financeTerms.length, 1);
        assert.strictEqual(financeTerms[0].downPayment, 200); // Ensure correct down payment
        assert.strictEqual(financeTerms[0].amountFinanced, 400); // Ensure correct amount financed
        assert.strictEqual(financeTerms[0].dueDate, dueDate); // Ensure correct due date
        assert.strictEqual(financeTerms[0].status, 'PENDING'); // Ensure default status
    });

    // Test to ensure an error is thrown when missing required fields
    it('should throw an error when missing required fields', () => {
        const policies = [
            {
                premium: 200,
                taxFee: 50,
                // Missing insuredName and policyName
            },
            {
                premium: 300,
                taxFee: 50,
                insuredName: "Sam Butler",
                policyName: "Policy B"
            }
        ];
        const dueDate = "2028-06-09T10:20:30Z";

        assert.rejects(() => generateFinanceTerms(policies, dueDate), {
            name: 'ValidationError',
            message: /required/
        });
    });
});
