import { useEffect } from "react"
import { useState } from "react"

function App() {
  const [isMountet, setIsMounted] = useState(false)
  const [currentNum, setCurrentNum] = useState(0)
  const [currentNumView, setCurrentNumView] = useState(0)
  const [currentExpression, setCurrentExpression] = useState("")
  const [currentExpressionView, setCurrentExpressionView] = useState()


  // prevent useEffect on mount
  useEffect(()=>{
    setIsMounted(true)
  }, [])


  function edit(x){
    if(x == "."){
      if(currentNum == 0) setCurrentNum(0 + x)
      else setCurrentNum(currentNum + x)
    }
    else if(x == "+-"){
      setCurrentNum((parseFloat(currentNum)*-1).toString())
    }
    else{
      if(currentNum == 0 && currentNum !== "0.") setCurrentNum(x)
      else setCurrentNum(currentNum + x)
    }
  }


  // add ","
  function toNumView(num){
    let tmp = ""
    let l = num.length
    let fr_l = 0 //fractional part length (including ".")
    if(num.indexOf(".") > -1) fr_l = l-num.indexOf(".")
    for(let i=0; i<fr_l; i++) tmp = num[l-1-i] + tmp
    for(let i=0; i<l-fr_l; i++){
      if(num<0 && i==l-1) tmp = num[l-1-fr_l-i] + tmp
      else if(i && !(i%3)) tmp = num[l-1-fr_l-i] + "," + tmp
      else tmp = num[l-1-fr_l-i] + tmp
    }
    return tmp
  }


  // format the value before output
  useEffect(()=>{
    if(isMountet){
      setCurrentNumView(toNumView(currentNum.toString()))
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
    // if clicked "<"
    if(x == "<"){
      if(currentNum.length > 1) setCurrentNum(currentNum.substring(0, currentNum.length-1))
      else setCurrentNum(0)
    }
    // if clicked the same operator, do nothing
    else if(currentExpression.length && currentExpressionView[currentExpressionView.length-1] == x) return
    // if clicked "="
    else if(x == "=" && currentExpression.length){
      setCurrentExpression(currentExpression + currentNum)
      setCurrentExpressionView(currentExpressionView + " " + toNumView(currentNum) + " =")
      let tmp = eval(currentExpression + currentNum)
      setCurrentNum("")
      setTimeout(()=>{setCurrentNumView(toNumView(tmp.toString()))}, 1)
    }
    // if clicked an operator and right after that clicked another one, change the operator
    else if(!currentNum.length && isNaN(currentExpression[currentExpression.length-1])){
      setCurrentExpression(currentExpression.substring(0, currentExpression.length-1) + x)
      setCurrentExpressionView(currentExpressionView.substring(0, currentExpressionView.length-1) + x)
    }
    else{
      let calculated = eval(currentExpression + currentNum)
      setCurrentExpression(calculated + x)
      calculated = toNumView(calculated.toString())
      setCurrentExpressionView(calculated + " " + (x=="*" ? "×" : x=="/" ? "÷" : x))
      // currentNumView to disappear only when entering a new num
      let tmp = currentNumView
      setCurrentNum(0)
      setTimeout(()=>{setCurrentNumView(tmp)}, 1)
    }
  }


  function clear(){
    setCurrentNum("0")
    setCurrentExpression("")
    setCurrentExpressionView("")
  }


  return (
    <div className="calculator">
      {/* <div>currentExpression: { currentExpression }</div>
      <div>currentNum: { currentNum }</div> */}
      <div className="display">
        <div>{ currentExpressionView }</div>
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
        <div className="button" onClick={()=>{operation("<")}}>&lt;</div>
        <div className="button" onClick={()=>{edit(0)}}>0</div>
        <div className="button" onClick={()=>{edit(".")}}>.</div>
        <div className="button" onClick={()=>{operation("=")}}>=</div>
      </div>
    </div>
  )
}

export default App