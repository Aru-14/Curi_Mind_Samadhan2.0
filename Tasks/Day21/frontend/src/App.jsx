// App.jsx
import React from "react";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
// import Contact from "./components/Contact";

function App() {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 min-h-screen text-white font-sans">
      <Hero />
       <Projects />
     <Achievements />
      {/* <Contact /> */}
    </div>
  );
}

export default App;
