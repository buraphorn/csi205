import { useEffect, useState, useCallback } from "react"
import Value from "./Value"

const Temperatures = ({ name, initA, initB, initC }) => {

    const [a, setA] = useState(initA || 0)
    const [b, setB] = useState(initB || 32)
    const [c, setC] = useState(initC || 273.15)

    const CelsiusChange = useCallback((val) => {
        const numVal = parseFloat(val) || 0
        setA(numVal)
        setB((numVal * 9/5) + 32)
        setC(numVal + 273.15)
    }, [])

    const FahrenheitChange = useCallback((val) => {
        const numVal = parseFloat(val) || 0
        setB(numVal)
        setA((numVal - 32) * 5/9)
        setC(((numVal - 32) * 5/9) + 273.15)
    }, [])

    const KelvinChange = useCallback((val) => {
        const numVal = parseFloat(val) || 0
        setC(numVal)
        setA(numVal - 273.15)
        setB(((numVal - 273.15) * 9/5) + 32)
    }, [])

    useEffect(() => {
        if (initA !== undefined) {
            CelsiusChange(initA)
        }
    }, [initA, CelsiusChange])

    useEffect(() => {
        if (initB !== undefined) {
            FahrenheitChange(initB)
        }
    }, [initB, FahrenheitChange])

    useEffect(() => {
        if (initC !== undefined) {
            KelvinChange(initC)
        }
    }, [initC, KelvinChange])

    return (
        <div className="border border-black border-2 rounded-3 m-auto mt-3" style={{width: 'fit-content'}}>
            <h1 className="text-center fw-bold m-3">{name || "Temperaturer"}</h1>
            <div className='d-flex justify-content-between align-items-center gap-2 mt-3 m-2'>
                <span className='badge bg-primary fs-3'>{a.toFixed(2)} °C</span>
                <span className='badge bg-primary fs-3'>{b.toFixed(2)} °F</span>
                <span className='badge bg-primary fs-3'>{c.toFixed(2)} K</span>
            </div>
            <div className='d-flex gap-2 m-2'>
                <Value name={'Celsius'} value={a} type='real' setValue={CelsiusChange}/>
                <Value name={'Fahrenheit'} value={b} type='real' setValue={FahrenheitChange}/>
                <Value name={'Kelvin'} value={c} type='real' setValue={KelvinChange}/>
            </div>
        </div>
    )
}

export default Temperatures