//déclarer les variables récupérant le html
const btnNouvellePartie = document.querySelector(".btn-new-game");
const zoneDeJeu = document.querySelector(".zone-jeu");
const btnRegles = document.querySelector(".btn-regles");
const nbJoueurs = document.querySelector("#nb-joueurs");
const tourJoueur = document.querySelector(".joueur-courant");

let allumettesRestantes = 50;
let nbJoueurSelect;
let nbAllumettesSelectionnee;
let tableauAllumettes = [];
//Sélection du nombre de joueur pour pouvoir commencer
nbJoueurs.addEventListener("change", () => {
  btnNouvellePartie.classList.remove("cache");
  tourJoueur.classList.remove("cache");
  nbJoueurSelect = nbJoueurs.value;
});
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
    zoneDeJeu.appendChild(allumette);
    allumette.addEventListener("click", () => {
      selectionneAllumette(allumette, index);
    });
  });
};

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
  createBoardGame();
});

const joueurA = 0;
const joueurB = 1;
let joueurActif = 0;

const retirerAllumettes = (nbAllumettes) => {
  allumettesRestantes -= nbAllumettes;
};

const askPLayer = () => {
  if (allumettesRestantes > 0) {
    let reponse = Number(prompt("Combien d'allumettes veux-tu oter ?"));
    if (reponse <= 6 && reponse >= 1) {
      retirerAllumettes(reponse);
      console.log(allumettesRestantes);
      console.log(estVictorieux);
    }
  }
};

const estVictorieux = allumettesRestantes === 0;

const jouer = () => {
  if (allumettesRestantes > 0) {
    askPLayer();
    joueurActif = joueurA;
    askPLayer();
    joueurActif = joueurB;
  }
};
