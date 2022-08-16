//la variable params récupère l'url de la page   
const params = new URLSearchParams(document.location.search);
// la variable id va récupérer la valeur du paramètre _id
const id = params.get("_id");
// On Affiche la valeur de id dans la console
console.log(id);

//  RÉCUPÉRATION DES PRODUITS DEPUIS L'API
fetch("http://localhost:3000/api/products")
    // DEMANDE DE RECEVOIR LA REPONSE EN J.SON
    .then((res) => res.json())
    .then((articles) => {
        products(articles);
    })

    // AFFICHAGE D'UN MESSAGE EN CAS D'ERREUR
    .catch((err) => {
        document
            .querySelector("#items")
            .innerHTML = `<h1> Ce site est en maintenance,</<br> nous nous excusons pour la gêne occasionné.</h1>`;
        console.log(err + "empêche la réponse de s'afficher");
    });

// CREATION OBJET CLIENT
let articleClient = {};
articleClient._id = id;

// FUNCTION - AFFICHAGE PRODUIT
function products(article) {
    // DECLARATION DES VARIABLE DES DIFFERENTS ELEMENTS
    let img = document.querySelector("article div .item__img");
    let title = document.querySelector("#title");
    let price = document.querySelector("#price");
    let description = document.querySelector("#description");
    let colorOption = document.querySelector("#colors");
    // BOUCLE RECHERCHE CHOIX DE L'ARTICLE
    for (let choice of article) {

        if (id === choice._id) {
            img.innerHTML = `<img scr="${choice.imageUrl}"alt="${choice.altTxt}">`;
            title.textContent = `${choice.name}`;
            price.textContent = `${choice.price}`;
            description.textContent = `${choice.description}`;
            // BOUCLE RECHERCHE DES COULEURS POUR CHAQUE PRODUIT
            for (let color of choice.colors) {
                colorOption.innerHTML += `<option value="${color}">${color}</option>`;
            }
        }
    }
    console.log("Affichage Ok");

}