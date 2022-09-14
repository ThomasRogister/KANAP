const params = new URLSearchParams(document.location.search);

// const "id" permet de récupérer la valeur de la clef "_id"
const id = params.get("orderId");
document.getElementById("orderId").textContent = id;