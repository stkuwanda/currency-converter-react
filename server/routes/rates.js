const express = require('express');
const RatesData = require('../data');
const router = express.Router();

// @route  GET /
// @desc   Retrieve conversion rates
// @access Public
router.get('/', async (req, res) => {
  console.log(RatesData);
  try {
    let symbols = []; // collection of client selected convert-to currencies
    let specifiedRatesObject; // response data to client query

    // Make sure base and symbol query params exist
    if (req.query.base && req.query.symbols) {
      if (req.query.symbols.includes(',')) {
        symbols = req.query.symbols.split(',');
        console.log(symbols);
      } else {
        symbols.push(req.query.symbols);
        console.log(symbols);
      }

      // Make sure base currency is supported
      if (Object.keys(RatesData).includes(req.query.base)) {
        console.log('Code ran... with symbols:', symbols);

        // Selects specified currency rates for chosen base currency
        specifiedRatesObject = symbols.reduce(
          (acc, symbol) => {
            // Empty string check
            if (symbol) {
              return {
                ...acc,
                rates: {
                  ...acc.rates,
                  [symbol]: RatesData[req.query.base].rates[symbol],
                },
              };
            }
            return { ...acc };
          },
          { base: req.query.base, success: true, rates: {} }
        );

        res.status('200').json(specifiedRatesObject);
      }
    } else {
      res.status('200').json({
        success: 'true',
        base: 'USD',
        rates: RatesData.USD.rates,
      });
    }
  } catch (err) {
    console.log(err.errmsg);
    res.status(500).json({
      msg: err.errmsg ? err.errmsg : 'Something went awry.',
      result: 'error',
    });
  }
});

module.exports = router;
