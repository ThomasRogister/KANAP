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
    .then((objetArticles) => {
        products(objetArticles);
    })

    // AFFICHAGE D'UN MESSAGE EN CAS D'ERREUR
    .catch((err) => {
        document
            .querySelector(".item")
            .innerHTML = "<h1> Ce site est en maintenance,</<br> nous nous excusons pour la gêne occasionné.</h1>";
        console.log(err);

    });



// FUNCTION - AFFICHAGE PRODUIT
function products(products) {
    // DECLARATION DES VARIABLE DES DIFFERENTS ELEMENTS
    let image = document.querySelector("article div.item__img");
    let title = document.querySelector("#title");
    let price = document.querySelector("#price");
    let description = document.querySelector("#description");
    let colorOption = document.querySelector("#colors");
    // BOUCLE RECHERCHE CHOIX DE L'ARTICLE
    const product = products.find(p => p._id === id);
    console.log(product)
    if (product) {
        // console.log(product)
        image.innerHTML = `<img src="${product.imageUrl}"alt="${product.altTxt}">`;
        title.textContent = `${product.name}`;
        price.textContent = `${product.price}`;
        description.textContent = `${product.description}`;
        // BOUCLE RECHERCHE DES COULEURS POUR CHAQUE PRODUIT
        for (let color of product.colors) {
            colorOption.innerHTML += `<option value="${color}">${color}</option>`;


        }
    }
}
let articleClient = {};
articleClient._id = id;


let colorChoice = document.querySelector("#colors");
colorChoice.addEventListener("input", (ec) => {
    let colorProduct;
    // RECUPERATION DE VALUE DE LA CIBLE(target) DANS (e)-#colors
    colorProduct = ec.target.value;
    // AJOUT DE LA COULEUR A OBJET PANIER CLIENT
    articleClient.color = colorProduct;
    //  RESET COULEUR ET TEXTE SI ACTION SUR LES INPUTS => COMMANDE DU MÊME ARTICLE
    document.querySelector("#addToCart").style.color = "white";
    document.querySelector("#addToCart").textContent = "Ajouter au panier";
    console.log(colorProduct);
});

let quantityChoice = document.querySelector('input[id="quantity"]');
let productQuantity;
quantityChoice.addEventListener("input", (eq) => {
    productQuantity = eq.target.value;
    // AJOUT QUANTITE => OBJET PANIER CLIENT
    articleClient.quantity = productQuantity;
    //  RESET COULEUR ET TEXTE SI ACTION SUR LES INPUTS => COMMANDE DU MÊME ARTICLE
    document.querySelector("#addToCart").style.color = "white";
    document.querySelector("#addToCart").textContent = "Ajouter au panier";
    console.log(productQuantity);
})


// CONDITION DE VALIDATION BTN "ajouter au panier"
let productChoice = document.querySelector("#addToCart");
productChoice.addEventListener("click", () => {
    if (
        articleClient.quantity < 1 ||
        articleClient.quantity > 100 ||
        articleClient.quantity === undefined ||
        articleClient.color === "" ||
        articleClient.color === undefined

    ) {
        // MESSAGE ALERTE
        alert("Veuillez renseigner une putain de couleur et une quantité connard!!");
    } else {
        console.log("validation effectué");
        document.querySelector("#addToCart").style.color = "rgb(0, 205, 0)";
        document.querySelector("#addToCart").textContent = "Produit ajouté !";
    }
});

// DECLARATION DES VARIABLES TABLEAUX
// 1ER TABLEAU => INITIALISATION DU PANIER
let productChoiceClient = [];
// RECUPERATION DU LOCALSTORAGE EN JSON
let productStored = [];
// CHOIX ARTICLE NON PRESENT DANS LOCALSTORAGE
let productTemporary = [];
// TABLEAU "productStored + productTemporary"
let productToPush = [];

function firstProduct() {
    console.log(productStored);
    if (productStored === nul) {
        productChoiceClient.push(articleClient);
        console.log(articleClient);
        return (localStorage.storedBasket = JSON.stringify(productChoiseClient));
    }
}