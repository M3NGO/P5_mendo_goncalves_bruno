const url = "http://localhost:3000/api/cameras/";
console.log(url)

// fetch pour créer le texte et importer images des appareils photo

let appareils = []; // tableau reception tableau promise

let Panier =  async function() { //fonction asynchrone pour laisser charger le reste du site avant
    let response = await fetch(url)
        .then((response)=>{
            let itemData = response.json(); // renvoit la promesse en JSON
                    console.log(response.body)
                appareils.push(itemData) //envoit les réponses reçues de JSON dans tableau appareils recenssant tous les appareils
                    console.log(appareils)
                    
                itemData.then(function (appareil){
                    appareils.push(...appareil) // (opérateur de décomposition : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Spread_syntax) Array appareil contenant chaque élément du Json "...appareil" pour importer tous les appareils dans le tableau appareil
                        console.table(appareil)

                        let tableauStorage = JSON.parse(localStorage.getItem("tableauStorage")); //on parse le localStorage dans un tableau appellé tableauStorage


                        //ArrayUnique pour display uniquement une fois les appareils souahités (les quantités sont dans colonne inCart du tableauStorage)
                        let arrayUnique = Array.from(new Set(tableauStorage.map(appareil => appareil._id))) // creation nouveau tableau a partir d'un nouveau set d'ids uniques provenant du tableauStorage
                           .map(_id => { 
                             return tableauStorage.find(appareil => appareil._id === _id)
                           })   // on map le nouvel arrayUnique pour y inserer les id appareils uniques provenant du tableauStorage initial
                        console.table(arrayUnique)
                        
                        console.log(localStorage)

                        arrayUnique.forEach(element  => { // pour chaque element(appareil) du tableau unique alors une carte appareil est créée.
                        let _ids = element._id
                        let quantiteArrayUnique = element.Quantite
                        
                    let verifIdURL = appareil.find(appareilPhoto => appareilPhoto._id === _ids)

                        console.table(verifIdURL)

                    let title = document.title; // ajout titre page dynamique selon produit
                        document.title = '0rinoco - Votre Panier'; // ajout titre page dynamique selon produit

                    let cardDiv = document.createElement("div") // créé une div reprensentant la card des produits
                        cardDiv.setAttribute('class', 'card')
                        document.querySelector('.panier').appendChild(cardDiv);
                        
                    let img = new Image(); // display des images
                        img.src = verifIdURL.imageUrl; //donne les urls des photos dans du JSON
                        img.alt = verifIdURL.description;
                        img.setAttribute('id', 'image');
                        document.querySelector('.panier').appendChild(cardDiv).appendChild(img);// display des photos en tant qu'img dans le html

                    let nomObjet = document.createElement("h2") // créé un élément HTML H2 pour le nom du produit
                        nomObjet.textContent = verifIdURL.name;
                        document.querySelector('.panier').appendChild(cardDiv).appendChild(nomObjet);
                            console.log(nomObjet)
                    
                    let prixObjet = document.createElement("h3") // créé un élément HTML H3 pour le prix du produit
                        prixObjet.textContent = (verifIdURL.price/100).toFixed(2) + ' €'; // .toFixed(2) pour mettre la virgule et deux chiffres après
                        document.querySelector('.panier').appendChild(cardDiv).appendChild(prixObjet);
                            console.log(prixObjet)

                    let quantite = document.createElement("input");
                        quantite.setAttribute('class', 'quantite')
                        quantite.setAttribute('type', 'number')
                        quantite.setAttribute('value', quantiteArrayUnique)
                        quantite.setAttribute('min', '1')
                        quantite.setAttribute('max', '10') // qté max de 10 on suppose que le stock est de 10
                        quantite.placeholder = 'Choisissez la quantité'
                        document.querySelector('.panier').appendChild(cardDiv).appendChild(quantite); // ajout de menuOptions dans les menuDéroulants

                


                    let boutonValiderQuantiteAppareils = document.createElement("button");
                        boutonValiderQuantiteAppareils.textContent = 'Valider';
                        boutonValiderQuantiteAppareils.setAttribute('class', 'boutonValider')
                        
                        boutonValiderQuantiteAppareils.addEventListener('click', function (){
                        prixTotalApprareil.innerHTML = (((quantite.value)*(verifIdURL.price))/100).toFixed(2)+ ' ' + '€'; //calcul le prix total concernant le produit
                            // console.log(prixTotalApprareil.innerHTML)
                            
 
                            let finder = tableauStorage.find(appareil => appareil._id === _ids) // va chercher l'id de l'appareil dans l'arrayUnique pour s'enservir ensuite pour le delete
                            let arrayUniqueFiltre = arrayUnique.splice(arrayUnique.indexOf(finder) , 1)// delete l'id du tableau arrayUnique

                            let appareilsCommande = new Object({"nom": verifIdURL.name, "_id": verifIdURL._id,"Quantite":quantite.value, "prix": (((quantite.value)*(verifIdURL.price))/100).toFixed(2)});//definit nouvel objet a mettre dans l'arrayUnique
                            arrayUnique.push(appareilsCommande)//push le nouvel objet dans le tableau arrayUnique
                            console.log(appareilsCommande.prix)
                            localStorage.setItem("tableauStorage", JSON.stringify(arrayUnique))//stringify arrayUnique pour le mettre dans localStorage sous le nom TableauStorage
                            document.location.reload()
                 
                            console.log(arrayUnique)
                        }); //fermeture addEventListener click boutonValiderQuantiteAppareils
                            
                           
                    document.querySelector('.panier').appendChild(cardDiv).appendChild(boutonValiderQuantiteAppareils);

                    let boutonX = document.createElement("button");//bouton enlever appareil du panier
                        boutonX.textContent = 'X';
                        boutonX.setAttribute('class', 'boutonAnnuler')
                        document.querySelector('.panier').appendChild(cardDiv).appendChild(boutonX);
                        boutonX.addEventListener('click', function(){
                            let appareilFind= tableauStorage.find(appareil => appareil._id === _ids) // appareilfind pour déclarer une variable pour trouver l'id de lappareil clické, on s'en sert ensuite pour le splice du nouveau tableau
                            console.log(appareilFind)
                            document.location.reload()
                        arrayUniqueFiltre = arrayUnique.splice(arrayUnique.indexOf(appareilFind) , 1)//creation nouveau tableau arrayuniquefiltre pour stocker la valeur qu'on retire du tableau arrayUnique
                            // console.log(arrayUniqueFiltre)
                            // console.log(arrayUnique)
                            localStorage.setItem("tableauStorage", JSON.stringify(arrayUnique)) // on set le nouveau tableau arrayunique sans larrayuniquefiltre dans le tableauStorage du localstorage pour remplacer l'ancien tableau par le nouveau
                            tableauStorage = JSON.parse(localStorage.getItem("tableauStorage")); // on parse le nouveau tableauStorage pour recréer la page du panier
                    })// fermeture addEventListener boutonX
                            // console.log(arrayUnique)

                    let tableauTotalParAppareil = document.createElement("div");
                        tableauTotalParAppareil.setAttribute ('class', 'tableauTotal')
                        document.querySelector('.panier').appendChild(cardDiv).appendChild(tableauTotalParAppareil)

                    let prixTotalApprareil = document.createElement("p"); 
                        prixTotalApprareil.setAttribute('class', 'prixTotalAppareil')
                        prixTotalApprareil.innerHTML = (((quantite.value)*(verifIdURL.price))/100).toFixed(2)+ ' ' + '€';
                        console.log(prixTotalApprareil.innerHTML)
                        document.querySelector('.panier').appendChild(cardDiv).appendChild(tableauTotalParAppareil).appendChild(prixTotalApprareil); // ajout de menuOptions dans les menuDéroulants
                             })//fermeture for each arrayUnique.id
                        
                console.log(tableauStorage.Quantite)
                })// fermeture de itemData.then
                

        .catch(function(erreur){
            alert("Votre panier est vide")
        })// fermeture .catch
    });// fermeture then response
}// fermeture carteProduit

Panier() // appelle carteProduit

let totalDeCommande =[];
totalDeCommande = JSON.parse(localStorage.getItem("tableauStorage"))
let commandeIds =[]


totalDeCommande.forEach(element => console.log(totalDeCommande._id) 
// function (){
//     commandeIds.push({"_id": element.id,})
)
console.log(commandeIds)



let CoutTotalCommande = totalDeCommande.reduce(function (total, currentValue) {
    return  Number(total) + Number(currentValue.prix);//Number() pour convertir le string en number
}, 0);
console.log(CoutTotalCommande)

localStorage.setItem("coutTotalCommande", CoutTotalCommande.toFixed(2))

function totalCommande(){
    let totalCommande = document.createElement("div")
    totalCommande.setAttribute('class', 'totalCommande')
    totalCommande.innerHTML ='Total de votre commande : '+ CoutTotalCommande.toFixed(2) + ' ' + '€'
    
    document.querySelector('.totalPanier').appendChild(totalCommande)
}
totalCommande()

let validerCommande = document.createElement("input")
validerCommande.setAttribute('type', 'submit')
validerCommande.setAttribute('class', 'bouton_validerCommande')
validerCommande.setAttribute('value', 'Valider la commande')
validerCommande.setAttribute('title', 'Cliquez pour valider la commande')
document.querySelector('.formulaire').appendChild(validerCommande)

//check validity formulaire :
validerCommande.addEventListener("click", function (){
    let checkEmail = email.checkValidity();
    let checkPrenom = firstName.checkValidity();
    let checkNom = lastName.checkValidity();
    let checkAdresse = address.checkValidity();
    // let checkPostal = Postal.checkValidity();
    let checkVille = city.checkValidity();
    if(checkEmail && checkPrenom && checkNom && checkAdresse && checkVille ){
        let contact = {};
        contact.firstName = document.getElementById('firstName').value;
        contact.lastName = document.getElementById('lastName').value;
        contact.address = document.getElementById('address').value;
        contact.city = document.getElementById('city').value;
        contact.postal = document.getElementById('postal').value;
        contact.email = document.getElementById('email').value;
        alert(contact.firstName)
        alert(contact.lastName)
        alert(contact.address)
        alert( contact.city)
        alert( contact.email)
        localStorage.setItem("contact", JSON.stringify(contact))
        console.log(localStorage.contact)

    let products =[] //recupere les ID des appareils commandés a partir du totalDeCommande qui est en dehors du premer fetch api

    //for.. of : remplit tableau products avec les id issus du tableau totalDeCommande qui est = Arrayunique
        for (let element of totalDeCommande) { 
            products.push(element._id,)
        }


let contactProductsCommande = {contact, products} //créé l'objet envoyé a l'api avec infos client + info produits sous forme array JSON

// methode post a inserer ici
fetch("http://localhost:3000/api/cameras/order",{
    method: "POST",
    
    body : JSON.stringify(contactProductsCommande),
    headers: {"Content-Type": "application/json",},
   
})
.then((response)=>{
    let confCommande = response.json(); // renvoit la promesse en JSON
        console.log(response)
        let RepApi = [];
        RepApi.push(confCommande)
        console.log(RepApi)
        
        confCommande.then(function (obj){
            RepApi.push(obj) // (opérateur de décomposition : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Spread_syntax) Array appareil contenant chaque élément du Json "...appareil" pour importer tous les appareils dans le tableau appareil
        console.table(obj.orderId)
localStorage.setItem("orderId", obj.orderId)
window.location.replace("http://127.0.0.1:5500/confirmation_commande.html");
})
.catch(function(mauvaiserep){ console.log(mauvaiserep)
})
})

  
    }else{
        alert('Une erreur est présente dans le formulaire de commande, voici les formats acceptés: \n\n Prénom : Lettres capitales, minuscules et tiret \n\n Nom : Lettres capitales, minuscules et tiret \n\n Adresse : 0 à 9, virgule et tiret, Lettres capitales et minuscules \n\n Code Postal : 5 chiffres \n\n Ville : Lettres capitales, minuscules et tiret \n\n Email : format valide : email@email.com')
    } // \n pour sauter ligne dans l'alerte
     
})