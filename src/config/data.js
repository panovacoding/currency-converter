export const fetchData = async (baseCurrency, currency2, input, setResult, setRate, setOptions) => {
    const url = "https://api.freecurrencyapi.com/v1/latest?";
    const apiKey = "fca_live_cZGb5t13PEXXhwrV4y9gesfkGkotgAItbKJXH7Xa";
    try {
      const res = await fetch(
        `${url}apikey=${apiKey}` + (baseCurrency ? `&base_currency=${baseCurrency}` : '')
      );
      if(res.ok && setRate && setResult) {
        const result = await res.json();
        setResult((+input * result.data[currency2]).toFixed(2));
        setRate(result.data[currency2]);
        const currencies = Object.keys(result.data);
        const options = currencies.map((el) => ({value: el, label: el}))
        setOptions(options);
      }
    } catch (e) {
      console.log("Ошибка получения курса валют", e);
    }
  };