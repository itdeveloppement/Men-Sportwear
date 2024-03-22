// import des fonctions
import { openModal } from '../../assets/js/fonctionsAffichage.js';
import { changeTypo } from '../../assets/js/fonctionsAffichage.js';


var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

  // ouverture et fermeture burger et modale au click
document.querySelector(".hamburger").addEventListener("click", ()=> {
    openModal()
});

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
