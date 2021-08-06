
let title = document.title; // ajout titre page dynamique selon produit
document.title = '0rinoco - Vous remercie pour votre commande'; // ajout titre page dynamique selon produit


let contactparse = JSON.parse(localStorage.getItem("contact"))
console.log(contactparse)

let commandeFinale = JSON.parse(localStorage.getItem("tableauStorage"))
console.log(commandeFinale)

let orderId = document.createElement("h1")
orderId.setAttribute('class', 'ID')
document.querySelector('.confirmationCommande').appendChild(orderId);
orderId.innerHTML = 'Votre numéro de commande est le : '+localStorage.orderId

let merci = document.createElement('h2')
merci.setAttribute('class', 'merci')
merci.innerHTML = 'Merci pour votre commande' 
document.querySelector('.confirmationCommande').appendChild(merci);


let prenom = document.createElement("h3")
prenom.setAttribute('class', 'prenom')
document.querySelector('.confirmationCommande').appendChild(prenom);
prenom.innerHTML = contactparse.firstName

let nom = document.createElement('h3')
nom.setAttribute('class', 'nom')
document.querySelector('.confirmationCommande').appendChild(nom)
nom.innerHTML = contactparse.lastName

// let addresse = document.createElement('p')
// addresse.setAttribute('class', 'addresse')
// document.querySelector('.confirmationCommande').appendChild(addresse)
// addresse.innerHTML = contactparse.address

// let codePostal = document.createElement('p')
// codePostal.setAttribute('class','codePostal')
// document.querySelector('.confirmationCommande').appendChild(codePostal)
// codePostal.innerHTML = contactparse.postal

// let ville = document.createElement('p')
// ville.setAttribute('class','ville')
// document.querySelector('.confirmationCommande').appendChild(ville)
// ville.innerHTML = contactparse.city

// let email = document.createElement('p')
// email.setAttribute('class', 'email')
// document.querySelector('.confirmationCommande').appendChild(email)
// email.innerHTML = contactparse.email




//commande:
let quantite =document.createElement('p')
quantite.setAttribute('class', 'quantite')
document.querySelector('.confirmationCommande').appendChild(quantite)
let quantiteFinale = localStorage.getItem('coutTotalCommande')
console.log(quantiteFinale)

quantite.innerHTML = 'Le montant total de votre commande est de : ' + quantiteFinale + ' ' + '€'

let boutonFinal = document.createElement('button')
boutonFinal.setAttribute('class','boutonFinal')
boutonFinal.setAttribute('onclick', 'window.location.replace("http://127.0.0.1:5500/index.html")')
document.querySelector('.confirmationCommande').appendChild(boutonFinal)
boutonFinal.innerHTML = "retour à l'accueil"