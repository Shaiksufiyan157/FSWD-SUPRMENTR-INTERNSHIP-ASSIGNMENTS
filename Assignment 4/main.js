// 1. Data Structure: Array of Student Objects
const students = [
    { name: "Arjun", marks: [85, 90, 78, 92, 88] },
    { name: "Sara", marks: [95, 88, 91, 84, 90] },
    { name: "Leo", marks: [70, 75, 80, 65, 72] },
    { name: "Meera", marks: [88, 92, 95, 89, 94] }
];

// 2. Function to Calculate Average
function calculateAverage(marks) {
    const sum = marks.reduce((acc, curr) => acc + curr, 0);
    return (sum / marks.length).toFixed(2);
}

// 3. Processing and Output
console.log("--- Student Performance Report ---");

students.forEach(student => {
    const avg = calculateAverage(student.marks);
    console.log(`Student: ${student.name} | Average: ${avg}%`);
});

// 4. Finding the Top Scorer
const topScorer = students.reduce((prev, current) => {
    return (calculateAverage(prev.marks) > calculateAverage(current.marks)) ? prev : current;
});

console.log("----------------------------------");
console.log(`Top Performer: ${topScorer.name} with an average of ${calculateAverage(topScorer.marks)}%`);