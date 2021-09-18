const confirmation = document.getElementById('contentConfirmation');
let contact = JSON.parse(sessionStorage.getItem('contact'));
let product = JSON.parse(sessionStorage.getItem('product'));
let orderId = sessionStorage.getItem('orderId');
let produitLocalStorage = JSON.parse(sessionStorage.getItem('produitsPanier'));
let prixTotal = JSON.parse(sessionStorage.getItem('montantCommande'));
let recapCommande = [];   

const showConfirmation = async() => {
    debutConfirmation = `
    <h1>Felicitation ${contact.firstName}, vous venez de finaliser votre commande !</h1>

    <div id="congrat"></div>

    <div class="numCommande">Commande n° <span class="idCommande">${orderId}</span></div>
    <p>Votre commande a été acceptée et est en cours de préparation par nos services.</p>
    <p>Votre commande sera bientôt expédiée à l'adresse suivante:</p>
    <p class="adress">${contact.address} <br>${contact.city}</p>
    <P>Vous recevrez un numéro de tracking pour suivre la livraison en temps réel.</P>
    <p class="recap">Récapitulatif de votre commande:</p>

    <table class="tableau">
        <tr class="titre">
            <th class="titre">Modèle</th>
            <th class="titre">Prix / unité</th>
            <th class="titre prixTotal">Prix total</th>
        </tr>
    `

    for(i=0; i < produitLocalStorage.length; i++){
     
        recapCommande += `
            
        <tr class="ligne">
            <td class="modele"><div><img src="${produitLocalStorage[i].imgProduit}" alt="Image appareil photo"></div> <div><div class="nomProduit">${produitLocalStorage[i].nomProduit}</div><br><div class="lentille">${produitLocalStorage[i].option}<div class="quantiteArticle">x ${produitLocalStorage[i].quantiteProduit}</div></div></div></td>
            <td>${numberWithSpace(produitLocalStorage[i].prixProduit)} €</td>
            <td class="prixTotal">${numberWithSpace(produitLocalStorage[i].prixTotalProduit)} €</td>
        </tr>
      `
      };

       finConfirmation = `
        <p class="totalCommande">Total de votre commande: <span class="prixTotal">${numberWithSpace(prixTotal)} €</span></p>
        <p>Vous pouvez être fier de vous pour cet achat, nous, nous sommes fier de vous !</p>
        <p>Nous reviendrons vers vous d'ici quelques jours pour nous assurer que tout se passe pour le mieux.</p>
        <p class="fin">En vous souhaitant les meilleurs photos possible !</p>
        <p class="sign">L'equipe Orinoco</p>
        <button class="btn" onclick="window.location.href = '/index.html'">Retour à l'accueil</button>
        `

      confirmation.innerHTML = debutConfirmation + recapCommande + "</table>" + finConfirmation;

      photoCongrat();
    }

function photoCongrat(){
    let x = document.getElementById("congrat")
    x.innerHTML="<img src=\"../images/congrat-"+Math.floor((Math.random()*5)+1)+".gif\"/>"
};

showConfirmation();

