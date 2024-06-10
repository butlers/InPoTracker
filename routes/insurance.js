const express = require('express');
const router = express.Router();
const FinanceTerms = require('../models/financeTerms');
const generateFinanceTerms = require('../services/generateFinanceTerms');
const { validateRequest } = require('../middleware/validation');
const generateFinanceTermsSchema = require('../interfaces/generateFinanceTerms.schema')

// Generate finance terms
router.post('/generateFinanceTerms', validateRequest(generateFinanceTermsSchema), async (req, res) => {
    try {
        const { policies, dueDate } = req.body;
        const generatedTerms = await generateFinanceTerms(policies, dueDate);

        const savedFinanceTerms = await Promise.all(generatedTerms.map(async term => {
            const financeTerm = new FinanceTerms(term);
            return financeTerm.save();
        }));

        res.status(200).json({ financeTerms: savedFinanceTerms });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Agree to finance terms
router.post('/agree-to-terms/:id', async (req, res) => {
    try {
        const financeTerm = await FinanceTerms.findByIdAndUpdate(req.params.id, { status: 'AGREED' }, { new: true });
        if (!financeTerm) {
            return res.status(404).json({ message: 'Finance term not found' });
        }
        res.status(200).json({ message: 'Finance term agreed to successfully', financeTerm });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Filter and sort finance terms
router.get('/finance-terms', async (req, res) => {
    try {
        let filteredTerms = await FinanceTerms.find();

        if (req.query.downpaymentOperator && req.query.downpaymentAmount) {
            const { downpaymentOperator, downpaymentAmount } = req.query;
            filteredTerms = filteredTerms.filter(term => {
                if (downpaymentOperator === 'gt') return term.downPayment > downpaymentAmount;
                if (downpaymentOperator === 'lt') return term.downPayment < downpaymentAmount;
                if (downpaymentOperator === 'eq') return term.downPayment === downpaymentAmount;
            });
        }

        if (req.query.status) {
            const statusValue = req.query.status.toUpperCase();
            filteredTerms = filteredTerms.filter(term => term.status === statusValue);
        }

        if (req.query.sortBy && req.query.order) {
            const { sortBy, order } = req.query;
            if (sortBy === 'downPayment') {
                filteredTerms.sort((a, b) => order === 'asc' ? a.downPayment - b.downPayment : b.downPayment - a.downPayment);
            } else if (sortBy === 'dueDate') {
                filteredTerms.sort((a, b) => order === 'asc' ? new Date(a.dueDate) - new Date(b.dueDate) : new Date(b.dueDate) - new Date(a.dueDate));
            }
        }

        res.json(filteredTerms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete all finance terms (Used for local testing)
router.delete('/delete-all-finance-terms', async (req, res) => {
    try {
        await FinanceTerms.deleteMany({});
        res.status(200).json({ message: 'All entries deleted from the FinanceTerm table' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
