import React, { useState, useEffect, useCallback } from "react";
import "./ConverterFields.css";
import Select from "react-select";
import { fetchData } from "../../config/data";
import { debounce, rateLimit } from "../../config/utils";

export const ConverterFields = ({ setResult }) => {
  const [input, setInput] = useState("");
  const [currency, setCurrency] = useState({ currency1: "RUB", currency2: "USD",});
  const [rate, setRate] = useState(1);
  const [options, setOptions] = useState([]);

  const getCurrencyValue =  (currency) => {
    return currency ? options.find((option) => option.value === currency) : "";
  };

  const changeBaseCurrency = (newValue) => {
    setCurrency({ ...currency, currency1: newValue.value });
  };

  const changeTargetCurrency = (newValue) => {
    setCurrency({ ...currency, currency2: newValue.value });
  };

  const debouncedSetInput = debounce((value) => setInput(value), 300);

  const handleInputChange = (e) => {
    debouncedSetInput(e.target.value);
  };

  const limitedFetchData = rateLimit(fetchData, 6000); // 10 requests per minute

  useEffect(() => {
    const targetCurrency = currency.currency2;
    const baseCurrency = currency.currency1;
    limitedFetchData(
      baseCurrency,
      targetCurrency,
      input,
      setResult,
      setRate,
      setOptions
    );
  }, [currency]);

  useEffect(() => {
    setResult(new Intl.NumberFormat("ru-RU").format((+input * rate).toFixed(2)));
  }, [input, rate, setResult]);


  return (
    <div className="converter-fields">
      <input type="text" onChange={handleInputChange} />
      <Select
        options={options}
        value={getCurrencyValue(currency.currency1)}
        onChange={changeBaseCurrency}
      />
      <Select
        options={options}
        value={getCurrencyValue(currency.currency2)}
        onChange={changeTargetCurrency}
      />
    </div>
  );
};