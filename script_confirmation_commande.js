
let title = document.title; // ajout titre page dynamique selon produit
document.title = '0rinoco - Vous remercie pour votre commande'; // ajout titre page dynamique selon produit

let contactparse = JSON.parse(localStorage.getItem("contact"))
console.log(contactparse)

let commandeFinale = JSON.parse(localStorage.getItem("tableauStorage"))
console.log(commandeFinale)

let remerciement = document.createElement('h1')
    remerciement.setAttribute('class', 'text-center mb-4')
    remerciement.innerHTML= 'vous remercie pour votre commande N° :'+'<br/>'+localStorage.orderId 
    document.querySelector('.container-fluid').appendChild(remerciement)

//commande:
let quantiteFinale = localStorage.getItem('coutTotalCommande')
console.log(quantiteFinale)

let confPaiement = document.createElement('p')
    confPaiement.setAttribute('class', 'quantite')
    confPaiement.innerHTML = contactparse.firstName + ' '+ contactparse.lastName + ' ' + 'votre paiement de ' + quantiteFinale + ' ' + '€' + ' a été accepté !' 
    document.querySelector('.container-fluid').appendChild(confPaiement)

let confAdresse = document.createElement('p')
    confAdresse.setAttribute('class', '')
    confAdresse.innerHTML = "Vous recevrez votre commande sous peu à l'adresse indiquée : " + '<br/>' + contactparse.address + ' ' + contactparse.postal + ' ' + contactparse.city
    document.querySelector('.container-fluid').appendChild(confAdresse)

let boutonFinal = document.createElement('button')
    boutonFinal.setAttribute('class','btn btn-primary')
    boutonFinal.setAttribute('onclick', 'window.location.replace("http://127.0.0.1:5500/index.html")')
// fonction pour clear localStorage au click du retour a l'accueil
boutonFinal.addEventListener('click', function(){
    localStorage.clear();
})
document.querySelector('.container-fluid').appendChild(boutonFinal)
boutonFinal.innerHTML = "retour à l'accueil"

//Nettoyer localStorage a la fermeture de la page
window.onunload = () => {
    window.localStorage.clear()
 }