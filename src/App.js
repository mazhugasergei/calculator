import { useEffect } from "react"
import { useState } from "react"

function App() {
  const [isMountet, setIsMounted] = useState(false)
  const [currentNum, setCurrentNum] = useState(0)
  const [currentNumView, setCurrentNumView] = useState(0)
  const [fractional, setFractional] = useState(false)
  const [currentExpression, setCurrentExpression] = useState(123)
  const [numTmp, setNumTmp] = useState("")

  function addDigit(x){
    if(x == "."){
      if(!fractional){
        if(!currentNum){
          setCurrentNum(0 + x)
        }
        else{
          setCurrentNum(currentNum + x)
        }
        setFractional(true)
      }
    }
    else if(x == "+-"){
      setCurrentNum(-currentNum)
    }
    else{
      if(!currentNum) setCurrentNum(x)
      else setCurrentNum(currentNum + x)
    }
  }

  useEffect(()=>{
    if(isMountet){
      setCurrentNumView(numTmp)
    }
  }, [numTmp])

  useEffect(()=>{
    if(isMountet){
      // add ","
      let tmp = ""
      let l = currentNum.length
      let fr_l = 0 //fractional part length (including ".")
      if(fractional){
        fr_l = l-currentNum.indexOf(".")
        for(let i=0; i<fr_l; i++) tmp = currentNum[l-1-i] + tmp
      }
      for(let i=fr_l, j=0; i<l; i++, j++){
        if(j && !(j%3)) tmp = currentNum[l-1-i] + "," + tmp
        else tmp = currentNum[l-1-i] + tmp
      }
      setNumTmp(tmp)
    }
  }, [currentNum])

  useEffect(()=>{
    if(isMountet){
      // scroll to right if overflowing
      let scrollDiv = document.body.querySelectorAll('.calculator .display div')
      scrollDiv[1].scrollLeft = scrollDiv[1].scrollWidth
    }
  }, [currentNumView])

  useEffect(()=>{
    setIsMounted(true)
  }, [])

  function operation(x){
    //operations
  }

  function reset(){
    setCurrentNum(0)
    setFractional(false)
  }

  return (
    <div className="calculator">
      <div className="display">
        <div>{ currentExpression }</div>
        <div>{ currentNumView }</div>
      </div>
      <div className="numpad">
        <div className="button" onClick={reset}>AC</div>
        <div className="button" onClick={()=>{addDigit("+-")}}>±</div>
        <div className="button" onClick={()=>{operation("%")}}>%</div>
        <div className="button" onClick={()=>{operation("/")}}>÷</div>
        <div className="button" onClick={()=>{addDigit("7")}}>7</div>
        <div className="button" onClick={()=>{addDigit("8")}}>8</div>
        <div className="button" onClick={()=>{addDigit("9")}}>9</div>
        <div className="button" onClick={()=>{operation("*")}}>×</div>
        <div className="button" onClick={()=>{addDigit("4")}}>4</div>
        <div className="button" onClick={()=>{addDigit("5")}}>5</div>
        <div className="button" onClick={()=>{addDigit("6")}}>6</div>
        <div className="button" onClick={()=>{operation("-")}}>–</div>
        <div className="button" onClick={()=>{addDigit("1")}}>1</div>
        <div className="button" onClick={()=>{addDigit("2")}}>2</div>
        <div className="button" onClick={()=>{addDigit("3")}}>3</div>
        <div className="button" onClick={()=>{operation("+")}}>+</div>
        <div className="button">&lt;</div>
        <div className="button" onClick={()=>{addDigit(0)}}>0</div>
        <div className="button" onClick={()=>{addDigit(".")}}>.</div>
        <div className="button">=</div>
      </div>
    </div>
  )
}

export default App