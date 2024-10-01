const players = [
  // Kengur
  { firstName: "Adi", lastName: "Durmo", club: "kengur", image: "images/players/Adi-Durmo.png", appearances: 30, cleanSheets: 10, assists: 3 },
  { firstName: "Ajdin", lastName: "Brkić", club: "kengur", image: "images/players/Ajdin-Brkic.png", appearances: 28, cleanSheets: 5, assists: 1 },

  // Gradina
  { firstName: "Aladin", lastName: "Isaković", club: "gradina", image: "images/players/Aladin-Isakovic.png", appearances: 25, goals: 1, assists: 3 },
  { firstName: "Kenan", lastName: "Horić", club: "gradina", image: "images/players/Kenan-Horic.png", appearances: 28, goals: 2, assists: 1 },

  // Maglaj
  { firstName: "Nedim", lastName: "Smajlović", club: "maglaj", image: "images/players/Nedim-Smajlovic.png", appearances: 23, goals: 0, assists: 2 },
  { firstName: "Emrah", lastName: "Palačkić", club: "maglaj", image: "images/players/Emrah-Palackic.png", appearances: 29, goals: 0, assists: 4 },

  // Abeceda
  { firstName: "Eldar", lastName: "Sivac", club: "abeceda", image: "images/players/Eldar-Sivac.png", appearances: 27, goals: 1, assists: 2 },
  
  // Čelik
  { firstName: "Davud", lastName: "Arnautović", club: "čelik", image: "images/players/Davud-Arnautovic.png", appearances: 24, goals: 0, assists: 3 },
  { firstName: "Faris", lastName: "Bajramović", club: "čelik", image: "images/players/Faris-Bajramovic.png", appearances: 26, goals: 1, assists: 1 },
  
  // Kakanj
  { firstName: "Afan", lastName: "Ibraković", club: "kakanj", image: "images/players/Afan-Ibrakovic.png", appearances: 20, goals: 0, assists: 0 },
  
  // Vukovi
  { firstName: "Amer", lastName: "Hodžić", club: "vukovi", image: "images/players/Amer-Hodzic.png", appearances: 22, goals: 0, assists: 2 },
  { firstName: "Alden", lastName: "Šetkić", club: "vukovi", image: "images/players/Alden-Setkic.png", appearances: 21, goals: 1, assists: 0 },
  
  // Visoko
  { firstName: "Lovro", lastName: "Musa", club: "visoko", image: "images/players/Lovro-Musa.png", appearances: 19, goals: 0, assists: 1 },

  // Dodaj još igrača...
];

function createPlayerBox(player) {
  const playerBox = document.createElement("div");
  playerBox.classList.add("team-member");

  const playerPicture = document.createElement("div");
  playerPicture.classList.add("player-picture");

  const img = document.createElement("img");
  img.src = player.image;
  img.alt = `${player.firstName} ${player.lastName}`;
  playerPicture.appendChild(img);

  playerBox.appendChild(playerPicture);

  const playerInfo = document.createElement("div");
  playerInfo.classList.add("player-info");

  const playerName = document.createElement("div");
  playerName.classList.add("player-name");
  playerName.textContent = player.firstName;
  playerInfo.appendChild(playerName);

  const playerSurname = document.createElement("div");
  playerSurname.classList.add("player-surname");
  playerSurname.textContent = player.lastName;
  playerInfo.appendChild(playerSurname);

  const additionalInfo = document.createElement("div");
  additionalInfo.classList.add("additional-info");

  if (player.club === "kengur" || player.club === "gradina" || player.club === "maglaj" || player.club === "abeceda" || player.club === "čelik" || player.club === "kakanj" || player.club === "vukovi" || player.club === "visoko") {
    additionalInfo.innerHTML = `
      <div>Nastupi: ${player.appearances}</div>
      <div>Postignuti golovi: ${player.goals || 0}</div>
      <div>Asistencije: ${player.assists}</div>
    `;
  }

  playerInfo.appendChild(additionalInfo);
  playerBox.appendChild(playerInfo);

  return playerBox;
}

function initTeamPage() {
  const clubs = {
    kengur: document.getElementById("kengur-group"),
    gradina: document.getElementById("gradina-group"),
    maglaj: document.getElementById("maglaj-group"),
    abeceda: document.getElementById("abeceda-group"),
    čelik: document.getElementById("celik-group"),
    kakanj: document.getElementById("kakanj-group"),
    vukovi: document.getElementById("vukovi-group"),
    visoko: document.getElementById("visoko-group"),
  };

  players.forEach(player => {
    const playerBox = createPlayerBox(player);
    const clubGroup = clubs[player.club];

    if (clubGroup) {
      clubGroup.appendChild(playerBox);
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
