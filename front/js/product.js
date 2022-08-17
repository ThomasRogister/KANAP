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



