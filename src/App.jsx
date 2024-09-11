import { useCallback, useEffect, useState,useRef } from 'react'

function App() {
  const [lenght,setLenght]=useState(8);
  const [numallow,setNumallow]=useState(false);
  const [charallow,setCharallow]=useState(false);
  const [password,setPassword]=useState("");
  //useRef hook
  const passwordRef=useRef(null);

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUNWXYZabcdefghijklmnopqrstuvwxyz"
    if(numallow) str+="0123456789"
    if(charallow) str+="!@#$%&"

    for(let i=1;i<=lenght;i++){
      let ind=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(ind)

    }
    setPassword(pass)
  },
  [lenght,numallow,charallow,password,setPassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,8);
           window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passwordGenerator();
  },[lenght,numallow,charallow])


  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 
    text-orange-500 bg-gray-800"> 
    <h1 className="text-white text-center my-3">Password Generator</h1>
    <div className="flex shadow
    rounded-lg overflow-hidden mb-4">
      <input 
      type="text" 
      value={password}
      className="outline-none w-full py-1 px-3"
      placeholder='password'
      readOnly
      ref={passwordRef}

       />
       <button
       onClick={copyPasswordToClipboard}
       className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">copy</button>

    </div>
    <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
        <input type="range"
        min={6}
        max={20}
        value={lenght}
        className="curser-pointer"
        onChange={(e)=>{setLenght(e.target.value)}}
        />
        <label>Lenght : {lenght}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input type="checkbox"
      defaultValue={numallow}
        id="numberInput"
        onChange={()=>{
          setNumallow((prev)=>!prev);
        }}
        />
        <label>Number</label>

        </div>
        <div className="flex items-center gap-x-1">
      <input type="checkbox"
      defaultValue={numallow}
        id="numberInput"
        onChange={()=>{
          setCharallow((prev)=>!prev);
        }}
        />
        <label>Character</label>

        </div>

    </div>
    
    </div>
    
    </>
  )
}

export default App
