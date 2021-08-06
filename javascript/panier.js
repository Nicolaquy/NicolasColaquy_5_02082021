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