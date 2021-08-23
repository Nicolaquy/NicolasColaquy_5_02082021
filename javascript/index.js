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
results.innerHTML = (

    cameras
      .filter(camera => camera.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(camera => ( 

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
}; 
showCameras();

// Mise en place de la recherche par l'Input
searchInput.addEventListener('input', (e) => {searchTerm = e.target.value;
  showCameras();	
});
