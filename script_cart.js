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
                        let arrayUnique = Array.from(new Set(tableauStorage.map(appareil => appareil.id))) // creation nouveau tableau a partir d'un nouveau set d'ids uniques provenant du tableauStorage
                           .map(id => { 
                             return tableauStorage.find(appareil => appareil.id === id)
                           })   // on map le nouvel arrayUnique pour y inserer les id appareils uniques provenant du tableauStorage initial
                        console.table(arrayUnique)


                        console.table(tableauStorage)

                        arrayUnique.forEach(element  => { // pour chaque element(appareil) du tableau unique alors une carte appareil est créée.
                        let ids = element.id
                        
                    let verifIdURL = appareil.find(appareilPhoto => appareilPhoto._id === ids)

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

                    let quantite = document.createElement("select");
                        quantite.setAttribute('class', 'quantite')
                        quantite.innerHTML = '<option>Choisissez la quantité</option>' // si besoin pour cart rajouter dans la balise option  : disabled selected hidden
                        document.querySelector('.panier').appendChild(cardDiv).appendChild(quantite); // ajout de menuOptions dans les menuDéroulants
        
                        

                    let boutonValiderPanier = document.createElement("button");
                        boutonValiderPanier.textContent = 'Valider';
                        boutonValiderPanier.setAttribute('class', 'boutonValider')
                        document.querySelector('.panier').appendChild(cardDiv).appendChild(boutonValiderPanier);
                    
                        boutonValiderPanier.addEventListener('click', function(){
                          

                            // localStorage.removeItem("tableauStorage[0]", JSON.parse(localStorage))
                           console.log(tableauStorage)

                        // let tableauStorage = JSON.parse(JSON.stringify(localStorage));
                            console.table(tableauStorage)

                              }); //fermeture addEventListener click button
                             })//fermeture for each arrayUnique.id
                        })// fermeture de itemData.then
            
        .catch(function(erreur){
            alert("Une erreur JS est survenue")
        })// fermeture .catch
    });// fermeture then response
}// fermeture carteProduit

const effacer = document.querySelectorAll("button")
Panier() // appelle carteProduit