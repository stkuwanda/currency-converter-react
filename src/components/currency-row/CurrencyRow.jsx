import React from 'react';

const CurrencyRow = ({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  amount,
  onChangeAmount,
}) => {
  return (
    <div className='currency-row'>
      <input type='number' value={amount} onChange={onChangeAmount} />

      <select value={selectedCurrency} onChange={onChangeCurrency} className='minimal'>
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyRow;
