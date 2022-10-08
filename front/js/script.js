//récupération des produits depuis l'api
fetch("http://localhost:3000/api/products")
    // transformer la res. en JSON
    .then((res) => res.json())
    //la répnse(JSON) sera appelé "articles"
    .then((articles) => {
        // appel de la function d'affichage
        products(articles);
    })

    //affichage en cas d'erreur
    .catch((err) => {
        document
            .querySelector("#items")
            .innerHtml = `<h1> Problèmes réseaux =/ <br> veuillez réessayer plus tard :/</h1>`
    });

// FUNCTION - AFFICHAGE DES ARTICLES SUR L'INDEX
function products(index) {
    const sectionItems = document.querySelector("#items");
    // BOUCLE POUR INSERTION DES PRODUIT EN HTML DANS LE BODY
    for (let article of index) {
        sectionItems.innerHTML += `<a href="./product.html?_id=${article._id}">
        <article>
            <img src="${article.imageUrl}" alt="${article.altTxt}">
            <h3 class="productName">${article.name}</h3>
            <p class="productDescription">${article.description}</p>
        </article>
    </a>`;
    }
}
