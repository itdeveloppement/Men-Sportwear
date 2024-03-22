// import des fonctions
import { openModal } from '../../assets/js/fonctionsAffichage.js';
import { changeTypo } from '../../assets/js/fonctionsAffichage.js';
import { cutString } from '../../assets/js/fonctionsAffichage.js';
cutString

// DECLARATION GLOBALE

let etat = true;

// NAV BAR ET NAV MODALE

// ouverture et fermeture burger et modale au click
document.querySelector(".hamburger").addEventListener("click", ()=> {
    openModal()
});

// AFFICHAGE CARTE FOOTER

// Affichache de la carte du footer et de la position
//bibliotheque https://leafletjs.com/reference.html
 
// recuperation des coordonnée de saint etienne dans la base nominate
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

// changement de la typo du site nav
document.getElementById("btn-typo").addEventListener("click", changeTypo);
// changement de la typo du site modal
let modal = document.querySelector(".header-modal");
modal.addEventListener("click", changeTypo);

// AFFICHAGE DES CARTES PRODUIT

// recuperation des donnée au format json
fetch("./assets/json/baskets.json")
.then (response=>{
    return response.json()
})
.then (response=>{
    console.log(response)
    buildCards(response);


let btnPrix = document.getElementById("iconPrix")
btnPrix.addEventListener("click", () => {
    prixOrdonnes (response);
})
})

/** afficher les cartes produits avec les données
 * 
 * @param {Objet} datas 
 * @return nothing
 */
function buildCards(datas){
    // ciblage de l'endroit de l'insertion dans le DOM
    let zone = document.querySelector(".categorie-produit")
    // declaration du template à construire
    let template = '';
    // extraction des données de l'objet : ici creation d'un tableau de profils

    // construction dom 
    datas.forEach(card=>{
        template += 
        `
        <a class="categorie-card" href="produit.template.html?name=${card.nom}" title="lien vers la fiche produit">
            <article>
                <div class="categorie-card-container-img">
                    <img src="./assets/images/imagesProduits/${card.photo}" alt="photo de bascket">
                </div>
                <div class="categorie-card-title flex">
                    <p class="categorie-card-name">${card.nom}</p>
                    <p class=categorie-card-prix>${card.prix} €</p>
                </div>
                <p categorie-card-description>${card.description}</p>
            </article>
        </a>
        `;    
    });  
    
    // ajout au html
    zone.innerHTML = template;
}

// ORDONNE LES CARDS PRIX

/**trie par odre croissant ou decroissant les prix
 * 
 * @param {Objet} datas 
 * @returns {Objet} les elements classé par odre de prix
 */
function prixOrdonnes (datas) {
    
    if (etat) {
        // tri par ordre croissant
        datas.sort(function(a, b) {
            etat = false;
            return a.prix - b.prix
        });
    } else {
        // tri par ordre decroissant
        datas.sort(function(a, b) {
            etat = true;
            return b.prix - a.prix
        });
    }
    // affichage des produit
    buildCards(datas);
}
