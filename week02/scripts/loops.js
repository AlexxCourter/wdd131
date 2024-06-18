const DAYS = 6;
const LIMIT = 30;
let studentReport = [11, 42, 33, 64, 29, 37, 44];

// Write a for loop that will iterate through the studentReport array and print to the console the current array value if it is below 30.
console.log("for loop:");
for(let i = 0; i < studentReport.length; i++){
    if(studentReport[i] < LIMIT){
        console.log(studentReport[i]);
    }
}

// Repeat the previous programming snippet by using a while loop.
console.log("while loop:");
let i = 0;
while(i < studentReport.length){
    if(studentReport[i] < LIMIT){
        console.log(studentReport[i]);
    }
    i++;
}

// Repeat the previous programming snippet by using a forEach loop.
console.log("forEach loop:");
studentReport.forEach(report => {
    if(report < LIMIT){
        console.log(report);
    }
});

// Repeat the previous programming snippet by using a for...in loop.
console.log("for...in loop:");
for(let i in studentReport){
    if(studentReport[i] < LIMIT){
        console.log(studentReport[i]);
    }
}

let today = new Date().getDay();
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
for(let i = 0; i < DAYS; i++){
    let day = today + i;
    if(day > 6){day = 0} //6 is the max index of weekdays
    console.log(weekdays[day]);
}