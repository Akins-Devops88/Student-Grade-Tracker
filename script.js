let students = [];

// Add Student
function addStudent() {
    let name = document.getElementById("name").value.trim();
    let grade = parseFloat(document.getElementById("grade").value);

    // Validation
    if (name === "") {
        alert("Student name cannot be empty");
        return;
    }

    if (isNaN(grade) || grade < 0 || grade > 100) {
        alert("Grade must be between 0 and 100");
        return;
    }

    let student = {
        id: Date.now(),
        name: name,
        grade: grade
    };

    students.push(student);
    saveToLocalStorage();
    renderStudents();

    document.getElementById("name").value = "";
    document.getElementById("grade").value = "";
}

// Delete Student
function deleteStudent(id) {
    students = students.filter(student => student.id !== id);
    saveToLocalStorage();
    renderStudents();
}

// Render Students
function renderStudents() {
    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    let avg = calculateAverage();

    students.forEach(student => {
        let row = document.createElement("tr");

        // Highlight above average
        if (student.grade > avg) {
            row.classList.add("above-average");
        }

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.grade}</td>
            <td><button onclick="deleteStudent(${student.id})">Delete</button></td>
        `;

        table.appendChild(row);
    });

    document.getElementById("average").textContent = avg.toFixed(2);
}

// Calculate Average
function calculateAverage() {
    if (students.length === 0) return 0;

    let total = students.reduce((sum, student) => sum + student.grade, 0);
    return total / students.length;
}

// Local Storage
function saveToLocalStorage() {
    localStorage.setItem("students", JSON.stringify(students));
}

function loadFromLocalStorage() {
    let data = localStorage.getItem("students");
    if (data) {
        students = JSON.parse(data);
        renderStudents();
    }
}

// Load data on page load
window.onload = loadFromLocalStorage;