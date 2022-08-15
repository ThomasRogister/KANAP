// FUNCTION - RÉCUPÉRATION DES PRODUITS DEPUIS L'API
function getArticles() {
    fetch("http://localhost:3000/api/products")
        // DEMANDE DE RECEVOIR LA REPONSE EN J.SON
        .then((res) => res.json())
        // LA RÉPONSE JSON SERA APPELÉ "ARTICLES"
        .then((articles) =>
            //APPEL DE LA FUNCTION D'AFFICHAGE 
            products(articles))

        // AFFICHAGE D'UN MESSAGE EN CAS D'ERREUR
        .catch((err) => {
            document
                .querySelector("#items")
                .innerHTML = "<h2>Ce site est en maintenance,<br> nous nous excusons pour la gêne occasionné.</h2>"

        });

    // FUNCTION - AFFICHAGE DES ARTICLES SUR L'INDEX.HTML
    function products(index) {
        let sectionItems = document
            .querySelector("#items");
        // BOUCLE POUR RÉCUPÉRATION DE CHAQUE ARTICLE
        for (let article of index) {
            sectionItems.innerHTML += <a href="./product.html?_id=${article._id}">
                <article>
                    <img scr="${article.imgUrl}" alt="${article.altTxt}" />
                    <h3 class="productName">${article.name}</h3>
                    <p class="productDescription">${article.description}</p>
                </article>
            </a>;

        }

    }

}