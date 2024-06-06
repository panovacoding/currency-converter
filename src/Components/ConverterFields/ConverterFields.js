import React, {useEffect, useState} from 'react'
import './ConverterFields.css'
import Select from 'react-select'
import options from '../../config/options'


export const ConverterFields = () => {
  const [rate, setRate] = useState('rub-usd');
  const [input, setInput] = useState('');
  const [currency, setCurrency] = useState({currency1: 'USD', currency2: 'EUR'})


  const getValue = (currency) => {
    return currency ? options.find(option => option.value === currency) : '';
  }

  const handleChange1 = (newValue) => {
    setCurrency({currency1: newValue.value, currency2: currency.currency2});
  }

  const handleChange2 = (newValue) => {
    setCurrency({currency1: currency.currency1, currency2: newValue.value});
  }

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  useEffect(() => {
    setRate(`${currency.currency1}-${currency.currency2}`);
  }, [currency])

  // useEffect(() => {
  //     const currency2 = currency.currency2.toUpperCase();
  //     fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_cZGb5t13PEXXhwrV4y9gesfkGkotgAItbKJXH7Xa&base_currency=${currency.currency1.toUpperCase()}`, )
  //         .then((res) => {
  //             if(res.ok) return res.json()
  //         })
  //         .then((data) => {
  //             setResult((+input * data.data[currency2]).toFixed(2));
  //         })
  // }, [input, rate]);

  const [result, setResult] = useState();

  const url = 'https://api.freecurrencyapi.com/v1/latest?'
  const apiKey = 'fca_live_cZGb5t13PEXXhwrV4y9gesfkGkotgAItbKJXH7Xa'

  useEffect(() => {
    if (input && rate) {
      const getCurrencies = async () => {
        try {
          const res = await fetch(`${url}apikey=${apiKey}&base_currency=${currency.currency1}`);
          const result =  await res.json();
          setResult(result.data);
        } catch (e) {
          console.log('Ошибка получения курса валют', e)
        }
      }
      getCurrencies();
    }

    // const currency2 = currency.currency2.toUpperCase();
    // const currencies = getCurrencies(currency.currency1.toUpperCase());

    // console.log(getCurrencies('RUB'))
    // setResult((+input * currencies.data[currency2]).toFixed(2));
  }, [input, rate]);

  console.log('result', result);

  return (
    <div className='converter-fields'>
      <input type='number' onChange={handleInputChange}/>
      <Select options={options} value={getValue(currency.currency1)} onChange={handleChange1}/>
      <Select options={options} value={getValue(currency.currency2)} onChange={handleChange2}/>
    </div>
  )
}
