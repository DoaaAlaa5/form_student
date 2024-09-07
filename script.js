document.getElementById("studentForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    let studentName = document.getElementById("studentName").value.trim();
    let studentGrade = document.getElementById("studentGrade").value;
  
    // Validate name is not empty
    if (studentName === "") {
      alert("Student name cannot be empty.");
      return;
    }
  
    // Capitalize the first letter of the name
    studentName = studentName.charAt(0).toUpperCase() + studentName.slice(1);
  
    // Check if the name already exists in the table
    let existingStudents = Array.from(document.querySelectorAll("#studentTable tbody tr")).map(row => row.cells[0].innerText);
    if (existingStudents.includes(studentName)) {
      alert("Student name already exists in the table.");
      return;
    }
  
    // Validate grade
    if (studentGrade < 0 || studentGrade > 100) {
      alert("Grade should be between 0 and 100.");
      return;
    }
  
    // Add the new student to the table
    addStudentToTable(studentName, studentGrade);
  });
  
  function addStudentToTable(name, grade) {
    let table = document.querySelector("#studentTable tbody");
    let row = table.insertRow();
    row.insertCell(0).innerText = name;
    row.insertCell(1).innerText = grade;
  
    // Add a delete button
    let deleteCell = row.insertCell(2);
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function() {
      row.remove();
    });
    deleteCell.appendChild(deleteButton);
  }
  document.getElementById("filter").addEventListener("change", function() {
    let filterValue = this.value;
    let rows = document.querySelectorAll("#studentTable tbody tr");
  
    rows.forEach(row => {
      let grade = parseInt(row.cells[1].innerText);
      if (filterValue === "failed" && grade >= 60) {
        row.style.display = "none";
      } else if (filterValue === "success" && grade < 60) {
        row.style.display = "none";
      } else {
        row.style.display = "";
      }
    });
  });
  document.getElementById("sort").addEventListener("change", function() {
    let sortValue = this.value;
    let rows = Array.from(document.querySelectorAll("#studentTable tbody tr"));
  
    if (sortValue === "name") {
      rows.sort((a, b) => a.cells[0].innerText.localeCompare(b.cells[0].innerText));
    } else if (sortValue === "grade") {
      rows.sort((a, b) => parseInt(a.cells[1].innerText) - parseInt(b.cells[1].innerText));
    }
  
    let tbody = document.querySelector("#studentTable tbody");
    rows.forEach(row => tbody.appendChild(row));
  });