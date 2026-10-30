//déclarer les variables récupérant le html
const btnNouvellePartie = document.querySelector(".btn-new-game");
const plateauAllumettes = document.querySelector(".container-allumettes");
const btnRegles = document.querySelector(".btn-regles");
const nbJoueurs = document.querySelector("#nb-joueurs");
const affTourJoueur = document.querySelector(".joueur-courant");
const tourJoueur = document.querySelector(".nom-joueur-courant");
const btnValiderSelection = document.querySelector(".valider-selection");
const affBatonsRestants = document.querySelector(".batons-restants");

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
  allumettesRestantes = 50;
  nbAllumettesSelectionnee = 0;
  nbJoueurSelect = nbJoueurs.value;
  recupJoueur();
  tableauAllumettes.forEach((allumette) => {
    if (!allumette.enlevee) {
      document.getElementById(allumette.id).remove();
      console.log(!allumette.enlevee);
    }
  });
  tableauAllumettes = [];
  affBatonsRestants.textContent = "";
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
  console.log(nbAllumettesSelectionnee);
};

btnNouvellePartie.addEventListener("click", () => {
  reset();
  createBoardGame();
});

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

const suppressionAllumettes = () => {
  tableauAllumettes.forEach((allumettes) => {
    if (allumettes.select && !allumettes.enlevee) {
      console.log("id allumetttes" + allumettes.id);
      document.getElementById(`${allumettes.id}`).remove();
      allumettes.enlevee = true;
    }
  });
};

const retirerAllumettes = (nbAllumettes) => {
  allumettesRestantes -= nbAllumettes;
  nbAllumettesSelectionnee = 0;
  if (allumettesRestantes === 0) {
    const victoire = document.createElement("p");
    victoire.textContent = `La victoire revient à ${JoueurActif}`;
    document.querySelector(".zone-jeu").appendChild(victoire);
  }
};

btnRegles.addEventListener("click", () => {
  document.querySelector(".regle-jeu").classList.toggle("cache");
});
