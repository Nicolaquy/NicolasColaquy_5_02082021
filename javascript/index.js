let cameras;
let searchTerm = '';

// Appel a l'APIL
const fetchCameras = async() => {
	cameras = await fetch("http://localhost:3000/api/cameras")
    .then(res => res.json());
};

// Mise en place de l'affichage des appareils photos
const showCameras = async() => {
	await fetchCameras();

  let cameraIndex = cameras.filter(camera => camera.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if(cameraIndex.length === 0) {
    results.innerHTML = 
        `
        <div class="vide">
         <img class="oops" src="/images/oops.gif" alt="">
         <p><span class="oups">Oups..</span><br> Nous n'avons pas ce produit en stock ou ne le proposons pas à la vente,<br>
         Ne vous en faites pas, nous avons une large game d'appareils photos pour vous satisfaire !</p>
        </div>
         `;
  }else{
  results.innerHTML = (

      cameraIndex.map(camera => ( 

          ` 
              
                <div class="card">
                <a href = "/html/produit.html?id=${camera._id}">
                  <img class="camera-image" src="${camera.imageUrl}" />
                  <div class="camera-info">
                    <h5 class="camera-name">${camera.name}</h5>
                      <p class="camera-description">${camera.description}</p>
                      <p class="camera-price">Prix: ${numberWithSpace(camera.price/100 + " €")}</p>
                      <a href="/html/produit.html?id=${camera._id}" class="btn">En savoir plus</a>
                  </div>
                  </a>
                </div>
              
          `
        )).join('')
    );
  }
}; 
showCameras();

// Mise en place de la recherche par l'Input
searchInput.addEventListener('input', (e) => {searchTerm = e.target.value;
  showCameras();
});
