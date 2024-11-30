const teamGrid = document.getElementById("teamGrid");
const modal = document.getElementById("bioModal");
const closeBtn = document.getElementsByClassName("close")[0];
const modalName = document.getElementById("modalName");
const modalRole = document.getElementById("modalRole");
const modalBio = document.getElementById("modalBio");

// Function to fetch team data from JSON file
function fetchTeamMembers() {
    fetch('../json/teamMembers.json')
        .then(response => response.json())
        .then(data => {
            data.teamMembers.forEach((member) => {
                teamGrid.appendChild(createTeamMember(member));
            });
        })
        .catch(error => console.error("Error fetching team members:", error));
}

// Function to create a team member element
function createTeamMember(member) {
    const memberElement = document.createElement("div");
    memberElement.className = "team-member";
    memberElement.innerHTML = `
    <img src="${member.image}" alt="${member.name}" class="member-image">
    <div class="member-info">
        <h3 class="member-name">${member.name}</h3>
        <p class="member-role">${member.role}</p>
        <p class="member-bio">${member.bio.substring(0, 100)}...</p>
        <a class="read-more" href="#">Leer más</a>
    </div>
  `;

    const readMoreBtn = memberElement.querySelector(".read-more");
    readMoreBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevents page refresh
        showModal(member);
    });

    return memberElement;
}

// Function to show the modal with the team member information
function showModal(member) {
    modalName.textContent = member.name;
    modalRole.textContent = member.role;
    modalBio.textContent = member.bio;
    modal.style.display = "block";
}

// Close modal
closeBtn.onclick = function () {
    modal.style.display = "none";
};

// Close modal if clicked outside
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Fetch and display team members
fetchTeamMembers();
