const API_URL = "http://localhost:3000/students";

async function loadStudents() {
    const response = await fetch(API_URL);
    const students = await response.json();

    const container = document.getElementById("students");
    container.innerHTML = "";

    students.forEach(student => {
        container.innerHTML += `
            <div class="student">
                <h3>${student.name}</h3>
                <p>${student.course}</p>
            </div>
        `;
    });
}

async function addStudent() {

    const name = document.getElementById("name").value;
    const course = document.getElementById("course").value;

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            course
        })
    });

    loadStudents();
}