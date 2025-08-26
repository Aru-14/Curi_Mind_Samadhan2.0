// Student marks calculator 

let StuMarksArray=[
    {Science:24,English:45,Maths:50}, {Science:23,English:15,Maths:29}, {Science:44,English:49,Maths:50}
   
]

function calcTotal(MarksObj){
    let total=0;
for (let sub in MarksObj) {
  total+= MarksObj[sub]
}
return total;
}

function calcGrade(Marks){
    let grade;
if(Marks<10 && Marks>=0)
grade="D"
else if(Marks<20 && Marks>=10)
grade="C"
else if(Marks<30 && Marks>=20)
grade="B"
else if(Marks<50 && Marks>=30)
grade="A"

return grade;
}
let i=1;

StuMarksArray.forEach(MarksObj => {
    let total=calcTotal(MarksObj)
let grade= calcGrade(total/3)
  console.log( `Student ${i++} has achieved a grade of ${grade}`)  
});