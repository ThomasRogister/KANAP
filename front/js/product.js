
// URLsearchParams créé un objet pour avoir plus facilement accès au données récup par document.location.search
// - (document.location.search) permet de récupérer les données l'url de la page après "?"
const params = new URLSearchParams(document.location.search);

// const "id" permet de récupérer la valeur de la clef "_id"
const id = params.get("_id");

// affichage de "id" dans la console
console.log(id);


// recuperation du produit via son id depuis l'API
fetch(`http://localhost:3000/api/products/${id}`)
    // transforme la réponse en json
    .then((res) => res.json())
    // réponse sera appelé objetArticles
    .then((objetArticles) => {
        // appel de la function "product" pour l'affichage du produit concerné
        product(objetArticles)
    })

    // affichage message en cas d'erreur
    .catch((err) => {
        document.querySelector(".item")
            .innerHtml = "Problèmes réseaux =/ <br> veuillez réessayer plus tard";
        console.log(err)
    });

// function pour l'affichage du produit concerné
function product(product) {
    // variables des différents éléments du produit concerné
    let image = document.querySelector(".item__img");
    let title = document.querySelector("#title");
    let price = document.querySelector("#price");
    let colorOption = document.querySelector("#colors");
    let description = document.querySelector("#description");

    console.log(product)
    if (product) {
        image.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
        title.textContent = `${product.name}`;
        price.textContent = `${product.price}`;
        description.textContent = `${product.description}`;
        // insertion des differentes options de couleur dans le HTML
        for (let color of product.colors) {
            colorOption.innerHTML += `<option value="${color}">${color}</option>`;
        }
    }
}

//déclaration variable "articleClient " (choix du produit) - selon le choix de l'aticle et de ses options (couleur et quantité)
let articleClient = {};
articleClient._id = id;

function enableCart() {
    document.querySelector("#addToCart").style.color = "white";
    document.querySelector("#addToCart").textContent = "Ajouter au panier";
}


// choix de la couleur 
let colorChoice = document.querySelector("#colors");
colorChoice.addEventListener("input", (ec) => {
    //récupération de valeur(value, nom de la couleur) de la cible (target) dans (ec) #color
    let colorProduct = ec.target.value;
    //ajout de la couleur dans objet articleClient
    articleClient.color = colorProduct;
    //reset couleur et texte 
    enableCart()
});

// choix de quantité
let quantityChoice = document.querySelector('input[id="quantity"]');
quantityChoice.addEventListener("input", (eq) => {
    let quantityProduct = eq.target.value;
    //la quantité de l'article correpsond à la nouvelle quantité (mise à jour de la quantité)
    articleClient.quantity = quantityProduct;
    //reset de la quantité
    enableCart()
})

let productChoice = document.querySelector("#addToCart");
// écouter l'élément (addEventListener) au 'click'
productChoice.addEventListener("click", () => {
    //condition de validation button pour ajouter au panier
    if (
        articleClient.quantity < 1 ||
        articleClient.quantity > 100 ||
        articleClient.quantity === undefined ||
        articleClient.color === "" ||
        articleClient.color === undefined
    ) {
        // si les condition si dessus sont exact alors, le message d'alerte s'affiche
        alert("Veuillez renseigner une quantité et une couleur.");

    } else {
        // sinon un message dans l'élément "addToCart" ("Le kanap est dans le panier!") s'affiche
        console.log("validation ok");
        document.querySelector("#addToCart").textContent = "Le kanap est dans le panier!";
        // et on appel la function addNewArticle qui permet d'ajouter un nouvel article au panier
        addNewProduct(articleClient);
    }
});

// function pour ajouter un article (premier, nouveau ou déjà présent)
function addNewProduct(articleClient) {
    let productStored = localStorage.getItem("storedBasket");
    // si productStored ne contient aucun article alors on créé un tableau storedBasket
    if (!productStored) {
        localStorage.setItem("storedBasket", JSON.stringify([]));
        productStored = localStorage.getItem("storedBasket");
    }
    const cartJSON = JSON.parse(productStored);
    // si un article correspond à l'article rechercher avec "find",  un message d'alert s'affiche et on ajoute la nouvelle quantité du produit contenu dans le panier du localStorage
    if (cartJSON.find(i => articleClient._id === i._id && articleClient.color === i.color)) {
        alert("article déjà choisi.");
        const productIndex = cartJSON.findIndex(i => articleClient._id === i._id && articleClient.color === i.color)
        console.log(productIndex)
        const addQuantity = parseInt(articleClient.quantity) + parseInt(cartJSON[productIndex].quantity);
        cartJSON[productIndex].quantity = addQuantity
        localStorage.setItem("storedBasket", JSON.stringify(cartJSON));
        // sinon on ajoute l'article sans message d'alert dans le panier du localStorage
    } else {
        const newProduct = [...cartJSON, articleClient];
        localStorage.setItem("storedBasket", JSON.stringify(newProduct));

    }
}



