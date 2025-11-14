import { useState , useEffect , useRef} from 'react'

const Timer = () => {
    
    const [second, setsecond] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const timerRef = useRef(null)

    useEffect(() => {
        return () => clearInterval(timerRef.current) 
    }, [])
    const Reset = () => {
        clearInterval(timerRef.current)
        setsecond(0)
        setIsRunning(false)
    }

    const Run = () => {
       if (isRunning) return 
        setIsRunning(true)
        timerRef.current = setInterval(() => {
            setsecond(prev => prev + 1) 
        }, 1000)
    }

    const toTimeString = (s) => {
        const MINUTE_SECONDS = 60
        const HOUR_SECONDS = 60 * MINUTE_SECONDS
        const DAY_SECONDS = 24 * HOUR_SECONDS


        const day = Math.floor(s / DAY_SECONDS);
        const hr = Math.floor((s % DAY_SECONDS) / HOUR_SECONDS);
        const min = Math.floor((s % HOUR_SECONDS) / MINUTE_SECONDS)
        const sec = s % MINUTE_SECONDS

        return  day + 'day' + hr + 'hr' + min + 'm' + sec + 's'
    }

    return (
        <div className='border border-black border-2 rounded-3 m-auto mt-3 text-center fw-bold ' style={{width: 'fit-content'}}>
            <h1 className='text-center fw-bold m-3 '>Timer</h1>
            <div className='border border-2 border-black rounded-4 m-3 p-3'>{ toTimeString(second)}</div>
            <div className='d-flex justify-content-between gap-2 m-2'>
                <button className='btn btn-danger px-4' onClick={Reset}>Reset</button>
                <button className='btn btn-success px-4' onClick={Run}>Run</button>
            </div>
        </div>
    )
}

export default Timer