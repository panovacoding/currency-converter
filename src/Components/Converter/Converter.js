import React, { useState } from 'react'
import './Converter.css'
import { Heading } from './../Heading/Heading'
import { ConverterFields } from './../ConverterFields/ConverterFields'

export const Converter = () => {

    const [result, setResult] = useState('');
    
    return (
        <div className='converter'>
            <Heading title={'Конвертер валют'} />
            <ConverterFields setResult={setResult} />
            <div className='converter__result'>Результат: {result}</div>
        </div>
    )
}
