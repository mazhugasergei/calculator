import { useEffect } from "react"
import { useState } from "react"

function App() {
  const [isMountet, setIsMounted] = useState(false)
  const [currentNum, setCurrentNum] = useState(0)
  const [currentNumView, setCurrentNumView] = useState(0)
  const [currentExpression, setCurrentExpression] = useState(123)
  const [fractional, setFractional] = useState(false)
  const [negative, setNegative] = useState(false)


  // prevent useEffect on mount
  useEffect(()=>{
    setIsMounted(true)
  }, [])


  function edit(x){
    if(x == "."){
      if(!fractional){
        if(currentNum == 0) setCurrentNum(0 + x)
        else setCurrentNum(currentNum + x)
        setFractional(true)
      }
    }
    else if(x == "+-"){
      setCurrentNum((parseFloat(currentNum)*-1).toString())
      negative ? setNegative(false) : setNegative(true)
    }
    else{
      if(currentNum == 0) setCurrentNum(x)
      else setCurrentNum(currentNum + x)
    }
  }


  // format the value before output
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
      for(let i=0; i<l-fr_l; i++){
        if(negative && i==l-1) tmp = currentNum[l-1-fr_l-i] + tmp
        else if(i && !(i%3)) tmp = currentNum[l-1-fr_l-i] + "," + tmp
        else tmp = currentNum[l-1-fr_l-i] + tmp
      }
      setCurrentNumView(tmp)
    }
  }, [currentNum])


  useEffect(()=>{
    if(isMountet){
      // scroll to right if overflowing
      let scrollDiv = document.body.querySelectorAll('.calculator .display div')
      scrollDiv[1].scrollLeft = scrollDiv[1].scrollWidth
    }
  }, [currentNumView])


  function operation(x){
    //operations
  }


  function clear(){
    setFractional(false)
    setCurrentNum("0")
  }


  return (
    <div className="calculator">
      <div className="display">
        <div>{ currentExpression }</div>
        <div>{ currentNumView }</div>
      </div>
      <div className="numpad">
        <div className="button" onClick={clear}>AC</div>
        <div className="button" onClick={()=>{edit("+-")}}>±</div>
        <div className="button" onClick={()=>{operation("%")}}>%</div>
        <div className="button" onClick={()=>{operation("/")}}>÷</div>
        <div className="button" onClick={()=>{edit("7")}}>7</div>
        <div className="button" onClick={()=>{edit("8")}}>8</div>
        <div className="button" onClick={()=>{edit("9")}}>9</div>
        <div className="button" onClick={()=>{operation("*")}}>×</div>
        <div className="button" onClick={()=>{edit("4")}}>4</div>
        <div className="button" onClick={()=>{edit("5")}}>5</div>
        <div className="button" onClick={()=>{edit("6")}}>6</div>
        <div className="button" onClick={()=>{operation("-")}}>–</div>
        <div className="button" onClick={()=>{edit("1")}}>1</div>
        <div className="button" onClick={()=>{edit("2")}}>2</div>
        <div className="button" onClick={()=>{edit("3")}}>3</div>
        <div className="button" onClick={()=>{operation("+")}}>+</div>
        <div className="button">&lt;</div>
        <div className="button" onClick={()=>{edit(0)}}>0</div>
        <div className="button" onClick={()=>{edit(".")}}>.</div>
        <div className="button">=</div>
      </div>
    </div>
  )
}

export default App