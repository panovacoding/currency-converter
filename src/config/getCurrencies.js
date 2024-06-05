export const getCurrencies = (baseCurrency) => {
    const currencies = fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_cZGb5t13PEXXhwrV4y9gesfkGkotgAItbKJXH7Xa&base_currency=${baseCurrency}`)
    .then((res) => {
        if(res.ok) return res.json()
    })
    .then((data) => {
        console.log(data.data)
        return data
    })

    console.log(currencies)
    return currencies
}

