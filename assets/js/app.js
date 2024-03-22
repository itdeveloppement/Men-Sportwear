
// IMPORTS
import { openModal } from '../../assets/js/fonctionsAffichage.js';
import { changeTypo } from '../../assets/js/fonctionsAffichage.js';

// BIBLIOTHEQUE AOS
AOS.init({
    duration: 1800,
});

// CARTE FOOTER LEAFLETJS
// recuperation des coordonnées de saint etienne dans la base nominate
fetch('https://nominatim.openstreetmap.org/search?q=Saint-Étienne, France&format=json')
    .then(response => response.json())
    .then(data => {
        let latitude = data[0].lat;
        let longitude = data[0].lon;
        // initialisation à l'ouverture
        let mymap = L.map('mapid').setView([45.439695, 4.387177], 13);
        // ajout d'un font de carte france
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(mymap);
        // ajout position sur la carte
        let marker = L.marker([latitude, longitude]).addTo(mymap);
        // ajout ecriture dans popup
        marker.bindPopup(`<p>Men Sportswear</p>`).openPopup();
    })
// CHANGEMENT TYPO
document.getElementById("btn-typo").addEventListener("click", changeTypo);
// changement de la typo du site modal
let modal = document.querySelector(".header-modal");
modal.addEventListener("click", changeTypo);

// MODALE HEADER

// ouverture et fermeture burger et modale au click
document.querySelector(".hamburger").addEventListener("click", ()=> {
    openModal()
});

// FORMULAIRE CONTACT

// constantes globales - longueur des valeurs des champs
const maxLengthNom = 20;
const maxLengthPrenom = 20;
const maxLengthCompteur = 500; // pour message et longeur message
const maxLengthEmail = 50;
const maxLengthRefProduit = 11;

// ecouteur evenement sur champs

// ecouteur sur les champs du formulaire
document.getElementById("nom").addEventListener("change",testNom);
document.getElementById("prenom").addEventListener("change",testPrenom);
document.getElementById("objet").addEventListener("change",testObjet);
document.getElementById("email").addEventListener("change",testEmail);
document.getElementById("reference-produit").addEventListener("change",testRefProduit);
document.getElementById("message").addEventListener("change",testMessage);
    // pour compteur de mots
    document.getElementById("message").addEventListener("input",()=>{
    long.innerText = message.value.length+"/"+maxLengthCompteur;
})

// SOUMISSION FORMULAIRE

let monform = document.getElementById('monform')
monform.addEventListener("submit",(event)=>{
    event.preventDefault();
    let test1 = testPrenom();
    let test2 = testNom();
    let test3 = testEmail();
    let test4 = testObjet();
    // recup element objet (select)
    let objet = document.querySelector("#objet");
    // point de depart du test pour le champ ference produit
    let test5 = false;
    // si valeur ref produit est false et champs information-generale ou probleme-site est saisi
    if ((testRefProduit()=== false) && ((objet.value==="information-generale" || objet.value==="probleme-site"))) {
    // test champs ref produit === true (cas possible meme si le champs ref produit est vide)
    test5 = true;
    // sinon si valeur ref produit est true et probleme-produit ou information-produit est saisi
    } else if ((testRefProduit()) && ((objet.value==="probleme-produit" || objet.value==="information-produit"))) {
        // test champs ref produit === true (tout est ok)
    test5 = true;
    }
    let test6 = testMessage();
 
    if(test1===true && 
        test2 === true &&
        test3 ===true && 
        test4 ===true && 
        test5 ===true && 
        test6 ===true  ){
        monform.submit();
    }
})

// FONCTIONS TEST DE CHAQUE VALEUR DE CHAQUE CHAMPS

/** CHAMPS PRENOM : verifie les données du champs
*       si la valeur du champs est vide
*       si la valeur du champs n'est pas plus long que X caractères
*       si la valeur du champs comporte que des caractere alphanumerique
*       si la valeur du champ comporte pas de code
* @returns {boolean} false si une erreur de validation
* @returns {boolean} true si aucune erreur
*/
function testPrenom(){
    // si le champs est vide
    if(beEmpty (prenom.value)){
        // affiche le message d'erreur et bordure
        afficheErreur("prenom", "Ce champs doit etre complété");
        return false
     // si le texte dépasse x caracteres // 
    }else if(maxLength(prenom.value, maxLengthPrenom)){
        afficheErreur("prenom", `Ce champ ne peut pas depasser ${maxLengthPrenom} caracteres`);
        return false
    // si caractere non alphanumerique
    } else if (onlyAlphanumeric(prenom.value )=== false) {
        afficheErreur("prenom", "Ce champ doit comporté que des caracteres alphanumeriques");
        return false
    // si injection de code
    }else if(hasCode(prenom.value)){ 
        afficheErreur("prenom", "Vous ne pouvez pas injecter de code ici!");
        return false
    } 
    enleveErreur("prenom")
    return true
};
/** CHAMPS NOM : verifie les données du champs
*       si la valeur du champs est vide
*       si la valeur du champs n'est pas plus long que X caractères
*       si la valeur du champs comporte que des caractere alphanumerique
*       si la valeur du champ comporte pas de code
* @returns {boolean} false si une erreur de validation
* @returns {boolean} true si aucune erreur
*/
function testNom(){
    // si le champs est vide
    if(beEmpty (nom.value)){
        // affiche le message d'erreur et bordure
        afficheErreur("nom", "Ce champs doit etre complété");
        return false
     // si le texte dépasse x caracteres // 
    }else if(maxLength(nom.value, maxLengthNom)){
        afficheErreur("nom", `Ce champ ne peut pas depasser ${maxLengthNom} caracteres`);
        return false
    // si caractere non alphanumerique
    } else if (onlyAlphanumeric(nom.value )=== false) {
        afficheErreur("nom", "Ce champ doit comporté que des caracteres alphanumeriques");
        return false
    // si injection de code
    }else if(hasCode(nom.value)){ 
        afficheErreur("nom", "Vous ne pouvez pas injecter de code ici!");
        return false
    }
    enleveErreur("nom")
    return true
};
/** CHAMPS EMAIL : verifie si les donnée sont valide
*       si la valeur du champs est vide
*       si la valeur du champs n'est pas plus long que X caractères
*       si la valeur du champ ne comporte pas de code
*       si la valeur du champ est au format xxxxxxxxxxxxxxx@xxxxxxxxxx.xxxxxx
* @returns {boolean} false si une erreur de validation
* @returns {boolean} true si aucune erreur
*/
function testEmail(){
    // si le champs est vide
    if(beEmpty (email.value)){
        // affiche le message d'erreur et bordure
        afficheErreur("email", "Ce champs doit etre complété");
        return false
     // si le texte dépasse x caracteres // 
    }else if(maxLength(email.value, maxLengthEmail)){
        afficheErreur("email", `Ce champ ne peut pas depasser ${maxLengthEmail} caracteres`);
        return false
    // si injection de code
    }else if(hasCode(email.value)){ 
        afficheErreur("email", "Vous ne pouvez pas injecter de code ici!");
        return false
    // si la valeur du champ n'est pas au format xxxxxxxx@xxxxxx.xxxxxx
    } else if (formatEmail (email.value)=== false) {
        afficheErreur("email", " Le mail n'est pas au format : exemple@exemple.exemple");
        return false
    }
    
    enleveErreur("email")
    return true
};
/** CHAMPS OBJET : verifie les données du champs
*       si la valeur du champs est vide
* @returns {boolean} false si une erreur de validation
* @returns {boolean} true si aucune erreur
*/
function testObjet(){
    let objet = document.getElementById("objet");
    let refProduit = document.querySelector(".refProduit")

    if(beEmpty (objet.value)){
        afficheErreur("objet","Choisir un sujet");
        refProduit.classList.add("d-none");
        return false;

    } else if (objet.value=== "information-produit" || objet.value=== "probleme-produit"){
        refProduit.classList.remove("d-none");
        enleveErreur("objet");
        return true;
    } else {
        enleveErreur("objet");
        refProduit.classList.add("d-none");
        return true;
    } 
    
};
/** CHAMPS REF PRODUIT : verifie les données du champs
*       si la valeur du champs est vide
*       si la valeur du champs n'est pas plus long que X caractères
*       si la valeur du champ est au format 3 lettre, un tiret, 6 chiffres
*       si la valeur du champ comporte pas de code
*/
function testRefProduit() {
    let champs = document.getElementById("reference-produit");
    // si le champs est vide
    if(beEmpty (champs.value)){
        // affiche le message d'erreur et bordure
        afficheErreur("reference-produit", "Ce champs doit etre complété");
        return false
     // si le texte dépasse x caracteres // 
    }else if(maxLength(champs.value, maxLengthRefProduit)){
        afficheErreur("reference-produit", `Ce champ ne peux pas depasser ${maxLengthRefProduit-1} caracteres`);
        return false
    // si la valeur du champ est au format 3 lettre, un tiret, 6 chiffres
    // FAIRE LA CONDITION REG
    } else if (formatRefProduit(champs.value) === false) {
        afficheErreur("reference-produit", `La reference du produit doit etre au format : 3 lettres suivi d'un tiret (-), suivi de 6 chiffres`);
        return false
    // si injection de code
    }else if(hasCode(champs.value)){ 
        afficheErreur("reference-produit", "Vous ne pouvez pas injecter de code ici!");
        return false
    }
    enleveErreur("reference-produit")
    return true

}
/** CHAMPS MESSAGE : verifie la valeur des données du champs
*       si la valeur du champs est vide
*       si la valeur du champs ne comporte pas de code
*       si la valeur du message n'est pas plus long que X caractères
* @returns {boolean} false si une erreur de validation
* @returns {boolean} true si aucune erreur
*/
function testMessage(){
    if (beEmpty(message.value)){
        afficheErreur("message","Votre message est vide")
        return false
    }else if(hasCode(message.value)){
        afficheErreur("message","Vous ne pouvez pas écrire de code ici ou utiliser le caractere >")
        return false
    }else if(maxLength (message.value, maxLengthCompteur)){
        afficheErreur("message","Votre message est trop long")
        return false
    }
    enleveErreur("message")
    return true
};

// FOTMULAIRE AFFICHAGE DU MESSAGE ERREUR

/** affiche un message d'erreur
 * @param {string} id 
 * @param {string} messageErreur 
 */
function afficheErreur(id,messageErreur){
    // Role : Afficher une erreur : mettre une bordure sur le bon input, et remplir le paragraphe d'erreur associé
    // Parametres : id l'id de l'input dans le quel il y a une erreur
    // messageErreur : le message a afficher
    // retour: rien !
    let input = document.getElementById(id);
    input.classList.add("input-error");
    let p = document.getElementById("error-"+id);
    p.innerText = messageErreur;
    p.classList.remove("d-none");
}
/** efface le message d'erreur
 * @param {string} id 
 * 
 */
function enleveErreur(id){
    // Role: eneleve l'erreur sur l'input et cache le paragraphe associé
    let input = document.getElementById(id);
    input.classList.remove("input-error");
    let p = document.getElementById("error-"+id);
    p.innerText ="";
    p.classList.add("d-none");
}

/* FORMULAIRE FONCTIONS TEST */

/**CHAMPS VIDE : verifie si la valeur du champ est vide
 * @param {string} valueField la chaine de caractere du champ
 * @returns true si la chaine est vide sinon retourne false
 */
function beEmpty (valueField, texteDescription){
    if (valueField === "") { 
    return true; 
} return false
}
/** TEXTE CODE : verifie si la valeur du champ contient du code
 * @param {string} valueField la chaine de caractere du champ
 * @returns  true si il y a du code 
 * @returns false si il n'y a pas de code
 */
function hasCode(valueField){
    let reg = /<script/;
    if (reg.test(valueField)) {
    return true;
    } return false;
}
/** TEXTE ALPHANUMERIQUE : verifie si la valeur du champ contient des caracteres alphanumerique
 * @param {string} valueField la chaine de caractere du champ
 * @returns  true si il y a pas de caractere alphanumerique
 * @returns  si il y a des caracteres alphanumerique
 */
function onlyAlphanumeric(valueField){
let reg=/^[a-zA-ZÀ-ÿ'-]+(?:\s[a-zA-ZÀ-ÿ'-]+)*$/
if (reg.test(valueField)) {
    return true;
    } return false
}
/** NOMBRE COMPARAISON : compare si la valeur du champ est superieure à une valeur (logueur voulue) passée en parametre
 * @param {number} string la chaine de caractere du champ
 * @param {number} longueurMax la longueur max que peut prendre la chaine
 * @returns true si la chaine de caractere du camps est plus longue que le parametre sinon retourne false
 */
function maxLength (valueField, longueurMax){
    if(valueField.length >= longueurMax) {
    return true;
    } return false
}
/** EMAIL : verifie si la valeur du champ est au format email : exemple-.@exemple.extension
 * @param {string} valueField 
 * @returns true si le format est exemple-.@exemple.extension
 * @returns sinon false
 */
function formatEmail (valueField) {
    // format : exemple-.@exemple.extension
    let reg= /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if (reg.test(valueField)) {
        return true;
    } return false
}
/** REF PRODUIT : verifie si la valeur du champ est au format XXX-000000 ou xxx-000000
 * @param {string} value 
 * @returns true si le format est XXX-000000
 * @returns sinon false
 */
function formatRefProduit (value){
    let reg = /^[A-Za-z]{3}-\d{6}$/;
    if (reg.test(value)) {
        return true;
    } return false
}

// COMPTEUR DUREE PROMO

// declaration const globale - date de fin de promotion
const annee = 2024;
const mois = 4;
const jour = 31;
const heure = 12;
const minute = 0;
const seconde = 0;

affichageDelais()

/** affiche la durée
 * @param {*} // aucune
 * @returns {*} nothing
 */
function affichageDelais () {
    let duree = convertionDuree ()
    // creation du compteur dans le DOM
    let compteurPromo = document.querySelector(".compteur");
    let template = '';
    template = `
        <h4 class="compteur-titre">Il ne vous reste plus que : </h4>
        <div class="compteur-info flex">
            <div class="flex">
                <p class="compteur-jours">${duree.jours} jours | </p>
                <p class="compteur-heures">${duree.heures} heures | </p>
            <div>
            <div class="flex">
                <p class="compteur-minutes">${duree.minutes} minutes | </p>
                <p class="compteur-secondes">${duree.secondes} secondes</p>
            </div>
        </div>
    `;
    compteurPromo.innerHTML = template;
// pour planifier l'exécution de la fonction avant le prochain rafraîchissement de l'écran. Cela permet d'obtenir une mise à jour fluide de l'heure en temps réel.
requestAnimationFrame(affichageDelais);
}
/** convertit une date au format seconde, au format jour / moi / minute / seconde
 * @param {*} // aucune
 * @returns {number} durée
 */
function convertionDuree (){
    let delaisSecondes = calculDuree();
    // convertion date avec  Math.floor pour arrondir et supprimer les virgules
    let jours = Math.floor(delaisSecondes / (3600 * 24));
    let heures = Math.floor((delaisSecondes % (3600 * 24)) / 3600);
    let minutes = Math.floor((delaisSecondes % 3600) / 60);
    let secondesRestantes = Math.floor(delaisSecondes % 60);

    return {
        jours: jours,
        heures: heures,
        minutes: minutes,
        secondes: secondesRestantes
    };
}
/** calacul de la durrée restante
 * @param {*} // aucune
 * @returns {number} durée restante
 */
function calculDuree(){
    let dateCurrent = dateCurrent1();
    let dateNotCurrent = dateNotCurrent1 (annee, mois-1, jour, heure, minute, seconde);
    // calacul de la durrée restante entre les deux dates en seconde
    let dureeMillisecondes = dateNotCurrent - dateCurrent
    // durrée en seconde 
    let duree = dureeMillisecondes / 1000
    return duree;
}
/** convertit en objet date
 * @param {number} annee 
 * @param {number} mois 
 * @param {number} jour 
 * @param {number} heure 
 * @param {number} minute 
 * @param {number} seconde 
 * @returns {number} date cuurent au format en seconde
 */
function dateNotCurrent1 (anneeFin, moisFin, jourFin, heureFin, minuteFin, secondeFin) {
    // instentiation objet date
    let dateNotCurrent = new Date(anneeFin, moisFin, jourFin, heureFin, minuteFin, secondeFin);
    return dateNotCurrent;
}

/** recupere la date current du navigateur
 * @param {*} // aucune
 * @returns {number} date cuurent 
 */
function dateCurrent1(){  
    // instentiation objet date
    let dateCurrent = new Date();
    return dateCurrent;
}
