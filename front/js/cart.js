


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
function displayCartItem(article, objectArticles) {
    const result = objectArticles.find(p => p._id === article._id);




    document.querySelector("#cart__items").insertAdjacentHTML("beforeend", `<article class="cart__item" data-id="${article._id}" data-color="${article.color}">
    <div class="cart__item__img">
      <img src="${result.imageUrl}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${result.name}</h2>
        <p>${article.color}</p>
        <p>${result.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`);
}

function showPrice(listLocalStorage, objectArticles) {
    let totalQuantity = 0;
    let totalPrice = 0;
    listLocalStorage.map(o => {
        const result = objectArticles.find(p => p._id === o._id);
        const itemPrice = result.price;
        const quantity = parseInt(o.quantity);
        const total = quantity * itemPrice;
        totalPrice = total + totalPrice;
        totalQuantity = quantity + totalQuantity;
    })
    document.querySelector("#totalQuantity").innerHTML = `${totalQuantity}`;
    document.querySelector("#totalPrice").innerHTML = `${totalPrice}`;
}



// FUNCTION DETERMINE CONDITIONS AFFICHAGE BASKET
function showBasket(objectArticles) {
    // ON RECUP PANIER EN JSON
    const basket = localStorage.getItem("storedBasket");
    if (!basket) {
        document.querySelector("#cart__items").innerHTML = "<h1>panier vide</h1>";
    } else {
        const basketItems = JSON.parse(basket);
        basketItems.map(p => displayCartItem(p, objectArticles));
        showPrice(basketItems, objectArticles);
    }



    // SI LE PANIER CONTIENT DEJA AU MOINS 1 ARTICLE
    // for (let choice of basket) {
    //     console.log(choice);
    //     for (let p = 0, i = index.length; p < i; p++) {
    //         if (choice._id === index[p]._id)
    //             // CREATION VARIABLES POUR AJOUT DES DONNEES ARTICLE AU PANIER INDEXE
    //             choice.name = index[p].name;
    //         choice.prix = index[p].price;
    //         choice.image = index[g].imageUrl;
    //         choice.description = index[g].description;
    //         choice.alt = index[g].altTxt;
    //     }
    // }
    // AFFICHAGE DE PANIER (DONNEES ARTICLE AU DESSUS) + DONEES DU LOCALSTORAGE
    // display(basket);
}
//     else {
//     // SI LE PANIER EST VIDE, ON AFFICHE SES INFOS ET UN MESSAGE
//     document.querySelector("#totalQuantity").innerHTML = "0";
//     document.querySelector("#totalPrice").innerHTML = "0";
//     document.querySelector("h1").innerHTML =
//         "Vous n'avez pas d'article dans votre panier";
// }


