// admin-dashboard.js

// Check if user is logged in
firebase.auth().onAuthStateChanged(user => {
  // IMPORTANT: For production, you must check for the user's admin role here using custom claims
  if (!user) {
    window.location.href = "admin.html"; // redirect if not logged in
  }
});

// Assuming db is defined in firebase-config.js
// DOM elements
const saveBtn = document.getElementById("saveCollegeBtn");
const collegeList = document.getElementById("collegeList");

// Save college
saveBtn.addEventListener("click", async () => {
  const college = {
    name: document.getElementById("collegeName").value.trim(),
    // IMPORTANT: Convert location to lowercase for consistent and robust querying
    location: document.getElementById("collegeLocation").value.trim().toLowerCase(), 
    ranking: parseInt(document.getElementById("collegeRanking").value),
    eligibility: document.getElementById("collegeEligibility").value.trim(),
    scholarship: document.getElementById("collegeScholarship").value.trim(),
    placement: document.getElementById("collegePlacement").value.trim(),
    // NEW: Save the application URL from the new input field
    url: document.getElementById("collegeURL").value.trim() 
  };

  // Simple validation, including the new URL field
  if (!college.name || !college.location || !college.ranking || !college.url) {
    alert("Please fill all required fields, including the College URL!");
    return;
  }

  try {
    await db.collection("colleges").add(college);
    alert("✅ College added successfully!");
    clearForm();
    loadColleges();
  } catch (err) {
    alert("Error: " + err.message);
  }
});

// Clear form fields
function clearForm() {
  document.getElementById("collegeName").value = "";
  document.getElementById("collegeLocation").value = "";
  document.getElementById("collegeRanking").value = "";
  document.getElementById("collegeEligibility").value = "";
  document.getElementById("collegeScholarship").value = "";
  document.getElementById("collegePlacement").value = "";
  // NEW: Clear the college URL field
  document.getElementById("collegeURL").value = ""; 
}

// Load colleges from Firestore
async function loadColleges() {
  collegeList.innerHTML = "";

  try {
    const snapshot = await db.collection("colleges").orderBy("ranking").get();
    
    if (snapshot.empty) {
      collegeList.innerHTML = "<p class='text-gray-500'>No colleges have been added yet.</p>";
      return;
    }
    
    snapshot.forEach(doc => {
      const c = doc.data();
      const card = document.createElement("div");
      card.className = "college-card";
      
      const collegeUrlDisplay = c.url 
        ? `<a href="${c.url}" target="_blank" class="text-blue-500 hover:underline">Apply Link</a>`
        : 'N/A';
        
      card.innerHTML = `
        <h3>${c.name} (${c.ranking})</h3>
        <p><strong>Location:</strong> ${c.location}</p>
        <p><strong>URL:</strong> ${collegeUrlDisplay}</p>
        <p><strong>Eligibility:</strong> ${c.eligibility}</p>
        <p><strong>Scholarship:</strong> ${c.scholarship}</p>
        <p><strong>Placement:</strong> ${c.placement}</p>
      `;
      collegeList.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading colleges:", err);
    collegeList.innerHTML = "<p class='text-red-500'>Failed to load colleges. Check console for details.</p>";
  }
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  firebase.auth().signOut().then(() => window.location.href = "admin.html");
});

// Initial load
window.addEventListener("load", loadColleges);
