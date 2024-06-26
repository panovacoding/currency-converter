import React, { useState } from 'react'
import './Converter.css'
import { Heading } from './../Heading/Heading'
import { ConverterFields } from './../ConverterFields/ConverterFields'

export const Converter = () => {

    const [result, setResult] = useState('');
    const setResultToNode = (val, curr) => {
        setResult(`${val} ${curr}`)
    }
    
    return (
        <div className='converter'>
            <Heading title={'Конвертер валют'} />
            <ConverterFields setResult={setResultToNode} />
            <div className='converter__result'>Результат: {result}</div>
        </div>
    )
}
