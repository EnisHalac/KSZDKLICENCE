const staff = [
  // Premier Liga
  { firstName: "Dario", lastName: "Damjanović", position: "Premier Liga", image: "images/staff/Dario-Damjanovic.png" },
  { firstName: "Adis", lastName: "Bešić", position: "Premier Liga", image: "images/staff/Adis-Besic.png" },
  { firstName: "Izudin", lastName: "Kamberović", position: "Premier Liga", image: "images/staff/Izudin-Kamberovic.png" },
  { firstName: "Adi", lastName: "Bambur", position: "Premier Liga", image: "images/staff/Adi-Bambur.png" },

  // A Sistem
  { firstName: "Albin", lastName: "Mašić", position: "A Sistem", image: "images/staff/Albin-Masic.png" },

  // Liga Mladih
  { firstName: "Dario", lastName: "Damjanović", position: "Liga Mladih", image: "images/staff/Dario-Damjanovic.png" },
  { firstName: "Adis", lastName: "Bešić", position: "Liga Mladih", image: "images/staff/Adis-Besic.png" },
  { firstName: "Izudin", lastName: "Kamberović", position: "Liga Mladih", image: "images/staff/Izudin-Kamberovic.png" },
  { firstName: "Adi", lastName: "Bambur", position: "Liga Mladih", image: "images/staff/Adi-Bambur.png" },
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
  const premierLeagueGroup = document.getElementById("premier-league");
  const aSistemGroup = document.getElementById("a-sistem");
  const ligaMladihGroup = document.getElementById("liga-mladih");

  staff.forEach(staffMember => {
    const staffBox = createStaffBox(staffMember);
    if (staffMember.position === "Premier Liga") {
      premierLeagueGroup.appendChild(staffBox);
    } else if (staffMember.position === "A Sistem") {
      aSistemGroup.appendChild(staffBox);
    } else if (staffMember.position === "Liga Mladih") {
      ligaMladihGroup.appendChild(staffBox);
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
