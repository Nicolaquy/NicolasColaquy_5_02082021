const contentPanier = document.getElementById('contentPanier');
const contentForm = document.getElementById('contentForm');
const totalCommande = document.getElementById("total-commande");
let prixTotal;
const sup_panier = document.getElementById('sup-panier')
const reducer = (accumulator, currentValue) => accumulator + currentValue;    
let products = [];

function addIdProducts(produitLocalStorage) {
  products.push(produitLocalStorage[i].idProduit);
}
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
          addIdProducts(produitLocalStorage);
          structurePanier += `
               
        <tr id="${produitLocalStorage[i].idProduit} : ${produitLocalStorage[i].option}">
            <td class="modele"><div><img src="${produitLocalStorage[i].imgProduit}" alt=""></div> <div><div class="nomProduit">${produitLocalStorage[i].nomProduit}</div><br><div class="lentille">${produitLocalStorage[i].option}</div></div></td>
            <td>${numberWithSpace(produitLocalStorage[i].prixProduit)} € <div class="quantiteArticle">x ${produitLocalStorage[i].quantiteProduit}</div></td>
            <td class="quantite">${produitLocalStorage[i].quantiteProduit}</td>
            <td class="prixTotal">${numberWithSpace(produitLocalStorage[i].prixTotalProduit)} €</td>
            <td class="sup"><button class="btn-suprimmer"><i class="fas fa-trash-alt iSup"></i></button></td>
        </tr>
    
        `
        };
        
          contentPanier.innerHTML = headerPanier + structurePanier + '</table>';


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
}
deleteCamera();


// Mise en place du bouton pour effacer l'ensemble du panier
function deleteAll() {
sup_panier.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  alert("Votre panier a été vidé");
  window.location.reload();
})
}
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


        

// Envoie du formulaire au local storage 

    const btnEnvoieFormulaire = document.getElementById('envoieFormulaire')

    btnEnvoieFormulaire.addEventListener("click", (e) => {
      e.preventDefault();
      class formulaire{
        constructor(){
          this.lastName= document.getElementById('last-name').value;
          this.firstName= document.getElementById('first-name').value;
          this.adress= document.getElementById('adress').value;
          this.city= document.getElementById('city').value;
          this.email= document.getElementById('email').value;
        }
      }

// Verification des informations du formulaire
      const formulaireValues = new formulaire;
      const regExNomPrenomVille = (value) => {
        return /^[a-zA-Z\s àâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ-]{2,20}$/.test(value)
      }

      function controleNom() {
        const nom = formulaireValues.lastName;
        if(regExNomPrenomVille(nom)){
          document.getElementById('erreurNom').textContent = "";
          return true;
        }else{
          document.getElementById('erreurNom').textContent = "Veuillez entrer uniquement des lettres (entre 2 et 20)";

        }
      };
      function controlePrenom() {
        const prenom = formulaireValues.firstName;
        if(regExNomPrenomVille(prenom)){
          document.getElementById('erreurPrenom').textContent = "";
          return true;
        }else{
          document.getElementById('erreurPrenom').innerHTML = "Veuillez entrer uniquement des lettres (entre 2 et 20)";
        }
      };

      function controleAdresse() {
        const adresse = formulaireValues.adress;
        if(/^[a-zA-Z0-9\s àâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ-]{3,40}$/.test(adresse)){
          document.getElementById('erreurAdresse').textContent = "";
          return true;
        }else{
          document.getElementById('erreurAdresse').innerHTML = "Veuillez entrer uniquement des chiffres et des lettres (entre 3 et 40)";
        }
      };

      function controleVille() {
        const ville = formulaireValues.city;
        if(regExNomPrenomVille(ville)){
          document.getElementById('erreurVille').textContent = "";
          return true;
        }else{
          document.getElementById('erreurVille').innerHTML = "Veuillez entrer uniquement des lettres (entre 2 et 20)";
        }
      };

      function controleMail() {
        const mail = formulaireValues.email;
        if(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/.test(mail)){
          document.getElementById('erreurMail').textContent = "";
          return true;
        }else{
          document.getElementById('erreurMail').innerHTML = "Veuillez renseigner une adresse mail valide <br> (ex: jean.dupont@exemple.fr)";
        }
      };
      
//Reponse a la verification du formulaire
      if(controleNom() && controlePrenom() && controleAdresse() && controleVille() && controleMail()) {
      localStorage.setItem("contact", JSON.stringify(formulaireValues))
      alert('ok')
      }else{
        alert('pas bon')
      };


// Informations à envoyer a l'API
      const aEnvoyer = {
        produitLocalStorage, 
        formulaireValues
      }
      console.log(aEnvoyer);



// Envoie des infomations vers l'API (contact + products)
      const promise01 = fetch("http://localhost:3000/api/cameras/order", {
        method: "POST",
        body: JSON.stringify(aEnvoyer),
        headers: {
          "Content-Type" : "application/json"
        },
      });

      promise01.then(async(response) => {
        try {
          console.log(response);
          const contenu = await response.json();
          console.log(contenu);
        } catch(e){
          console.log(e);
        }
      })

      const promise02 = fetch("http://localhost:3000/api/cameras/order")
      promise02.then(async (response) => {
        try{
          const donneeDuServeur = await response.json()
          console.log(donneeDuServeur);
        } catch(e){
          console.log(e);
        }
      })

    });

    };
  
    showPanier();

