// components/Achievements.jsx
import React from "react";

const achievements = [
  {
    title: "Flipkart Grid 7.0 Shortlist",
    description: "Shortlisted for Flipkart Grid coding round based on strong DSA and project skills.",
    date: "July 2025",
  },
  {
    title: "100+ DSA Problems Solved",
    description: "Solved over 100 problems on LeetCode and GeeksforGeeks.",
    date: "June 2025",
  },
  {
    title: "Hackathon Winner",
    description: "Won 1st place in a college hackathon for a real-time collaboration project.",
    date: "May 2025",
  },
  {
    title: "AI Project Publication",
    description: "Developed AI-powered fitness tracker for yoga pose detection.",
    date: "March 2025",
  },
  {
    title: "Top 10 in Coding Contests",
    description: "Ranked in top 10 in multiple online coding contests.",
    date: "April 2025",
  },
];

function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 bg-gray-900 text-white">
      <h2 className="text-4xl font-extrabold text-center mb-12">Achievements</h2>

     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
  {achievements.map((ach, idx) => (
    <div
      key={idx}
      className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform relative"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-500 opacity-20 blur-xl z-0"></div>
      <div className="relative z-10 flex flex-col h-full">
        <h3 className="text-xl font-bold mb-2">{ach.title}</h3>
        <p className="text-gray-300 mb-4 flex-1">{ach.description}</p>
        <span className="text-sm text-purple-400">{ach.date}</span>
      </div>
    </div>
  ))}
</div>
    </section>
  );
}

export default Achievements;
