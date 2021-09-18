const contentPanier = document.getElementById('contentPanier');
const contentForm = document.getElementById('contentForm');
const totalCommande = document.getElementById("total-commande");
let prixTotal;
const sup_panier = document.getElementById('sup-panier')
const reducer = (accumulator, currentValue) => accumulator + currentValue;    
let idProducts = [];

//Mise en place de l'affichage du panier
    const showPanier = async() => {
      let produitLocalStorage = JSON.parse(localStorage.getItem('products'));

//Si panier vide
      if(produitLocalStorage === null || produitLocalStorage == 0) {
        contentPanier.innerHTML = `
        <table class="tableau">
        <tr class="titre">
            <th class="titre">Modèle</th>
            <th class="titre">Prix / unité</th>
            <th class="titre quantite">Quantité</th>
            <th class="titre prixTotal">Prix total</th>
            <th class="titre sup"><div class="titreSup">Supprimer</div></th>
        </tr>
        </table>
        <div class="vide">
          <h2>Votre panier est vide</h2>
          <button class="btn" onclick="window.location.href = '/index.html'">Ajouter des articles</button>
        </div>
          `

//Si déjà au moins un article dans le panier
      } else {
        let structurePanier = [];

        let headerPanier = `
        <table class="tableau">
        <tr class="titre">
            <th class="titre">Modèle</th>
            <th class="titre">Prix / unité</th>
            <th class="titre quantite">Quantité</th>
            <th class="titre prixTotal">Prix total</th>
            <th class="titre sup"><div class="titreSup">Supprimer</div></th>
        </tr>
         `;

        for(i=0; i < produitLocalStorage.length; i++){
          let idProduit = produitLocalStorage[i].idProduit;
          let quantityProduct = produitLocalStorage[i].quantiteProduit;
          
            for(j=0; j < quantityProduct; j++){
              idProducts.push(idProduit);
            }
          
          localStorage.setItem("idProducts", JSON.stringify(idProducts));
          structurePanier += `
               
        <tr id="${produitLocalStorage[i].idProduit} : ${produitLocalStorage[i].option}">
            <td class="modele"><div><a href="/html/produit.html?id=${produitLocalStorage[i].idProduit}"><img src="${produitLocalStorage[i].imgProduit}" alt=""></a></div> <div><div class="nomProduit"><a href="/html/produit.html?id=${produitLocalStorage[i].idProduit}">${produitLocalStorage[i].nomProduit}</a></div><br><div class="lentille">${produitLocalStorage[i].option}</div></div></td>
            <td>${numberWithSpace(produitLocalStorage[i].prixProduit)} € <div class="quantiteArticle">x ${produitLocalStorage[i].quantiteProduit}</div></td>
            <td class="quantite">${produitLocalStorage[i].quantiteProduit}</td>
            <td class="prixTotal">${numberWithSpace(produitLocalStorage[i].prixTotalProduit)} €</td>
            <td class="sup"><button aria-label="Supprimer" class="btn-suprimmer"><i class="fas fa-trash-alt iSup"></i></button></td>
        </tr>
    
        `
        };
        
          contentPanier.innerHTML = headerPanier + structurePanier + '</table>';

// Calcul du total du panier
        let calculTotalPanier = []; 
        for (j = 0; j < produitLocalStorage.length; j++) {
            let prixPanier = produitLocalStorage[j].prixTotalProduit;
            calculTotalPanier.push(prixPanier);
        }
        prixTotal = calculTotalPanier.reduce(reducer);
        totalCommande.innerHTML = (
          ` 
          ${numberWithSpace(prixTotal)} €
          `
        )

// Appel des fonctions pour supprimer articles du panier
deleteCamera();
deleteAll();

// Affichage du formulaire (si panier non vide)
          contentForm.innerHTML = `
          <section class="formulaire">
          <h2>Vos coordonnées</h2>
          <p class="oblig"><em>Tous les champs sont obligatoires</em></p>
  
          <form action="" class="form">
              <div class="formSection">
                  <label for="last-name">Nom</label><br>
                  <input type="text" id="last-name" pattern="^[a-zA-Z\s àâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ-]{2,20}$" placeholder="Dupont" required><br><span id="erreurNom" class="erreur"></span>
              </div>
              <div class="formSection">
                  <label for="first-name">Prénom</label><br>
                  <input type="text" id="first-name" pattern="^[a-zA-Z\s àâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ-]{2,20}$" placeholder="Jean" required><br><span id="erreurPrenom" class="erreur"></span>
              </div>
              <div class="formSection">
                  <label for="adress">Adresse</label><br>
                  <input type="text" id="adress" pattern="^[a-zA-Z0-9\s àâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ-]{3,40}$" placeholder="1 rue Victor Hugo" required><br><span id="erreurAdresse" class="erreur"></span>
              </div>
              <div class="formSection">
                  <label for="city">Ville</label><br>
                  <input type="text" id="city" pattern="^[a-zA-Z\s àâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ-]{2,20}$" placeholder="Paris" required><br><span id="erreurVille" class="erreur"></span>
              </div>    
              <div class="formSection">
                  <label for="email">Adresse e-mail</label><br>
                  <input type="email" id="email" pattern="^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$" placeholder="jean.dupont@exemple.fr" required><br><span id="erreurMail" class="erreur"></span>
              </div>
              <button type="submit" id="envoieFormulaire" name="envoieFormulaire">Passer la commande</button>
          </form>
          </section>
              `
      }
    };

// Mise en place des boutons pour supprimer les articles individuellement 
 
function deleteCamera() {
  let btn_sup = document.querySelectorAll(".btn-suprimmer");
  let iSup = document.querySelectorAll(".iSup");
  for (x = 0; x < btn_sup.length; x++) {
    btn_sup[x].setAttribute("id",x);
    iSup[x].setAttribute("id",x);
    btn_sup[x].addEventListener("click", (e) => {
      e.preventDefault
      let idSup = e.target.attributes.id.nodeValue;
      produitLocalStorage.splice(idSup, 1)
      localStorage.setItem("products", JSON.stringify(produitLocalStorage));
        if (produitLocalStorage === null || produitLocalStorage == 0){
          alert("Votre panier est maintenant vide");
          window.location.reload();
        }else{
        alert("Votre article a bien été retirer du panier");
        window.location.reload();
        }
    })
  }
};

// Mise en place du bouton pour effacer l'ensemble du panier
function deleteAll() {
sup_panier.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  alert("Votre panier a été vidé");
  window.location.reload();
})
};
  
    showPanier();