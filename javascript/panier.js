const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const contentPanier = document.getElementById('contentPanier');
const btn_sup = document.querySelectorAll('.btn-suprimmer');
const totalCommande = document.getElementById("total-commande");
let prixTotal;
const sup_panier = document.getElementById('sup-panier')
const reducer = (accumulator, currentValue) => accumulator + currentValue;
// BURGER
const navSlide = () => {
    burger.addEventListener('click', () => {
  
      burger.classList.toggle('toggle');
      nav.classList.toggle('nav-active');
      
    });
    
    }
    
    navSlide();

    

    const showPanier = async() => {
      let produitLocalStorage = JSON.parse(localStorage.getItem('panier'));
console.log(produitLocalStorage);
      if(produitLocalStorage === null) {
        contentPanier.innerHTML = `
        <div class="vide">
          <h2>Votre panier est vide</h2>
          <button class="btn" onclick="window.location.href = '/index.html'">Ajouter des articles</button>
        </div>
          `

      } else {
        let structurePanier = [];

        for(i=0; i < produitLocalStorage.length; i++){
          
          structurePanier += `
          <table class="cellule">
        <tr>
            <td>${produitLocalStorage[i].nomProduit}</td>
            <td>${produitLocalStorage[i].option}</td>
            <td>${produitLocalStorage[i].prixProduit} €</td>
            <td>${produitLocalStorage[i].quantiteProduit}</td>
            <td>${produitLocalStorage[i].prixTotalProduit} €</td>
            <td><button class="btn-suprimmer"><i class="fas fa-trash-alt"></i></button></td>
        </tr>
    </table>
        `
        ;
        };
        
          contentPanier.innerHTML = structurePanier;
        
      }

      let calculTotalPanier = []; 
        for (j = 0; j < produitLocalStorage.length; j++) {
            let prixPanier = produitLocalStorage[j].prixTotalProduit;
            calculTotalPanier.push(prixPanier);
        }
        prixTotal = calculTotalPanier.reduce(reducer);
        totalCommande.innerHTML = (
          ` 
          ${prixTotal} €
          `
        )

     /*  for (j = 0; 1 < produitLocalStorage.lenght; j++){
        btn_sup[j].addEventListener('click', (e) => {
          e.preventDefault();
        })
      }; */


      
    };

    showPanier();

    function deleteAll() {
      sup_panier.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.clear();
        alert("Votre panier a été vidé");
        window.location.reload();
      })
    }
    deleteAll();