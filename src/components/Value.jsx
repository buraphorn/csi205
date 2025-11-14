import { useEffect } from "react"

const Value = ({ name, type, init, value, setValue }) => {

    useEffect(() => {
        if (init !== undefined) {
            setValue(init)
        }
    }, [init, setValue])

    return (
        <div className="border border-black border-2 rounded-3 m-auto mt-3" style={{width: 'fit-content'}}>
            <h1 className="text-center fw-bold m-3">{name || "VALUE"}</h1>
            <div className="d-flex justify-content-between align-items-center gap-2 mt-3 m-2">
                <button className="btn btn-danger px-3" onClick={() => setValue(value - 1)}>&minus;</button>
                <span className="fs-2f fx-bold">
                    {type === 'real' ? value.toFixed(2) : Math.round(value)}
                </span>
                <button className="btn btn-success px-3" onClick={() => setValue(value + 1)}>+</button>
            </div>
        </div>
    )
}

export default Value