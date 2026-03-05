import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const projectList = document.getElementById("projectList");
const addProjectBtn = document.getElementById("addProjectBtn");

onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "index.html"; // redirect to login
  } else {
    subscribeProjects();
  }
});

addProjectBtn.addEventListener("click", async () => {
  // Collect values
  const projectName = document.getElementById("projectName").value.trim();
  const processName = document.getElementById("processName").value.trim();
  const processOwner = document.getElementById("processOwner").value.trim();
  const spocName = document.getElementById("spocName").value.trim();
  const projectStatus = document.getElementById("projectStatus").value;
  const problemStatement = document.getElementById("problemStatement").value.trim();
  const solution = document.getElementById("solution").value.trim();
  const technology = document.getElementById("technology").value.trim();
  const developerName = document.getElementById("developerName").value;
  const vertical = document.getElementById("vertical").value.trim();
  const horizontal = document.getElementById("horizontal").value.trim();
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const bcslaNumber = document.getElementById("bcslaNumber").value.trim();

  // Validation: check if required fields are empty
  if (!projectName || !processName || !processOwner || !spocName || 
      !problemStatement || !solution || !technology || !vertical || 
      !horizontal || !startDate || !endDate || !bcslaNumber) {
    alert("Please fill in all required fields before adding the project.");
    return;
  }

  // Confirmation popup before saving
  const confirmSave = confirm("Do you want to save this project?");
  if (!confirmSave) {
    return; // user cancelled
  }

  // Save project if validation passes and user confirmed
  const projectData = {
    projectName,
    processName,
    processOwner,
    spocName,
	vertical,
    horizontal,
    startDate,
    problemStatement,
    solution,
    technology,
    endDate,
    bcslaNumber,
	developerName,
    projectStatus	
  };

  await addDoc(collection(db, "projects"), projectData);
});

function subscribeProjects() {
  onSnapshot(collection(db, "projects"), snapshot => {
    projectList.innerHTML = "";
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${data.projectName}</strong> 
        (Status: ${data.projectStatus}, Developer: ${data.developerName})
        <br>Owner: ${data.processOwner}, SPOC: ${data.spocName}
        <br>Technology: ${data.technology}, Vertical: ${data.vertical}, Horizontal: ${data.horizontal}
        <br>Start: ${data.startDate}, End: ${data.endDate}
        <br>BCSLA: ${data.bcslaNumber}
      `;
      projectList.appendChild(li);
    });
  });
}
