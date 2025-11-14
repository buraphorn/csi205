import React, { useState, useEffect, useCallback } from 'react';

import './num.css';


export default function Calculator() {
  const [screen, setScreen] = useState("0");
  const [state, setState] = useState("50");
  const [lastOperator, setLastOperator] = useState("?");
  const [firstOperand, setFirstOperand] = useState(0);
  const [secondOperand, setSecondOperand] = useState(0);

  const updateHighlight = () => {
    const plusBtn = document.getElementById("plus");
    const minusBtn = document.getElementById("minus");
    if (!plusBtn || !minusBtn) return;
    plusBtn.classList.remove("cal-btn-orenge", "cal-btn-green");
    minusBtn.classList.remove("cal-btn-orenge", "cal-btn-green");
    plusBtn.classList.add("cal-btn-green");
    minusBtn.classList.add("cal-btn-green");

    if (lastOperator === "+") {
      plusBtn.classList.remove("cal-btn-green");
      plusBtn.classList.add("cal-btn-orenge");
    } else if (lastOperator === "-") {
      minusBtn.classList.remove("cal-btn-green");
      minusBtn.classList.add("cal-btn-orenge");
    }
  };

  useEffect(() => {
    updateHighlight();
  }, [lastOperator]);

  function numClicked(number) {
    if (state === "50") {
      setScreen(number.toString());
      setState("S1");
    } else if (state === "S1") {
      if (screen.length < 9) setScreen(screen + number.toString());
    }
  }

  function operatorClicked(op) {
    console.log(op);
    setLastOperator(op);
    setFirstOperand(Number(screen));
    setState("S2");
  }

  function equalClicked() {
    console.log("=");
    const current = Number(screen);
    let result = firstOperand;
    if (lastOperator === "+") result += current;
    else if (lastOperator === "-") result -= current;
    setScreen(result.toString());
    setState("50");
    setLastOperator("?");
  }

  function ceClicked() {
    setScreen("0");
    setState("50");
    setLastOperator("?");
    setFirstOperand(0);
    setSecondOperand(0);
  }

  function handleKeyboard(event) {
    if (event.key >= "0" && event.key <= "9") {
      numClicked(Number(event.key));
    } else if (event.key === "+" || event.key === "-") {
      operatorClicked(event.key);
    } else if (event.key === "=" || event.key === "Enter") {
      equalClicked();
    } else if (event.key === "Escape") {
      ceClicked();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  });

  return (
    <div className="text-center"style={{marginTop: "5px",height: "500px",backgroundImage: "url('./image/tower.gif')", backgroundSize: "cover",backgroundPosition: "center",}}>
        <h2 className="d-flex justify-content-center mt-2 text-light">Calculator</h2>
      <div className="cal-container">
        <div id="screen" className="cal-Display">
          {screen}
        </div>
        <div>
          <button className="cal-btn cal-btn-green" disabled>
            MC
          </button>
          <button className="cal-btn cal-btn-green" disabled>
            MR
          </button>
          <button className="cal-btn cal-btn-green" disabled>
            M+
          </button>
          <button className="cal-btn cal-btn-green" disabled>
            M-
          </button>
          <button className="cal-btn cal-btn-red" onClick={ceClicked}>
            CE
          </button>
        </div>
        <div>
          {[7, 8, 9].map((n) => (
            <button
              key={n}
              className="cal-btn cal-btn-blue"
              onClick={() => numClicked(n)}
            >
              {n}
            </button>
          ))}
          <button className="cal-btn cal-btn-green" disabled>
            ÷
          </button>
          <button className="cal-btn cal-btn-green" disabled>
            √
          </button>
        </div>
        <div>
          {[4, 5, 6].map((n) => (
            <button
              key={n}
              className="cal-btn cal-btn-blue"
              onClick={() => numClicked(n)}
            >
              {n}
            </button>
          ))}
          <button className="cal-btn cal-btn-green" disabled>
            ×
          </button>
          <button className="cal-btn cal-btn-green" disabled>
            %
          </button>
        </div>
        <div>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className="cal-btn cal-btn-blue"
              onClick={() => numClicked(n)}
            >
              {n}
            </button>
          ))}
          <button
            id="minus"
            className="cal-btn cal-btn-green"
            onClick={() => operatorClicked("-")}
          >
            −
          </button>
          <button className="cal-btn cal-btn-green" disabled>
            1/x
          </button>
        </div>
        <div>
          <button
            className="cal-btn cal-btn-blue"
            onClick={() => numClicked(0)}
          >
            0
          </button>
          <button className="cal-btn cal-btn-blue" disabled>
            .
          </button>
          <button className="cal-btn cal-btn-blue" disabled>
            +/-
          </button>
          <button
            id="plus"
            className="cal-btn cal-btn-green"
            onClick={() => operatorClicked("+")}
          >
            +
          </button>
          <button className="cal-btn cal-btn-green" onClick={equalClicked}>
            =
          </button>
          <div>บุรพร วันทอง 67167437</div>
        </div>
      </div>
    </div>
  );
}
