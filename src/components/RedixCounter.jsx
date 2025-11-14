import { useState } from "react"

const RadixCounter = () => {
 // getter , setter

    const [value, setValue] = useState(0)

    const minusClicked = () => {
        console.log('-')
        if (value <= 0) {
            setValue(4095)

        }else {
            setValue((p) => p - 1)
        }
      
    }
         const resetClicked = () => {
        console.log('reset')
            setValue(0)
         }
         const plusClicked = () => {
        console.log('+')
        if (value >= 4095) {
            setValue(0)
        }else {
            setValue((p) => p + 1)
        }

    }
    return (
        // container
        <div className="border border-3 border-black rounded-4 m-auto p-3 " 
        style={ {width: '400px'} }>
            {/* titile */}
            <h1 className="text-center fw-bold">RADIX COUTER</h1>
            {/* body */}
            <div className="d-flex justify-content-between text-center gap-3 mt-3">
                <div>
                    <div className="fs-4 fw-bold">[HEX]
                        <div className="fs-5 font-monospace text-primary fw-bold">{value.toString(16).toUpperCase().padStart(3, '0')}</div></div>
                    </div>
                <div>
                    <div className="fs-4 fw-bold">[DEC]
                        <div className="fs-5 font-monospace text-primary fw-bold">{value.toString(10).padStart(4, '0')}</div></div>
                    </div>
                <div>
                    <div className="fs-4 fw-bold">[OCT]
                        <div className="fs-5 font-monospace text-primary fw-bold">{value.toString(8).padStart(4, '0')}</div></div>
                    </div>
                <div>
                    <div className="fs-4 fw-bold">[BIN]
                        <div className="fs-5 font-monospace text-primary fw-bold">{value.toString(2).padStart(12, '0')}</div></div></div>
            </div>
            {/* button */}
            <div className="d-flex justify-content-center around mt-3">
                <button className="btn btn-danger px-4" onClick={() => {
                    minusClicked()}}>&minus;</button>
                <button className="btn btn-secondary px-4 " onClick={() => {
                    resetClicked()}}>RESET</button>
                <button className="btn btn-success px-4" onClick={() => {
                    plusClicked()}}>+</button>
            </div>

        </div>
    )
}
    
export default RadixCounter