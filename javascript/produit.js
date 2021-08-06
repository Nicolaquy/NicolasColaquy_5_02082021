const url_id = window.location.search;
const id = url_id.slice(1);
console.log(id);
const resultats = document.getElementById('container-page-produit');
let url = 'http://localhost:3000/api/cameras';
console.log(url);
let url_produit = url + '/' + id;
console.log(url_produit);

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
      <label for="option-produit" class="filtre">Objectif</label>
          <select name="option-produit" class= "barFiltre" id="option-produit">
              <option value="option 1">Option 1</option>
              <option value="option 2">Option 2</option>
          </select></br>
      <label for="quantite" class="filtre">Quantite</label>
      <input type="number" class = "barFiltre" name="quantite" id="quantite" min="1" max="10" value="1">
      <p class="camera-price">Prix: ${numberWithSpace(camera.price/100 + " €")} / unité</p>
      <button class="btn" onclick="window.location.href = '/index.html'">Nos autre produits</button>
      <button class= "btn" type="submit">Ajouter au panier</button>
  </div>
</div> 
`
)
}

showCamera();


function numberWithSpace(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
