


const basket = document.location.href;

//  RÉCUPÉRATION DES PRODUITS DEPUIS L'API SI ON EST SUR LA PAGE PANIER
if (basket.match("cart")) {

    fetch("http://localhost:3000/api/products")
        // DEMANDE DE RECEVOIR LA REPONSE EN J.SON
        .then((res) => res.json())
        .then((objetArticles) => {
            console.log(objetArticles)
            showBasket(objetArticles);
        })

        // AFFICHAGE D'UN MESSAGE EN CAS D'ERREUR
        .catch((err) => {
            document
                .querySelector("#cartAndFormContainer")
                .innerHTML = "<h1> Cette page est en maintenance,</<br> nous nous excusons pour la gêne occasionné.</h1>";
            console.log(err);

        });

} else {
    console.log("page confirmation");
}

// FUNCTION DETERMINE CONDITIONS AFFICHAGE BASKET
function showBasket(index) {
    // ON RECUP PANIER EN JSON
    let basket = JSON.parse(localStorage.getItem("storedBasket"));
    // SI LE PANIER CONTIENT DEJA AU MOINS 1 ARTICLE
    for (let choice of basket) {
        console.log(choice);
        for (let p = 0, i = index.length; p < i; p++) {
            if (choice._id === index[p]._id)
                // CREATION VARIABLES POUR AJOUT DES DONNEES ARTICLE AU PANIER INDEXE
                choice.name = index[g].name;
            choice.prix = index[g].price;
            choice.image = index[g].imageUrl;
            choice.description = index[g].description;
            choice.alt = index[g].altTxt;
        }
    }
    // AFFICHAGE DE PANIER (DONNEES ARTICLE AU DESSUS) + DONEES DU LOCALSTORAGE
    display(basket);
}
else {
    // SI LE PANIER EST VIDE, ON AFFICHE SES INFOS ET UN MESSAGE
    document.querySelector("#totalQuantity").innerHTML = "0";
    document.querySelector("#totalPrice").innerHTML = "0";
    document.querySelector("h1").innerHTML =
        "Vous n'avez pas d'article dans votre panier";
}


