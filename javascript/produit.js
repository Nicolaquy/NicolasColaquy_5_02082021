const resultats = document.getElementById('container-page-produit');
let params = (new URL(document.location)).searchParams;
let id = params.get('id');
let url = 'http://localhost:3000/api/cameras'
let url_produit = url + '/' + id;
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// Appel a l'API
const fetchCamera = async() => {
	camera = await fetch(url_produit)
    .then(res => res.json());
};
// Mise en place de l'affichage de l'appareil photo sélectionné

const showCamera = async() => {
	await fetchCamera();
    
resultats.innerHTML = (

  ` 
  <div class="ficheProduit">
  <img class="camera-image" src="${camera.imageUrl}" alt="Image appareil photo"/>
   <div class="camera-info">
    <h5 class="camera-name">${camera.name}</h5>
      <p class="camera-description">${camera.description}</p>
      <label for="option-produit" class="filtre">Lentille</label>
          <select name="option-produit" class= "barFiltre" id="option-produit">
          </select></br>
      <label for="quantite" class="filtre">Quantite</label>
      <button aria-label="Quantité moins" class="boutonPM" onclick="down()"><i class="fas fa-caret-square-left"></i></button><input type="number" class ="quantite" name="quantite" id="quantite" min="1" max="10" value="1"><button aria-label="Quantité plus" class="boutonPM" onclick="up()"><i class="fas fa-caret-square-right"></i></button>
      <p class="camera-price">Prix: ${numberWithSpace(camera.price/100 + " €")} / unité</p>
      <button class="btn" onclick="window.location.href = '/index.html'">Nos autre produits</button>
      <button class="btn" onclick="window.location.href = 'panier.html'">Voir mon panier</button>
      <button class= "btn ajoutPanier" id="btn-envoyer" type="submit" name="btn-envoyer">Ajouter au panier</button>
      
  </div>
</div> 
`
);

// Mise en place du choix de la lentille
let optionProduit = document.getElementById('option-produit');
        let numberLenses = camera.lenses;
        for (let i = 0; i < numberLenses.length; i++) {
            optionLens = document.createElement('option');
            optionProduit.appendChild(optionLens);
            optionLens.textContent = camera.lenses[i];
        }

//Mise en place du bouton d'envoi au panier 
const btn_panier = document.getElementById('btn-envoyer');

    btn_panier.addEventListener("click", (e) => {
        e.preventDefault();
        let quantite = document.getElementById('quantite');
        let choix_produit = {
            nomProduit: camera.name,
            imgProduit: camera.imageUrl,
            idProduit: id,
            option: optionProduit.value,
            prixProduit: camera.price / 100,
            quantiteProduit: Number(quantite.value),
            prixTotalProduit: camera.price/100*quantite.value
        }
    
//Envoi au Local Storage

let produitLocalStorage = JSON.parse(localStorage.getItem('products'));
const ajoutLocalStorage =  () => {
    produitLocalStorage.push(choix_produit)
    localStorage.setItem('products', JSON.stringify(produitLocalStorage))
    alert("Votre article a bien été ajouté au panier");
};

//Si déja existant
if(produitLocalStorage){
    let quantiteProduit = choix_produit.quantiteProduit;
    let calculTotalQuantity= [];
    let prixTotalProduit = choix_produit.prixTotalProduit;
    calculTotalQuantity.push(quantiteProduit);
    let productRef = choix_produit.idProduit + ":" + document.getElementById('option-produit').value;
    const filtreProduit = produitLocalStorage.filter(
    (el) => el.idProduit + ":" + el.option === productRef
    );
    let filtreProduitRef;
    let oldProduct;
    for (q = 0; q < filtreProduit.length; q++){
        filtreProduitRef = filtreProduit[q].idProduit + ":" + filtreProduit[q].option;
        filtreProduitQuantite = filtreProduit[q].quantiteProduit;
        oldProduct = filtreProduit[q].idProduit + ":" + filtreProduit[q].option};
       
// Si Article pas dans le parnier
        if(productRef !== filtreProduitRef){
            ajoutLocalStorage();
            window.location.reload();
        }
// Si déja present dans le panier
        else {
            calculTotalQuantity.push(filtreProduitQuantite);
            const quantityTotal = calculTotalQuantity.reduce(reducer);

            choix_produit.quantiteProduit = quantityTotal;
            choix_produit.prixTotalProduit = choix_produit.prixProduit*quantityTotal;

            produitLocalStorage = produitLocalStorage.filter(
                (el) => el.idProduit + ":" + el.option != oldProduct
            );

            ajoutLocalStorage();
            window.location.reload();

        }

//Si panier vide, création clef produit
} else{
    produitLocalStorage = [];
    ajoutLocalStorage();
    window.location.reload();
}
    })
}

showCamera();


// Mise en place des boutons pour le choix du nombre d'articles
function up() {
    if(quantite.value < 10){
    
    quantite.value= parseInt(quantite.value)+1;
}else {
    alert("Vous pouvez commander jusqu'a 10 appareils maximum")
}
}

function down() {
    if(quantite.value > 1){
        quantite.value= parseInt(quantite.value)-1;
    }
}