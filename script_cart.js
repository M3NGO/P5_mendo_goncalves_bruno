let title = document.title; // ajout titre page dynamique selon produit
            document.title = '0rinoco - Votre Panier'; // ajout titre page dynamique selon produit

let tableauStorage = JSON.parse(localStorage.getItem("tableauStorage")); //on parse le localStorage dans un tableau appellé tableauStorage
// console.table(tableauStorage)

//check si localStorage vide et affiche alerte panier vide pour retour accueil
if (localStorage.getItem("tableauStorage") === null) {
    alert( 'Votre panier est vide')
    window.location = 'index.html' // retour à l'accueil au click panier alert
  }


//if pour checker si tableauStorage est vide si oui alors on clear la memoire et reload la page pour afficher le message panier vide
  if (tableauStorage.length <= 0){
    window.localStorage.clear()
    document.location.reload()
}
//ArrayUnique pour display uniquement une fois les appareils souhaités (les quantités sont dans colonne inCart du tableauStorage)
let arrayUnique = Array.from(new Set(tableauStorage.map(appareil => appareil._id))) // creation nouveau tableau a partir d'un nouveau set d'ids uniques provenant du tableauStorage
                    .map(_id => { 
                             return tableauStorage.find(appareil => appareil._id === _id)
                                })   // on map le nouvel arrayUnique pour y inserer les id appareils uniques provenant du tableauStorage initial
                        // console.table(arrayUnique)
                        
                        // console.log(localStorage)

    arrayUnique.forEach(element  => { // pour chaque element(appareil) du tableau unique alors une carte appareil est créée.
        
        let _ids = element._id
        let quantiteArrayUnique = element.Quantite
        let prixObjetUnique = element.prix
      
        let objetNom = element.nom
        
        let cardDiv = document.createElement("div") // créé une div reprensentant la card des produits
            cardDiv.setAttribute('class', 'card card-extend card-small')
            document.querySelector('.panier').appendChild(cardDiv);
            
        let img = new Image(); // display des images
            img.src = element.img; //donne les urls des photos dans du JSON
            img.alt = element.nom + ' ' + element.prix + ' €';
            img.setAttribute('id', 'image');
            img.setAttribute('class', 'card-img-top')
            document.querySelector('.panier').appendChild(cardDiv).appendChild(img);// display des photos en tant qu'img dans le html
        
        let cardSousImage = document.createElement("div")
            cardSousImage.setAttribute('class','card-body')
            document.querySelector('.panier').appendChild(cardDiv).appendChild(cardSousImage)

        let cardTitreGrid = document.createElement("div")
            cardTitreGrid.setAttribute('class','row')
            document.querySelector('.panier').appendChild(cardDiv).appendChild(cardSousImage).appendChild(cardTitreGrid)

        let cardTitre = document.createElement("div")
            cardTitre.setAttribute('class', ' mb-2 col-sm')
            document.querySelector('.panier').appendChild(cardDiv).appendChild(cardSousImage).appendChild(cardTitreGrid).appendChild(cardTitre)
        
        let nomObjet = document.createElement("h2") // créé un élément HTML H2 pour le nom du produit
            nomObjet.textContent = element.nom;
            nomObjet.setAttribute('class', 'card-title')
            document.querySelector('.panier').appendChild(cardDiv).appendChild(cardSousImage).appendChild(cardTitreGrid).appendChild(cardTitre).appendChild(nomObjet);
            // console.log(nomObjet)
                    
        let prixObjet = document.createElement("p") // créé un élément HTML H3 pour le prix du produit
            prixObjet.textContent = (prixObjetUnique.replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' €'); // .toFixed(2) pour mettre la virgule et deux chiffres après
            prixObjet.setAttribute('class', 'card-text')
            document.querySelector('.panier').appendChild(cardDiv).appendChild(cardSousImage).appendChild(cardTitreGrid).appendChild(cardTitre).appendChild(prixObjet);
            // console.log(prixObjet)

        let cardDivSelection = document.createElement("div")
            cardDivSelection.setAttribute('class','d-flex row')
            document.querySelector('.panier').appendChild(cardDiv).appendChild(cardSousImage)

        let quantite = document.createElement("input");
            quantite.setAttribute('class', 'quantite mb-1')
            quantite.setAttribute('aria-label', 'selecteur de quantité')
            quantite.setAttribute('type', 'number')
            quantite.setAttribute('value', quantiteArrayUnique)
            quantite.setAttribute('min', '1') // Qté minimum 1 pour empecher des values inférieures, si le user veut delete l'objet alors il y a un bouton pour ça
            quantite.setAttribute('max', '10') // qté max de 10 on suppose que le stock est de 10
            quantite.placeholder = 'Choisissez la quantité'
            document.querySelector('.panier').appendChild(cardDiv).appendChild(cardSousImage).appendChild(cardDivSelection).appendChild(quantite); // ajout de menuOptions dans les menuDéroulants

        let tableauTotalParAppareil = document.createElement("div");
            tableauTotalParAppareil.setAttribute ('class', 'tableauTotal col-sm')
            document.querySelector('.panier').appendChild(cardDiv).appendChild(cardSousImage).appendChild(cardTitreGrid).appendChild(tableauTotalParAppareil)

        let prixTotalApprareil = document.createElement("h2"); 
            prixTotalApprareil.setAttribute('class', 'prixTotalAppareil card-title')
            prixTotalApprareil.innerHTML = 'Total Appareil : '
            // console.log(prixTotalApprareil.innerHTML)
            document.querySelector('.panier').appendChild(cardDiv).appendChild(cardSousImage).appendChild(cardTitreGrid).appendChild(tableauTotalParAppareil).appendChild(prixTotalApprareil); // ajout de menuOptions dans les menuDéroulants
        
        let prixTotalApprareilMontant =document.createElement("p")
            prixTotalApprareilMontant.setAttribute('class','card-text')
            prixTotalApprareilMontant.innerHTML =((quantite.value)*(element.prix)).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')+' ' + '€';
            document.querySelector('.panier').appendChild(cardDiv).appendChild(cardSousImage).appendChild(cardTitreGrid).appendChild(tableauTotalParAppareil).appendChild(prixTotalApprareilMontant)

        let boutonValiderQuantiteAppareils = document.createElement("button");
            boutonValiderQuantiteAppareils.textContent = 'Valider la quantité';
            boutonValiderQuantiteAppareils.setAttribute('class', 'boutonValider')
            boutonValiderQuantiteAppareils.setAttribute('class', 'btn btn-primary')
            document.querySelector('.panier').appendChild(cardDiv).appendChild(cardSousImage).appendChild(cardDivSelection).appendChild(boutonValiderQuantiteAppareils);
        
       boutonValiderQuantiteAppareils.addEventListener('click', function (){

                                                        let finder = arrayUnique.find(appareil => appareil._id === _ids) // va chercher l'id de l'appareil dans l'arrayUnique pour s'enservir ensuite pour le delete
                                                        
                                                        let appareilsCommande = new Object({"nom": objetNom, "_id": _ids,"img": img.src,"Quantite":quantite.value, "prix":prixObjetUnique,"prixTotalObjet": ((quantite.value)*(prixObjetUnique)).toFixed(2)});//definit nouvel objet a mettre dans l'arrayUnique
                                                        // console.log(appareilsCommande.prix)
                                                        let arrayUniqueFiltre = arrayUnique.splice(arrayUnique.indexOf(finder) , 1, appareilsCommande)// tableau.splice(index, 0, item) insert 'appareilsCommande' a son index d'origine pour remplacer la quantité

                                                        localStorage.setItem("tableauStorage", JSON.stringify(arrayUnique))//stringify arrayUnique pour le mettre dans localStorage sous le nom TableauStorage
                                                        document.location.reload()
                                                        // console.table(arrayUnique)
                            }); //fermeture addEventListener click boutonValiderQuantiteAppareils
                            
        let boutonX = document.createElement("a");//bouton enlever appareil du panier
            boutonX.setAttribute('class','annuler')
            boutonX.setAttribute('aria-label', 'Annuler')
            boutonX.setAttribute('title', 'Supprimer du panier')
            boutonX.innerHTML= '<i class="fas fa-times"></i>'
            document.querySelector('.panier').appendChild(cardDiv).appendChild(boutonX);
            
            boutonX.addEventListener('click', function(){

                                let appareilFind= tableauStorage.find(appareil => appareil._id === _ids) // appareilfind pour déclarer une variable pour trouver l'id de lappareil clické, on s'en sert ensuite pour le splice du nouveau tableau
                                // console.log(appareilFind)
                                document.location.reload()

                                arrayUniqueFiltre = arrayUnique.splice(arrayUnique.indexOf(appareilFind) , 1)//creation nouveau tableau arrayuniquefiltre pour stocker la valeur qu'on retire du tableau arrayUnique

                                localStorage.setItem("tableauStorage", JSON.stringify(arrayUnique)) // on set le nouveau tableau arrayunique sans larrayuniquefiltre dans le tableauStorage du localstorage pour remplacer l'ancien tableau par le nouveau
                                tableauStorage = JSON.parse(localStorage.getItem("tableauStorage")); // on parse le nouveau tableauStorage pour recréer la page du panier
                            })// fermeture addEventListener boutonX
    
    })//fermeture for each arrayUnique.id

let CoutTotalCommande = tableauStorage.reduce(function (total, currentValue) {
    return  Number(total) + Number(currentValue.prixTotalObjet);//Number() pour convertir le string en number
}, 0);// reduce pour faire addition de la colone prixtotal du tableauStorage
// console.log(CoutTotalCommande)

localStorage.setItem("coutTotalCommande", CoutTotalCommande.toFixed(2))//création objet localStorage avec le coût total de la commande
//fonction totalCommande pour obtenir le total de la commande tous objets et quantités désirées
function totalCommande(){
    let totalCommande = document.createElement("div")
    totalCommande.setAttribute('class', 'totalCommande fs-2 text-center')
    totalCommande.innerHTML ='Total de votre commande : '
    document.querySelector('.totalPanier').appendChild(totalCommande)

    let totalCommandeMontant = document.createElement("div")
    totalCommandeMontant.setAttribute('class','fs-2 text-center')
    totalCommandeMontant.innerHTML = ((CoutTotalCommande.toFixed(2)).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')) + ' €'
    document.querySelector('.totalPanier').appendChild(totalCommande).appendChild(totalCommandeMontant)
    
}//fermeturef fonction totalCommande
totalCommande()

let validerCommande = document.createElement("button")
validerCommande.textContent = 'Finaliser la commande';
validerCommande.setAttribute('class', 'bouton_validerCommande')
validerCommande.setAttribute('title', 'Cliquez pour valider la commande')
validerCommande.setAttribute('class', 'btn btn-primary mt-3')
document.querySelector('.formulaire').appendChild(validerCommande)

//check validity formulaire :
validerCommande.addEventListener("click", function (){
        let checkEmail = email.checkValidity();
        let checkPrenom = firstName.checkValidity();
        let checkNom = lastName.checkValidity();
        let checkAdresse = address.checkValidity();
        let checkPostal = postal.checkValidity();
        let checkVille = city.checkValidity();

        if(checkEmail && checkPrenom && checkNom && checkAdresse && checkPostal && checkVille ){
            let contact = {};
            contact.firstName = document.getElementById('firstName').value;
            contact.lastName = document.getElementById('lastName').value;
            contact.address = document.getElementById('address').value;
            contact.city = document.getElementById('city').value;
            contact.postal = document.getElementById('postal').value;
            contact.email = document.getElementById('email').value;
            localStorage.setItem("contact", JSON.stringify(contact))
            console.log(localStorage.contact)

    let products =[] //recupere les ID des appareils commandés a partir du totalDeCommande qui est en dehors du premer fetch api
        //for.. of : remplit tableau products avec les id issus du tableau totalDeCommande qui est = Arrayunique
            for (let element of tableauStorage) { 
                products.push(element._id,)
            }


    let contactProductsCommande = {contact, products} //créé l'objet envoyé a l'api avec infos client + info produits sous forme array JSON

    // methode post a inserer ici
    fetch("http://localhost:3000/api/cameras/order",{
        method: "POST",
        
        body : JSON.stringify(contactProductsCommande),
        headers: {"Content-Type": "application/json",},
    
    })// fermeture method fetch POST API

    //traitement réponse reçue de l'API suite fetch POST API
        .then((response)=>{
            let confCommande = response.json(); // renvoit la promesse en JSON
                // console.log(response)
                let RepApi = [];
                RepApi.push(confCommande)
                // console.log(RepApi)
                
                confCommande.then(function (obj){
                        RepApi.push(obj)
                        // console.table(obj.orderId)
                        localStorage.setItem("orderId", obj.orderId)
                        window.location.replace("confirmation_commande.html");//pour envoyer le user sur la page de confirmation de commanda si le code se passe bien
                    })//fermeture fonction obj ConfCommande

            .catch(function(mauvaiserep){ console.log(mauvaiserep)
                                    })//fermeture catch fetch POST API
    })// fermeture then fetch POST API

    //message d'erreur si le formulaire se passe mal ou si le traitement de réponse n'est pas bon
        }else{
            alert('Une erreur est présente dans le formulaire de commande, voici les formats acceptés: \n\n Prénom : Lettres capitales, minuscules et tiret \n\n Nom : Lettres capitales, minuscules et tiret \n\n Adresse : 0 à 9, virgule et tiret, Lettres capitales et minuscules \n\n Code Postal : 5 chiffres \n\n Ville : Lettres capitales, minuscules et tiret \n\n Email : format valide : email@email.com')
        } // \n pour sauter ligne dans l'alerte
        
})//fermeture checkValidity.addEventListener click