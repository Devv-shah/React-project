import { useState, useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
    
  const  [length, setLength] = useState(6)

  const [numberAllowed, setNumberAllowed] = useState(false);
  
  const [charAllowed, setCharAllowed] = useState(false);

  const [Password, setPassword] = useState("")

  // Useref hook
  const passwordRef = useRef(null)

  const passwordGenrator = useCallback(()=> {
    let pass = ""
    let str = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi odio minus tempora nam repellat fuga eius culpa reiciendis, dolorem ea optio delectus" 
  
    if(numberAllowed) 
    {
       str += "0123456789"
    }

    if(charAllowed) 
      {
         str += "!@#$%^&*(){}[]`''./|\|"
      }

      for(let i=0; i<=length; i++)
      {
        let char = (Math.random() * str.length + 1)
        pass += str.charAt(char)
      }

      setPassword(pass)

    }, [length, numberAllowed, charAllowed, setPassword])

    const copyPasswordToClipboard = useCallback(()=>{
      passwordRef.current?.select();
      // passwordRef.current?.setSelectionRange(0,20)
      window.navigator.clipboard.writeText(Password)
    },[Password])

    useEffect(() => {passwordGenrator()}, [length,numberAllowed, charAllowed, passwordGenrator])    
 
  return (
    <>
      <div className="w-full max-w-2xl mx-80 shadow-md rounded-lg px-44 my-8 text-cyan-300 font-extrabold bg-gray-500">
        <h1 className='text-red-700 text-center my-3'>Password Genrator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 w-80">
          <input type='text'
          value={Password}
          className='py-4 px-16 w-full bg-white text-center '
          placeholder='   Password'
          readOnly
          ref = {passwordRef}
          />
          <button 
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-950 text-white px-3 py-0.5 shrink-0 rounded-none'>Copy</button>
                  
        </div>

      <div className="flex text-sm gap-x-2">
          <div className="felx items-center gap-x-1">
            <input type="range"
            min={6}
            max={100}
            value={length} 
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
           <label className='text-orange-400'>Length : {length}</label>
          </div>
          

          <div className="flex items-center gap-x-1 mb-9">
            <input type="checkbox"
            defaultChecked = {numberAllowed} 
            id='numberInput'
            onChange={()=> {
              setNumberAllowed((prev) => !prev);
            }}
            />
            <label htmlFor="numberInput" className='text-orange-400'>Numbers</label>
          </div>

          <div className="flex items-center gap-x-1 mb-9">
            <input type="checkbox"
            defaultChecked = {numberAllowed} 
            id='numberInput'
            onChange={()=> {
              setCharAllowed((prev) => !prev);
            }}
            />
            <label htmlFor="numberInput" className='text-orange-400'>Characters</label>
          </div>

      </div>

      </div>
    </>
  )
}

export default App
