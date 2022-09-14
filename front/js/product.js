
// const "params" permet de récupérer les données l'url de la page
const params = new URLSearchParams(document.location.search);

// const "id" permet de récupérer la valeur de la clef "_id"
const id = params.get("_id");

// affichage de "id" dans la console
console.log(id);


// recuperation des produits depuis l'api 
fetch(`http://localhost:3000/api/products/${id}`)
    // demande de retour réponse en json
    .then((res) => res.json())
    // réponse sera appelé objetArticles
    .then((objetArticles) => {
        // appel de la function "products" pour l'affichage des produits
        product(objetArticles)
    })

    // affichage message en cas d'erreur
    .catch((err) => {
        document.querySelector(".item")
            .innerHtml = "ERREUR 404 :/";
        console.log(err)
    });

// function pour l'affichage des produits
function product(product) {
    // variables des différents éléments des produits
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
        //boucle de recherche de couleurs du produit
        for (let color of product.colors) {
            colorOption.innerHTML += `<option value="${color}">${color}</option>`;
        }
    }
}

//déclaration variable "articleClient " (choix du produit)
let articleClient = {};
articleClient._id = id;

function enableCart() {
    document.querySelector("#addToCart").style.color = "white";
    document.querySelector("#addToCart").textContent = "Ajouter au panier";
}


//déclaration variable pour les choix de  couleurs 
let colorChoice = document.querySelector("#colors");
colorChoice.addEventListener("input", (ec) => {
    // déclarartion variable "colorProduct" pour le choix de la couleur
    let colorProduct;
    //récupération de valeur(value) de la cible (target) dans (ec) #color
    colorProduct = ec.target.value;
    //ajout de la couleur dans objet panier
    articleClient.color = colorProduct;
    //reset couleur et texte si il y a une actions sur les inputs 
    enableCart()
    console.log(colorProduct);
});

//déclaration variable pour le choix de quantité
let quantityProduct;
let quantityChoice = document.querySelector('input[id="quantity"]');
quantityChoice.addEventListener("input", (eq) => {
    //déclarartion variable "quantityProduct" pour le choix de quantité
    quantityProduct = eq.target.value;
    //la quantité de l'article correpsond à la nouvelle quantité
    articleClient.quantity = quantityProduct;
    enableCart()
    console.log(quantityProduct);
})

//condition de validation button pour ajouter au panier
//déclaration variable pour aller chercher l'élément (querySelector) 
let productChoice = document.querySelector("#addToCart");
//et écouter l'élément (addEventListener) au 'click'
productChoice.addEventListener("click", () => {
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
        // sinon un message dans l'élément "addToCart" (textContent) s'affiche
        console.log("validation ok");
        document.querySelector("#addToCart").textContent = "Le kanap est dans le panier!";
        // et on appel la function addNewArticle qui permet d'ajouter un nouvel article au panier
        addNewProduct(articleClient);
    }
});


function productStored(storedBasket) {
    const storage = localStorage.getItem(storedBasket);
    if (!storage) {
        return null;
    } else {
        return JSON.parse(storage);
    }
}

function addNewProduct(articleClient) {
    let productStored = localStorage.getItem("storedBasket");
    if (!productStored) {
        localStorage.setItem("storedBasket", JSON.stringify([]));
        productStored = localStorage.getItem("storedBasket");
    }
    const cartJSON = JSON.parse(productStored);
    if (cartJSON.find(i => articleClient._id === i._id && articleClient.color === i.color)) {
        alert("article déjà choisi.");
        const productIndex = cartJSON.findIndex(i => articleClient._id === i._id && articleClient.color === i.color)
        console.log(productIndex)
        const addQuantity = parseInt(articleClient.quantity) + parseInt(cartJSON[productIndex].quantity);
        cartJSON[productIndex].quantity = addQuantity
        localStorage.setItem("storedBasket", JSON.stringify(cartJSON));

    } else {
        const newProduct = [...cartJSON, articleClient];
        localStorage.setItem("storedBasket", JSON.stringify(newProduct));

    }
}




//********************************************************************************** */
// function Pierre


// function getLocalStorage(key) {
//     const storage = localStorage.getItem(key);
//     if (!storage) {
//         return null;
//     } else {
//         return JSON.parse(storage);
//     }
// }

// function myBeautifulFunction(...) {
//     const storage = getLocalStorage("basket");
//     if (storage) {
//         ...
//     }
// }
//************************************************************************************** */

