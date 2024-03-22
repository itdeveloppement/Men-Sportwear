/** ouverture et fermeture burger et modale
 *  @param {*} // pas de parametre
 *  @return ne retourne rien 
 */
export function openModal () {
    let modale = document.querySelector(".header-modal");
    modale.classList.toggle("header-modal--is-open");
    let burger = document.querySelector(".header-burger");
    burger.classList.toggle("is-active");
}


/** change typo du site
 *  @param {*} // pas de parametre
 *  @return ne retourne rien
 */
export function changeTypo() {
    // ciblage
    let body = document.querySelector("body");
    let btnTypo = document.getElementById("btn-typo");
    // ajout de classe
    body.classList.toggle("newTypo");
    btnTypo.classList.toggle("newBtnTypo");
}

/** coupe la longueur du texte
*  @param {number} nombre le nombre de caractere a afficher
*  @param {string} className le nom de la classe du paragraphe concerné
*  @return ne retourne rien 
*/
export function coupeTexte(nombre, className){
   let paragraphs = document.querySelectorAll(className)
   paragraphs.forEach(p=>{
       let text = p.innerText
       p.innerText = text.slice(0,nombre)+"..."
   })
}

/** couper la longueur d'une chaine de caractere
 * 
 * @param {*} nombre 
 * @param {*} text 
 * @returns la chaine de caractere coupée
 */
export function cutString (nombre, text){
    let description = text.slice(0,nombre)+"..."
    return description;
}