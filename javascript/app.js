const searchInput = document.getElementById('search');
const results = document.getElementById('results');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

let cameras;
let searchTerm = '';

// API REQUEST
const fetchCameras = async() => {
	cameras = await fetch("http://localhost:3000/api/cameras")
    .then(res => res.json());
};

const showCameras = async() => {
	await fetchCameras();
results.innerHTML = (

    cameras
      .filter(camera => camera.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(camera => ( 

        ` 
            
              <div class="card">
                <img class="camera-image" src="${camera.imageUrl}" />
                <div class="camera-info">
                  <h5 class="camera-name">${camera.name}</h5>
                    <p class="camera-description">${camera.description}</p>
                    <p class="camera-price">Prix: ${numberWithSpace(camera.price/100 + " €")}</p>
                    <a href="/html/produit.html?id=${camera._id}" class="btn">En savoir plus</a>
                </div>
              </div>
            
        `
      )).join('')
  );
}; 
showCameras();

// INPUT SETUP
searchInput.addEventListener('input', (e) => {searchTerm = e.target.value;
  showCameras();	
});

function numberWithSpace(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// BURGER

const navSlide = () => {
  burger.addEventListener('click', () => {

    burger.classList.toggle('toggle');
    nav.classList.toggle('nav-active');
  });
  
  }
  
  navSlide();
