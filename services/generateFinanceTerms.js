const generateFinanceTerms = (policies, dueDate) => {
    let totalPremium = 0;
    let totalTaxFee = 0;

    policies.forEach(policy => {
        totalPremium += policy.premium;
        totalTaxFee += policy.taxFee;
    });

    const downPayment = (totalPremium * 0.20) + totalTaxFee;
    const amountFinanced = totalPremium + totalTaxFee - downPayment;

    const financeTerm = {
        downPayment: downPayment,
        amountFinanced: amountFinanced,
        dueDate: dueDate,
        policyName: policies.map(policy => policy.policyName).join(', '),
        insuredName: policies.map(policy => policy.insuredName).join(', '),
        status: 'PENDING'
    };

    return [financeTerm];
};

module.exports = generateFinanceTerms;
