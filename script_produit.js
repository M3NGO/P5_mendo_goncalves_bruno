
const url = "http://localhost:3000/api/cameras/";
console.log(url)

let produitIdUrl = window.location.search; //nous montre l'adresse actuelle, où on est.
produitIdUrl = produitIdUrl.substring(4) // substring(4) pour retirer les 4 premiers caractères de la partie search de l'URL, juste après '?' pour obtenir la chaine de caractères de l'id de l'objet à partir de l'url
console.log(produitIdUrl)

// fetch pour créer le texte et importer images des appareils photo

let appareils = []; // tableau reception tableau promise

let carteProduit =  async function() { //fonction asynchrone pour laisser charger le reste du site avant
    let response = await fetch(url)
        .then((response)=>{
            let itemData = response.json(); // renvoit la promesse en JSON
                    console.log(response.body)
                appareils.push(itemData) //envoit les réponses reçues de JSON dans tableau appareils recenssant tous les appareils
                    console.log(appareils)
                    
                itemData.then(function (appareil){
                    appareils.push(...appareil) // (opérateur de décomposition : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Spread_syntax) Array appareil contenant chaque élément du Json "...appareil" pour importer tous les appareils dans le tableau appareil
                        console.table(appareil)
                
                    let verifIdURL = appareil.find(appareilPhoto => appareilPhoto._id === produitIdUrl)
                        console.table(verifIdURL)

                    let cardDiv = document.createElement("div") // créé une div reprensentant la card des produits
                        cardDiv.setAttribute('class', 'card')
                        document.querySelector('.product_card').appendChild(cardDiv);
                        
                    let img = new Image(); // display des images
                        img.src = verifIdURL.imageUrl; //donne les urls des photos dans du JSON
                        img.alt = verifIdURL.description;
                        document.querySelector('.product_card').appendChild(cardDiv).appendChild(img);// display des photos en tant qu'img dans le html
                    
                    let nomObjet = document.createElement("h2") // créé un élément HTML H2 pour le nom du produit
                        nomObjet.textContent = verifIdURL.name;
                        document.querySelector('.product_card').appendChild(cardDiv).appendChild(nomObjet);
                            console.log(nomObjet)
                    
                    let prixObjet = document.createElement("h3") // créé un élément HTML H3 pour le prix du produit
                        prixObjet.textContent = (verifIdURL.price/100).toFixed(2) + ' €'; // .toFixed(2) pour mettre la virgule et deux chiffres après
                        document.querySelector('.product_card').appendChild(cardDiv).appendChild(prixObjet);
                            console.log(prixObjet)

                    let descriptionObjet = document.createElement("p") // Créé une zone de texte pour la description de l'objet
                        descriptionObjet.textContent = verifIdURL.description;
                        document.querySelector('.product_card').appendChild(cardDiv).appendChild(descriptionObjet);
                            console.log(descriptionObjet)

                    let menuDeroulant = document.createElement("select");
                        menuDeroulant.setAttribute('class', 'options-lenses')
                        menuDeroulant.innerHTML = '<option>Choisissez votre option</option>' // si besoin pour cart rajouter dans la balise option  : disabled selected hidden
                    
                    verifIdURL.lenses.forEach((lense) => {
                            
                            let menuOptions = document.createElement("option");
                                menuOptions.text = lense
                                    console.log(menuOptions)
                                document.querySelector('.product_card').appendChild(cardDiv).appendChild(menuDeroulant).appendChild(menuOptions); // ajout de menuOptions dans les menuDéroulants
                                    console.log(lense)
                        })// fermeture forEach lenses

                    let boutonCommander = document.createElement("button")
                        boutonCommander.textContent = 'Ajouter au Panier'
                        document.querySelector('.product_card').appendChild(cardDiv).appendChild(boutonCommander);

                    })// fermeture de itemData.then
                
        .catch(function(erreur){
            alert("Une erreur JS est survenue")
        })// fermeture .catch
    });// fermeture then response
}// fermeture carteProduit
    carteProduit() // appelle carteProduit