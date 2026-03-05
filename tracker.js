import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// DOM references
const addProjectBtn = document.getElementById("addProjectBtn");
const projectTableBody = document.querySelector("#projectTable tbody");

onAuthStateChanged(auth, user => 
{
  if (!user) 
  {
    window.location.href = "index.html"; // redirect to login
  } 
  else 
  {
    subscribeProjects();
  }
});

// Add project to Firestore
addProjectBtn.addEventListener("click", async () => {
  const projectData = {
    projectName: document.getElementById("projectName").value,
    processName: document.getElementById("processName").value,
    processOwner: document.getElementById("processOwner").value,
    spocName: document.getElementById("spocName").value,
    vertical: document.getElementById("vertical").value,
    horizontal: document.getElementById("horizontal").value,
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,
    bcslaNumber: document.getElementById("bcslaNumber").value,
    problemStatement: document.getElementById("problemStatement").value,
    solution: document.getElementById("solution").value,
    technology: document.getElementById("technology").value,
    developerName: document.getElementById("developerName").value,
    projectStatus: document.getElementById("projectStatus").value
  };

  try 
  {
	  // Validation
    for (const [key, value] of Object.entries(projectData)) 
	{
      if (!value || value === "Select")
	  {
        alert(`Please fill in the ${key} field before adding the project.`);
        return;
      }
    }

	// Confirmation popup before saving
	const confirmSave = confirm("Do you want to save this project?");
	if (!confirmSave) 
	{
		return; // user cancelled
	}
	
    await addDoc(collection(db, "projects"), projectData);
    alert("Project added successfully!");
  }
  catch (error) 
  {
    console.error("Error adding project: ", error);
  }
});

// Display projects in table
function subscribeProjects() 
{
  onSnapshot(collection(db, "projects"), snapshot => {
    projectTableBody.innerHTML = "";
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      const row = document.createElement("tr");

      const values = [
        data.projectName, data.processName, data.processOwner,
        data.spocName, data.vertical, data.horizontal,
        data.startDate, data.endDate, data.bcslaNumber,
        data.problemStatement, data.solution, data.technology,
        data.developerName, data.projectStatus
      ];

      values.forEach(val => {
        const td = document.createElement("td");
        td.textContent = val || "";
        row.appendChild(td);
      });

      // Actions column (edit/delete placeholders)
      const actionsTd = document.createElement("td");
      actionsTd.innerHTML = `<button>Edit</button> <button>Delete</button>`;
      row.appendChild(actionsTd);

      projectTableBody.appendChild(row);
    });
  });
}

const developerFilter = document.getElementById("developerFilter");
const statusFilter = document.getElementById("statusFilter");
const searchBox = document.getElementById("searchBox");

function applyFilters() 
{
  const selectedStatus = statusFilter.value.toLowerCase();
  const selectedDeveloper = developerFilter.value.toLowerCase();
  const searchQuery = searchBox.value.toLowerCase();

  const rows = projectTableBody.querySelectorAll("tr");

  rows.forEach(row => {
    const statusCell = row.cells[13].textContent.toLowerCase();   // Status column
    const developerCell = row.cells[12].textContent.toLowerCase(); // Developer column
    const rowText = row.textContent.toLowerCase();

    const matchesStatus = !selectedStatus || statusCell === selectedStatus;
    const matchesDeveloper = !selectedDeveloper || developerCell === selectedDeveloper;
    const matchesSearch = !searchQuery || rowText.includes(searchQuery);

    row.style.display = (matchesStatus && matchesDeveloper && matchesSearch) ? "" : "none";
  });
}

// Hook up filters
statusFilter.addEventListener("change", applyFilters);
developerFilter.addEventListener("change", applyFilters);
searchBox.addEventListener("keyup", applyFilters);
