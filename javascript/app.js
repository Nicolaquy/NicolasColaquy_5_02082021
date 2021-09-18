const searchInput = document.getElementById('search');
const results = document.getElementById('results');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

// BURGER

const navSlide = () => {
  burger.addEventListener('click', () => {

    burger.classList.toggle('toggle');
    nav.classList.toggle('nav-active');
  });
  }
  navSlide();

// Mise en place d'un espace tout les 3 chiffres
function numberWithSpace(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}