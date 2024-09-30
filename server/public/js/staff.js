const staff = [
  // Strucni stab
  { firstName: "Dario", lastName: "Damjanović", position: "Staff", image: "images/staff/Dario-Damjanovic.png" },
  { firstName: "Adis", lastName: "Bešić", position: "Staff", image: "images/staff/Adis-Besic.png" },
  { firstName: "Izudin", lastName: "Kamberović", position: "Staff", image: "images/staff/Izudin-Kamberovic.png" },
  { firstName: "Adi", lastName: "Bambur", position: "Staff", image: "images/staff/Adi-Bambur.png" },
  
  // Medicnisko osoblje
  { firstName: "Albin", lastName: "Mašić", position: "Medical", image: "images/staff/Albin-Masic.png" },
  
  // Ekonomat
  { firstName: "Adis", lastName: "Bešić", position: "Economic", image: "images/staff/Adis-Besic.png" },
  { firstName: "Izudin", lastName: "Kamberović", position: "Economic", image: "images/staff/Izudin-Kamberovic.png" }
];
function createStaffBox(staffMember) {
  const staffBox = document.createElement("div");
  staffBox.classList.add("team-member");

  const img = document.createElement("img");
  img.src = staffMember.image;
  img.alt = `${staffMember.firstName} ${staffMember.lastName}`;
  staffBox.appendChild(img);

  const staffInfo = document.createElement("div");
  staffInfo.classList.add("staff-info");

  const staffName = document.createElement("div");
  staffName.classList.add("staff-name");
  staffName.textContent = staffMember.firstName; 
  staffInfo.appendChild(staffName);

  const staffSurname = document.createElement("div");
  staffSurname.classList.add("staff-surname");
  staffSurname.textContent = staffMember.lastName; 
  staffInfo.appendChild(staffSurname);

  staffBox.appendChild(staffInfo);

  return staffBox;
}


function initTeamPage() {
  const staffGroup = document.getElementById("staff-group");
  const medicalGroup = document.getElementById("medical-group");
  const economicGroup = document.getElementById("economic-group");

  staff.forEach(staffMember => {
    const staffBox = createStaffBox(staffMember);
    if (staffMember.position === "Staff") {
      staffGroup.appendChild(staffBox);
    } else if (staffMember.position === "Medical") {
      medicalGroup.appendChild(staffBox);
    } else if (staffMember.position === "Economic") {
      economicGroup.appendChild(staffBox);
    }
  });
}

initTeamPage();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});