// params correspond à une recherche faite l'URL de la page
const params = new URLSearchParams(document.location.search);

// on demande qu'il recupère le numéro de commande (orderId) via la variable "id"
const id = params.get("orderId");
// et de l'afficher sur la page à l'emplacement de #orderID
document.getElementById("orderId").textContent = id;