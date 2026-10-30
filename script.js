//déclarer les variables récupérant le html
const btnNouvellePartie = document.querySelector(".btn-new-game");
const plateauAllumettes = document.querySelector(".container-allumettes");
const btnRegles = document.querySelector(".btn-regles");
const nbJoueurs = document.querySelector("#nb-joueurs");
const affTourJoueur = document.querySelector(".joueur-courant");
const tourJoueur = document.querySelector(".nom-joueur-courant");
const btnValiderSelection = document.querySelector(".valider-selection");
const affBatonsRestants = document.querySelector(".batons-restants");
const zoneJeu = document.querySelector(".zone-jeu");
const victoire = document.querySelector(".message");

let allumettesRestantes = 50;
let nbJoueurSelect;
let nbAllumettesSelectionnee;
let tableauAllumettes = [];
let JoueurActif;
let tabJoueur = [];
let n = 0;

//Sélection du nombre de joueur pour pouvoir commencer
nbJoueurs.addEventListener("change", () => {
  btnNouvellePartie.classList.remove("cache");
  affTourJoueur.classList.remove("cache");
  nbJoueurSelect = nbJoueurs.value;
  recupJoueur();
});

//gestion des joueurs
const recupJoueur = () => {
  tabJoueur = [];
  for (let i = 1; i <= nbJoueurSelect; i++) {
    tabJoueur.push(`Joueur ${i}`);
  }
  console.log(tabJoueur);
  JoueurActif = tabJoueur[n % nbJoueurSelect];
};

const changementJoueur = () => {
  n++;
  JoueurActif = tabJoueur[n % nbJoueurSelect];
  tourJoueur.textContent = JoueurActif;
};

//Remise à zéro du jeu
const reset = () => {
  n = 0;
  allumettesRestantes = 50;
  nbAllumettesSelectionnee = 0;
  nbJoueurSelect = nbJoueurs.value;
  recupJoueur();
  tourJoueur.textContent = JoueurActif;
  tableauAllumettes.forEach((allumette) => {
    if (!allumette.enlevee) {
      document.getElementById(allumette.id).remove();
    }
  });
  tableauAllumettes = [];
  affBatonsRestants.textContent = "";
  victoire.textContent = "";
  victoire.classList.remove("victoire");
};

//Remplir le plateau avec les 50 allumettes
const createBoardGame = () => {
  nbAllumettesSelectionnee = 0;
  nbJoueurs.classList.remove("cache");
  for (let i = 0; i <= 49; i++) {
    tableauAllumettes.push({ id: i, select: false, enlevee: false });
  }
  tableauAllumettes.forEach((element, index) => {
    const allumette = document.createElement("div");
    allumette.classList.add("allumette");
    allumette.id = `${index}`;
    plateauAllumettes.appendChild(allumette);
    allumette.addEventListener("click", () => {
      selectionneAllumette(allumette, index);
    });
  });
  btnValiderSelection.classList.remove("cache");
  zoneJeu.classList.remove("cache");
};

//selection des allumettes
const selectionneAllumette = (allumette, index) => {
  const idAllumette = tableauAllumettes[index];
  allumette.classList.toggle("selection");
  idAllumette.select = !idAllumette.select;
  if (idAllumette.select) {
    nbAllumettesSelectionnee++;
  } else {
    nbAllumettesSelectionnee--;
  }
};

//lancement d'une partie
btnNouvellePartie.addEventListener("click", () => {
  reset();
  createBoardGame();
});

//validation des allumettes à enlever
btnValiderSelection.addEventListener("click", () => {
  if (nbAllumettesSelectionnee === 0) {
    alert("Vous devez sélectionner au moins une allumette !");
  } else if (nbAllumettesSelectionnee > 6) {
    alert("Vous ne pouvez pas sélectionner plus de 6 allumettes");
  } else {
    suppressionAllumettes();
    retirerAllumettes(nbAllumettesSelectionnee);
    changementJoueur();
    affBatonsRestants.textContent = `Il reste ${allumettesRestantes} bâtonnets`;
  }
});

//supprime les allumettes visuellement
const suppressionAllumettes = () => {
  tableauAllumettes.forEach((allumettes) => {
    if (allumettes.select && !allumettes.enlevee) {
      document.getElementById(`${allumettes.id}`).classList.add("suppression");
      // document.getElementById(`${allumettes.id}`).remove();
      allumettes.enlevee = true;
      setTimeout(() => {
        document.getElementById(`${allumettes.id}`).remove();
      }, 2500);
    }
  });
};

//supprime les allumettes du total et condition victoire
const retirerAllumettes = (nbAllumettes) => {
  allumettesRestantes -= nbAllumettes;
  nbAllumettesSelectionnee = 0;
  if (allumettesRestantes === 0) {
    victoire.classList.add("victoire");
    victoire.innerHTML = `La victoire revient à 🎉 <strong>${JoueurActif} </strong>🎉 `;
  }
};

//Affichage des règles
btnRegles.addEventListener("click", () => {
  document.querySelector(".regle-jeu").classList.toggle("cache");
});
