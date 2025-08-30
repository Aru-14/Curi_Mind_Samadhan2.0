import { useState } from 'react'

function App() {


  const [inputText, setText] = useState("");
  const maxLength = 50;

  return (
    <>
   
    <div className="p-4 mt-10 max-w-xl mx-auto bg-blue-300 rounded-2xl">
      <input
      type='text'
        value={inputText}
        onChange={(e) => setText(e.target.value)}
        maxLength={maxLength}
        placeholder="Type something..."
        className="w-full p-2 outline-none shadow-2xl rounded-lg bg-white"
      />

  
      <div className="text-sm text-gray-700 mt-2">
        {inputText.length} of {maxLength} chars
      </div>
     
    </div>
     <div className='flex flex-col justify-center items-center'>
     <div className="mt-4 p-2  rounded-lg bg-gray-50 w-xl shadow-2xl">
        <strong className='text-blue-600'>Preview:</strong>
        <p className="mt-1 text-gray-400">{inputText || "Start writing to see preview...."}</p>
      </div>
      </div>
    </>
  )
}

export default App
