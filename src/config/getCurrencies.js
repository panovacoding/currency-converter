
const url = 'https://api.freecurrencyapi.com/v1/latest?'
const apiKey = 'fca_live_cZGb5t13PEXXhwrV4y9gesfkGkotgAItbKJXH7Xa'

export const getCurrencies = async (baseCurrency) => {
    try {
        const res = await fetch(`${url}apikey=${apiKey}&base_currency=${baseCurrency}`);
        const result = await res.json()
        console.log('result', result);
        return result;
    } catch (e) {
        console.log('Ошибка получения курса валют', e)
    }
}

