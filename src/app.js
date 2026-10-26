// Daret — simulateur. Ton code commence ici.
// Le HTML (index.html) est déjà intégré : lis-le, repère les id et les data-*, puis fais-le vivre.

const daretForm = document.querySelector("#daret-form");
const nomCercle = document.querySelector("#nom-cercle");
const cotisation = document.querySelector("#cotisation");
const periodicite = document.querySelector("#periodicite");
const dateDebut = document.querySelector("#date-debut");
const participantsListe = document.querySelector("#participants-liste");
const participantsCompteur = document.querySelector("#participants-compteur")

const ajouterBtn = document.getElementById("ajouter-participant");
const nomCercleErreur = document.querySelector("#nom-cercle-erreur");
const cotisationErreur = document.getElementById("cotisation-erreur")
const periodiciteErreur = document.getElementById("periodicite-erreur")
const dateDebutErreur = document.getElementById("date-debut-erreur")
const participantsErreur = document.getElementById("participants-erreur")


let counter = 0
function ajouterParticipant(){

    if(counter >= 20){
        return
    }

    const retirerBtn = document.createElement("button")

    retirerBtn.type = "button"
    retirerBtn.textContent = "Retirer"
    retirerBtn.classList.add("retirer-participant")


    const li = document.createElement("li")
    
    const input =document.createElement("input")
    input.type = "text";
    input.placeholder = "Prénom du participant";

    li.append(input, retirerBtn)
    participantsListe.append(li)


    counter++
    ajouterBtn.disabled = counter >= 20;

    participantsCompteur.textContent = counter + " participants."

    
}
for (let i = 0; i < 3; i++) {
    ajouterParticipant();
}

ajouterBtn.addEventListener("click", function(){
 ajouterParticipant();
    
})


participantsListe.addEventListener("click", function(event) {
    const bouton = event.target.closest(".retirer-participant");

    if (!bouton) {
        return;
    }

    if (counter <= 2) {
        return;
    }

    bouton.closest("li").remove();

    counter--;
    ajouterBtn.disabled = counter >= 20;
    participantsCompteur.textContent = counter + " participants";
});






daretForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let formulaireValide = true;

    const nomCercleValide = /^[\p{L}\p{N} -]+$/u.test(nomCercle.value);

    if (
        nomCercle.value.length < 3 ||
        nomCercle.value.length > 40 ||
        !nomCercleValide
    ) {
        nomCercleErreur.classList.remove("hidden");
        nomCercleErreur.textContent =
            "The circle name must contain between 3 and 40 characters.";
        formulaireValide = false;
    } else {
        nomCercleErreur.classList.add("hidden");
        nomCercleErreur.textContent = "";
    }

    if (
        cotisation.value === "" ||
        Number(cotisation.value) < 100 ||
        Number(cotisation.value) > 50000 ||
        !Number.isInteger(Number(cotisation.value))
    ) {
        cotisationErreur.classList.remove("hidden");
        cotisationErreur.textContent =
            "The contribution must be an integer between 100 MAD and 50000 MAD.";
        formulaireValide = false;
    } else {
        cotisationErreur.classList.add("hidden");
        cotisationErreur.textContent = "";
    }

    if (periodicite.value === "") {
        periodiciteErreur.textContent =
            "Veuillez choisir une périodicité.";
        periodiciteErreur.classList.remove("hidden");
        formulaireValide = false;
    } else {
        periodiciteErreur.textContent = "";
        periodiciteErreur.classList.add("hidden");
    }

    const aujourdHui = new Date();
    const annee = aujourdHui.getFullYear();
    const mois = String(aujourdHui.getMonth() + 1).padStart(2, "0");
    const jour = String(aujourdHui.getDate()).padStart(2, "0");
    const dateMinimum = `${annee}-${mois}-${jour}`;

    if (dateDebut.value === "" || dateDebut.value < dateMinimum) {
        dateDebutErreur.textContent =
            "La date de début doit être aujourd'hui ou une date future.";
        dateDebutErreur.classList.remove("hidden");
        formulaireValide = false;
    } else {
        dateDebutErreur.textContent = "";
        dateDebutErreur.classList.add("hidden");
    }

    const participantsInputs = participantsListe.querySelectorAll("input");
    const nombreMinimum = Number(participantsListe.dataset.min);
    const nombreMaximum = Number(participantsListe.dataset.max);

    if (
        participantsInputs.length < nombreMinimum ||
        participantsInputs.length > nombreMaximum
    ) {
        participantsErreur.textContent =
            "The number of participants should be between 2 and 20.";
        participantsErreur.classList.remove("hidden");
        formulaireValide = false;
    } else {
        participantsErreur.textContent = "";
        participantsErreur.classList.add("hidden");
    }

    const nomsParticipants = [];

    for (const participantInput of participantsInputs) {
        const nom = participantInput.value.trim();

        if (nom === "") {
            participantsErreur.textContent =
                "Each participant must enter a name.";
            participantsErreur.classList.remove("hidden");
            formulaireValide = false;
        } else if (
            nom.length < 2 ||
            nom.length > 30 ||
            !/^[\p{L}'’-]+$/u.test(nom)
        ) {
            participantsErreur.textContent =
                "Names must contain 2 to 30 letters, apostrophes or hyphens.";
            participantsErreur.classList.remove("hidden");
            formulaireValide = false;
        } else {
            const nomNormalise = nom.toLowerCase();

            if (nomsParticipants.includes(nomNormalise)) {
                participantsErreur.textContent =
                    "Each participant must have a unique name.";
                participantsErreur.classList.remove("hidden");
                formulaireValide = false;
            } else {
                nomsParticipants.push(nomNormalise);
            }
        }
    }

    if (formulaireValide === false) {
        return;
    }

});