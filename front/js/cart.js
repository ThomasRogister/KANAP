
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

  document.querySelector("#cart__items")
    .insertAdjacentHTML("beforeend", `<article class="cart__item" data-id="${article._id}" data-color="${article.color}">
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
        <div id="delete" onclick="removeProduct('${article._id}')" class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`);
}

// Supprimer article du panier
function removeProduct(id) {
  alert('voulez-vous vraiment supprimer cer article?');
  const recupBasket = localStorage.getItem("storedBasket");
  const basketItems = JSON.parse(recupBasket);
  const newBasket = basketItems.filter(p => p._id !== id);
  localStorage.setItem("storedBasket", JSON.stringify(newBasket));
  location.reload();
}


function showPriceAndQuantity(listLocalStorage, objectArticles) {
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
    showPriceAndQuantity(basketItems, objectArticles);
  }
}


// *****************************************Validation du formulaire***************************************************
// ********************************************************************************************************************


// Initialisation des RegExp
let form = document.querySelector(".cart__order__form");
const emailRegex = new RegExp('^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$', 'g');
const lettersRegex = new RegExp('^[a-zA-Z ,.-]+[-a-zA-Zàâäéèêëïîôöùûüç ]+$');
const addressRegex = new RegExp('^[0-9]{1,3}[,. ]{1}[-a-zA-Zàâäéèêëïîôöùûüç ]{5,100}$');


function validInput(regex, champ, valismsg, invalidemsg) {
  champ.addEventListener("change", () => {
    let msg = champ.nextElementSibling;
    if (regex.test(champ.value)) {
      msg.textContent = valismsg;
    } else {
      msg.textContent = invalidemsg;
    }
  })
};

validInput(lettersRegex, form.firstName, "prénom valide", "prénom invalide")
validInput(lettersRegex, form.lastName, "nom valide", "nom invalide")
// validInput(lettersRegex, form.firstName, "prénom valide", "prénom invalide")
// validInput(lettersRegex, form.firstName, "prénom valide", "prénom invalide")


document.getElementById("order").addEventListener("click", (event) => {
  event.preventDefault();
  if (lettersRegex.test(form.firstName.value) &&
    lettersRegex.test(form.lastName.value) &&
    addressRegex.test(form.address.value) &&
    lettersRegex.test(form.city.value) &&
    emailRegex.test(form.email.value)) {
    const basket = JSON.parse(localStorage.getItem("storedBasket"))
    const data = {
      contact: {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        address: form.address.value,
        city: form.city.value,
        email: form.email.value
      },
      products: basket.map(function (product) {
        return product._id
      })

    }
    console.log(data)
    fetch("http://localhost:3000/api/products/order", {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        window.location = '/front/html/confirmation.html?orderId=' + response.orderId;
        console.log(response)
      })

      // AFFICHAGE D'UN MESSAGE EN CAS D'ERREUR
      .catch((err) => {
        document
          .querySelector("#cartAndFormContainer")
          .innerHTML = "<h1> Cette page est en maintenance,</<br> nous nous excusons pour la gêne occasionné.</h1>";
        console.log(err);

      });

  } else {
    alert("veuillez remplir tous les champs")
  }
})




