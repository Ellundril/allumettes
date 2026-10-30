//déclarer les variables récupérant le html
const btnNouvellePartie = document.querySelector(".btn-new-game");
const plateauAllumettes = document.querySelector(".container-allumettes");
const btnRegles = document.querySelector(".btn-regles");
const nbJoueurs = document.querySelector("#nb-joueurs");
const tourJoueur = document.querySelector(".joueur-courant");
const btnValiderSelection = document.querySelector(".valider-selection");

let allumettesRestantes = 50;
let nbJoueurSelect;
let nbAllumettesSelectionnee;
let tableauAllumettes = [];
let JoueurActif;
//Sélection du nombre de joueur pour pouvoir commencer
nbJoueurs.addEventListener("change", () => {
  btnNouvellePartie.classList.remove("cache");
  tourJoueur.classList.remove("cache");
  nbJoueurSelect = nbJoueurs.value;
});

const reset = () => {
  allumettesRestantes = 50;
  nbAllumettesSelectionnee = 0;
  nbJoueurSelect = nbJoueurs.value;
  tableauAllumettes.forEach((allumette) => {
    if (!allumette.enlevee) {
      document.getElementById(allumette.id).remove();
      console.log(!allumette.enlevee);
    }
  });
  tableauAllumettes = [];
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
  nbAllumettesSelectionnee = 0;
};

const retirerAllumettes = (nbAllumettes) => {
  allumettesRestantes -= nbAllumettes;
  if (estVictorieux) {
    console.log(`La victoire revient au ${JoueurActif}`);
  }
};

const estVictorieux = allumettesRestantes === 0;
