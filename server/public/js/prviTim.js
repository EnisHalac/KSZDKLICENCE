const players = [
  // Golmani
  { firstName: "Adi", lastName: "Durmo", position: "Goalkeeper", number: 0, image: "images/players/Adi-Durmo.png", appearances: 30, cleanSheets: 10, assists: 3 },
  { firstName: "Ajdin", lastName: "Brkić", position: "Goalkeeper", number: 1, image: "images/players/Ajdin-Brkic.png", appearances: 28, cleanSheets: 5, assists: 1 },

  // Odbrana
  { firstName: "Aladin", lastName: "Isaković", position: "Defense", number: 2, image: "images/players/Aladin-Isakovic.png", appearances: 25, goals: 1, assists: 3 },
  { firstName: "Kenan", lastName: "Horić", position: "Defense", number: 3, image: "images/players/Kenan-Horic.png", appearances: 28, goals: 2, assists: 1 },
  { firstName: "Nedim", lastName: "Smajlvić", position: "Defense", number: 4, image: "images/players/Nedim-Smajlovic.png", appearances: 23, goals: 0, assists: 2 },
  { firstName: "Emrah", lastName: "Palačkić", position: "Defense", number: 5, image: "images/players/Emrah-Palackic.png", appearances: 29, goals: 0, assists: 4 },
  { firstName: "Eldar", lastName: "Sivac", position: "Defense", number: 6, image: "images/players/Eldar-Sivac.png", appearances: 27, goals: 1, assists: 2 },
  { firstName: "Davud", lastName: "Arnautović", position: "Defense", number: 7, image: "images/players/Davud-Arnautovic.png", appearances: 24, goals: 0, assists: 3 },
  { firstName: "Faris", lastName: "Bajramović", position: "Defense", number: 8, image: "images/players/Faris-Bajramovic.png", appearances: 26, goals: 1, assists: 1 },
  { firstName: "Afan", lastName: "Ibraković", position: "Defense", number: 9, image: "images/players/Afan-Ibrakovic.png", appearances: 20, goals: 0, assists: 0 },
  { firstName: "Amer", lastName: "Hodžić", position: "Defense", number: 10, image: "images/players/Amer-Hodzic.png", appearances: 22, goals: 0, assists: 2 },
  { firstName: "Alden", lastName: "Šetkić", position: "Defense", number: 11, image: "images/players/Alden-Setkic.png", appearances: 21, goals: 1, assists: 0 },
  { firstName: "Lovro", lastName: "Musa", position: "Defense", number: 12, image: "images/players/Lovro-Musa.png", appearances: 19, goals: 0, assists: 1 },

  // Vezni red
  { firstName: "Ali", lastName: "Medjuseljac", position: "Midfield", number: 13, image: "images/players/Ali-Meduseljac.png", appearances: 27, goals: 2, assists: 5 },
  { firstName: "Mahir", lastName: "Mehić", position: "Midfield", number: 14, image: "images/players/Mahir-Mehic.png", appearances: 26, goals: 1, assists: 4 },
  { firstName: "Talha", lastName: "Tabaković", position: "Midfield", number: 15, image: "images/players/Talha-Tabakovic.png", appearances: 29, goals: 3, assists: 3 },
  { firstName: "Adin", lastName: "Begic", position: "Midfield", number: 16, image: "images/players/Adin-Begic.png", appearances: 24, goals: 2, assists: 2 },
  { firstName: "Fenan", lastName: "Salčinović", position: "Midfield", number: 17, image: "images/players/Fenan-Salcinovic.png", appearances: 30, goals: 4, assists: 1 },
  { firstName: "Hanan", lastName: "Zahirović", position: "Midfield", number: 18, image: "images/players/Hanan-Zahirovic.png", appearances: 28, goals: 1, assists: 3 },
  { firstName: "Bakir", lastName: "Bašić", position: "Midfield", number: 19, image: "images/players/Bakir-Basic.png", appearances: 25, goals: 2, assists: 4 },
  { firstName: "Muamer", lastName: "Hamzić", position: "Midfield", number: 20, image: "images/players/Muamer-Hamzic.png", appearances: 22, goals: 0, assists: 2 },
  { firstName: "Harun", lastName: "Vardo", position: "Midfield", number: 21, image: "images/players/Harun-Vardo.png", appearances: 23, goals: 1, assists: 1 },

  // Napad
  { firstName: "Anes", lastName: "Mašić", position: "Attack", number: 22, image: "images/players/Anes-Masic.png", appearances: 30, goals: 10, assists: 7 },
  { firstName: "Edin", lastName: "Durmiš", position: "Attack", number: 23, image: "images/players/Edin-Durmis.png", appearances: 29, goals: 9, assists: 6 },
  { firstName: "Emir", lastName: "Karalić", position: "Attack", number: 24, image: "images/players/Emir-Karalic.png", appearances: 28, goals: 8, assists: 5 },
  { firstName: "Avdija", lastName: "Vršajević", position: "Attack", number: 25, image: "images/players/Avdija-Vrsajevic.png", appearances: 27, goals: 7, assists: 4 },
  { firstName: "Benjamin", lastName: "Ahmetspahić", position: "Attack", number: 26, image: "images/players/Benjamin-Ahmetspahic.png", appearances: 26, goals: 6, assists: 3 }
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

  const playerNumber = document.createElement("div");
  playerNumber.classList.add("player-number");
  playerNumber.textContent = `${player.number}`;
  playerPicture.appendChild(playerNumber);

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
  
  if (player.position !== "Goalkeeper") {
    additionalInfo.innerHTML = `
    <div>Nastupi: ${player.appearances}</div>
    <div>Postignuti golovi: ${player.goals}</div>
    <div>Asistencije: ${player.assists}</div>
  `;
  }

  if (player.position === "Goalkeeper") {
    additionalInfo.innerHTML += `
    <div>Nastupi: ${player.appearances}</div>
    <div>Odbrane: ${player.cleanSheets}</div>
    <div>Asistencije: ${player.assists}</div>`;
  }
  
  playerInfo.appendChild(additionalInfo);

  playerBox.appendChild(playerInfo);

  return playerBox;
}



function initTeamPage() {
  const goalkeeperGroup = document.getElementById("goalkeeper-group");
  const defenseGroup = document.getElementById("defense-group");
  const midfieldGroup = document.getElementById("midfield-group");
  const attackGroup = document.getElementById("attack-group");

  players.forEach(player => {
    const playerBox = createPlayerBox(player);
    if (player.position === "Goalkeeper") {
      goalkeeperGroup.appendChild(playerBox);
    } else if (player.position === "Defense") {
      defenseGroup.appendChild(playerBox);
    } else if (player.position === "Midfield") {
      midfieldGroup.appendChild(playerBox);
    } else if (player.position === "Attack") {
      attackGroup.appendChild(playerBox);
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
