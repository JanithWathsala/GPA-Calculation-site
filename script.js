let modules = [];

function addModule() {
    const moduleName = document.getElementById('moduleName').value;
    const moduleCredits = parseFloat(document.getElementById('moduleCredits').value);
    const moduleGrade = parseFloat(document.getElementById('moduleGrade').value);

    if (moduleName && !isNaN(moduleCredits) && !isNaN(moduleGrade)) {
        modules.push({ name: moduleName, credits: moduleCredits, grade: moduleGrade });
        updateModulesTable();
        calculateGPA();
    } else {
        alert('Please fill out all fields.');
    }
}

function updateModulesTable() {
    const tableBody = document.querySelector('#modulesTable tbody');
    tableBody.innerHTML = '';
    modules.forEach(module => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${module.name}</td><td>${module.credits}</td><td>${module.grade}</td>`;
        tableBody.appendChild(row);
    });
}

function calculateGPA() {
    let totalCredits = 0;
    let totalPoints = 0;
    modules.forEach(module => {
        totalCredits += module.credits;
        totalPoints += module.credits * module.grade;
    });

    const gpa = (totalPoints / totalCredits).toFixed(2);
    document.getElementById('gpa').innerText = `GPA: ${isNaN(gpa) ? 'N/A' : gpa}`;
}

async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const userName = document.getElementById('userName').value;
    if (!userName) {
        alert('Please enter your name.');
        return;
    }

    doc.text('GPA Report', 10, 10);
    doc.text(`Name: ${userName}`, 10, 20);
    let y = 40;

    modules.forEach(module => {
        doc.text(`${module.name} - Credits: ${module.credits}, Grade: ${module.grade}`, 10, y);
        y += 10;
    });

    const gpa = document.getElementById('gpa').innerText;
    doc.text(gpa, 10, y + 10);

    doc.save('GPA_Report.pdf');
}
