import { useState, useEffect } from 'react'


function App() {

  const [students, setStudents] = useState([]);

    useEffect(() => {
    fetch("http://localhost:5000/getStudents")   
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error("Error fetching students:", err));
  }, []);  


  return (
    <>
     



  

    <div className="p-4 flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold mb-4">Student's Directory</h2>
      <ul>
        {students.map(s => (
          <li key={s.rollNo} className="p-2 border">
           Roll No.: {s.rollNo}  {s.name} — {s.course}
          </li>
        ))}
      </ul>
    </div>
 

    </>
  )
}

export default App
