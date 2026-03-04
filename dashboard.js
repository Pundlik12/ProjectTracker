import { auth } from "./firebase-config.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Redirect to login if not authenticated
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "index.html";
  }
});

// Logout with confirmation
document.getElementById("logoutBtn").addEventListener("click", () => {
  const confirmLogout = confirm("Are you sure you want to log out?");
  if (confirmLogout) {
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  }
});
