import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import './App.css';

function App() {

  const options = [
    {
      value: 'rub',
      label: 'RUB'
    },
    {
      value: 'usd',
      label: 'USD'
    },
    {
      value: 'eur',
      label: 'EUR'
    },
  ]

  const [value1, setValue1] = useState('rub');
  const [value2, setValue2] = useState('usd');
  const [rate, setRate] = useState('rub-usd');
  const [result, setResult] = useState('');
  const [input, setInput] = useState('');


  const getValue = (value) => {
    return value ? options.find(option => option.value === value) : '';
  }

  const handleChange1 = (newValue) => {
    setValue1(newValue.value);
  }

  const handleChange2 = (newValue) => {
    setValue2(newValue.value);
  }

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  useEffect(() => {
    setRate(`${value1}-${value2}`);
  }, [value1, value2])
  
  useEffect(() => {
    const rates = {
      'rub-usd': 0.011189,
      'usd-rub': 89.38,
      'rub-eur': 0.010323,
      'eur-rub': 96.87,
      'usd-eur': 0.91853,
      'eur-usd': 1.09,
      'rub-rub': 1,
      'usd-usd': 1,
      'eur-eur': 1
    };
    setResult((+input * rates[rate]).toFixed(2));
  }, [input, rate]);

  return (
    <div className="App">
      <h1>Конвертер валют</h1>

      <div className='App__inner'>
        <input type='number' onChange={handleInputChange}/>
        <Select options={options} value={getValue(value1)} onChange={handleChange1}/>
        <Select options={options} value={getValue(value2)} onChange={handleChange2}/>
      </div>

      <div className='App__result'>Результат: {result}</div>

    </div>
  );
}

export default App;
