// Daret — simulateur. Ton code commence ici.
// Le HTML (index.html) est déjà intégré : lis-le, repère les id et les data-*, puis fais-le vivre.

const daretForm = document.querySelector("#daret-form");
const nomCercle = document.querySelector("#nom-cercle");
const cotisation = document.querySelector("#cotisation");
const periodicite = document.querySelector("#periodicite");
const dateDebut = document.querySelector("#date-debut");


const nomCercleErreur = document.querySelector("#nom-cercle-erreur");
nomCercle.addEventListener("input", function () {
    if (nomCercle.value.length < 3 || nomCercle.value.length > 40) {
        nomCercleErreur.classList.remove("hidden");
        nomCercleErreur.textContent = "The circle name is invalid.";
    } else {
        nomCercleErreur.classList.add("hidden");
    }
});


const cotisationErreur = document.getElementById("cotisation-erreur")
cotisation.addEventListener("input", function(){
    if(Number(cotisation.value) < 100 ||
        Number(cotisation.value) > 50000||
        !Number.isInteger(Number(cotisation.value))
    ){
        cotisationErreur.classList.remove("hidden");
        cotisationErreur.textContent = "The contribution must be an integer between 100 MAD and 50000 MAD.";
    }else {
        cotisationErreur.classList.add("hidden")
    }
})


const periodiciteErreur = document.getElementById("periodicite-erreur")
periodicite.addEventListener("change", function () {
    if(periodicite.value === ""){
        periodiciteErreur.classList.remove("hidden")
        periodiciteErreur.textContent = "You need to choose one of the three options."
    }else{
        periodiciteErreur.classList.add("hidden")
    }
});



