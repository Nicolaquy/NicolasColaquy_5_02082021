const btnEnvoieFormulaire = document.getElementById('envoieFormulaire');
let produitLocalStorage = JSON.parse(localStorage.getItem('products'));
let contact = {};

// Vérification données formulaire

function validationForm(contact) {
  let nom = contact.lastName;
  let prenom = contact.firstName;
  let adresse = contact.address;
  let ville = contact.city;
  let email = contact.email;
  const regExNomPrenomVille = (value) => {
    return /^[a-zA-Z\s àâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ-]{2,20}$/.test(value)
  }
  const regExAdresse = (value) => {
    return /^[a-zA-Z0-9\s àâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ-]{3,40}$/.test(value)
  }


  if(regExNomPrenomVille(nom)){
    document.getElementById('erreurNom').textContent = "";
    if(regExNomPrenomVille(prenom)){
      document.getElementById('erreurPrenom').textContent = "";
      if(regExAdresse(adresse)){
        document.getElementById('erreurAdresse').textContent = "";
        if(regExNomPrenomVille(ville)){
          document.getElementById('erreurVille').textContent = "";
          if(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/.test(email) && (email.length > 2)){
            document.getElementById('erreurMail').textContent = "";
            return true;
          }else {
            document.getElementById('erreurMail').innerHTML = "Veuillez renseigner une adresse mail valide <br> (ex: jean.dupont@exemple.fr)";
            return false;
          }
        }else {
          document.getElementById('erreurVille').innerHTML = "Veuillez entrer uniquement des lettres (entre 2 et 20)";
          return false;
        }
      }else{
        document.getElementById('erreurAdresse').innerHTML = "Veuillez entrer uniquement des lettres (entre 3 et 40)";
        return false;
      }
    }else{
      document.getElementById('erreurPrenom').innerHTML = "Veuillez entrer uniquement des lettres (entre 2 et 20)";
      return false;
    }
  }else{
    document.getElementById('erreurNom').textContent = "Veuillez entrer uniquement des lettres (entre 2 et 20)";
    return false;
  }
}

// Fonction pour envoyer vers l'API l'objet contact et le tableau products

  async function postForm(aEnvoyer) {
    try {
        let response = await fetch("http://localhost:3000/api/cameras/order", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(aEnvoyer),
        });
            alert("Votre commande a bien été prise en compte");
            let responseId = await response.json();
            getOrderConfirmationId(responseId);
            localStorage.clear();
            document.location.href = "../html/confirmation.html"
    } catch(e) {
      alert("Erreur:" + e)
    }
}

// Envoie vers le session Storage des informations pour page confirmation
function getOrderConfirmationId(responseId) {
  let orderId = responseId.orderId;
  sessionStorage.setItem("orderId", orderId);
  sessionStorage.setItem("montantCommande", JSON.stringify(prixTotal));
  sessionStorage.setItem("contact", JSON.stringify(contact));
  sessionStorage.setItem("produitsPanier", JSON.stringify(produitLocalStorage));
}

//Evenement au clic pour validation commande

function validateForm() {
  btnEnvoieFormulaire.addEventListener('click', (e) => {
    e.preventDefault();

// Création objet Contact

    contact = {
      lastName: document.getElementById('last-name').value,
      firstName: document.getElementById('first-name').value,
      address: document.getElementById('adress').value,
      city: document.getElementById('city').value,
      email: document.getElementById('email').value
    };

// Récuperation tableau products
    let products = JSON.parse(localStorage.getItem('idProducts'));

// Envoie des informations au Back-end
    let aEnvoyer = {contact, products} ;
      if(validationForm(contact)){
          postForm(aEnvoyer);
      } else {
        alert("Veuillez bien remplir le formulaire comme indiqué")
      }
  })
}

validateForm();