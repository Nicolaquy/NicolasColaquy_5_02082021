const resultats = document.getElementById('container-page-produit');
let params = (new URL(document.location)).searchParams;
let id = params.get('id');
let url = 'http://localhost:3000/api/cameras'
let url_produit = url + '/' + id;


const fetchCamera = async() => {
	camera = await fetch(url_produit)
    .then(res => res.json());
};

const showCamera = async() => {
	await fetchCamera();
resultats.innerHTML = (

  ` 
  <div class="ficheProduit">
  <img class="camera-image" src="${camera.imageUrl}" />
   <div class="camera-info">
    <h5 class="camera-name">${camera.name}</h5>
      <p class="camera-description">${camera.description}</p>
      <label for="option-produit" class="filtre">Lentille</label>
          <select name="option-produit" class= "barFiltre" id="option-produit">
          </select></br>
      <label for="quantite" class="filtre">Quantite</label>
      <input type="number" class = "barFiltre" name="quantite" id="quantite" min="1" max="10" value="1">
      <p class="camera-price">Prix: ${numberWithSpace(camera.price/100 + " €")} / unité</p>
      <button class="btn" onclick="window.location.href = '/index.html'">Nos autre produits</button>
      <button class= "btn" id="btn-envoyer" type="submit" name="btn-envoyer">Ajouter au panier</button>
  </div>
</div> 
`
)


let optionProduit = document.getElementById('option-produit');
        let numberLenses = camera.lenses;
        for (let i = 0; i < numberLenses.length; i++) {
            optionLens = document.createElement('option');
            optionProduit.appendChild(optionLens);
            optionLens.textContent = camera.lenses[i];
        }
        console.log(numberLenses);

const btn_panier = document.getElementById('btn-envoyer');
    console.log(btn_panier);

    btn_panier.addEventListener("click", (e) => {
        e.preventDefault();
        let quantite = document.getElementById('quantite');
        let choix_produit = {
            nomProduit: camera.name,
            imgProduit: camera.imageUrl,
            idProduit: id,
            option: optionProduit.value,
            prixProduit: camera.price / 100,
            quantiteProduit: quantite.value,
            prixTotalProduit: camera.price/100*quantite.value

        }
    console.log(choix_produit);

    // Local Storage

let produitLocalStorage = JSON.parse(localStorage.getItem('panier'));
const ajoutLocalStorage =  () => {
    produitLocalStorage.push(choix_produit)
    localStorage.setItem('panier', JSON.stringify(produitLocalStorage))
    alert("Votre article a bien été ajouté au panier");
};


if(produitLocalStorage){
    ajoutLocalStorage();

} else{
    produitLocalStorage = [];
    ajoutLocalStorage();
    
}

    })

}

showCamera();


function numberWithSpace(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

