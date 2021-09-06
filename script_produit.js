
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

                    let title = document.title; // ajout titre page dynamique selon produit
                        document.title = 'Orinoco ' + '- ' + verifIdURL.name; // ajout titre page dynamique selon produit
                    
                        let titleObjectPage = document.createElement("h1")
                        titleObjectPage.setAttribute('class','fst-italic text-center')
                        titleObjectPage.innerText = verifIdURL.name
                        document.querySelector('.titre').appendChild(titleObjectPage)

                    let cardDiv = document.createElement("div") // créé une div reprensentant la card des produits
                        cardDiv.setAttribute('class', 'card-body')
                        document.querySelector('.card').appendChild(cardDiv);
                        
                    let img = new Image(); // display des images
                        img.src = verifIdURL.imageUrl; //donne les urls des photos dans du JSON
                        img.alt = verifIdURL.description;
                        img.setAttribute('id', 'image');
                        img.setAttribute('class', 'card-img-top')
                        document.querySelector('.card').appendChild(img);// display des photos en tant qu'img dans le html

                    let cardTitre = document.createElement("div")
                        cardTitre.setAttribute('class', ' mb-2')
                        document.querySelector('.card').appendChild(cardDiv).appendChild(cardTitre)
                    
                    let nomObjet = document.createElement("h2") // créé un élément HTML H2 pour le nom du produit
                        nomObjet.textContent = verifIdURL.name;
                        nomObjet.setAttribute('class','card-title me-1')
                        document.querySelector('.card').appendChild(cardDiv).appendChild(cardTitre).appendChild(nomObjet);
                            console.log(nomObjet)
                    
                    let prixObjet = document.createElement("p") // créé un élément HTML H3 pour le prix du produit
                        prixObjet.textContent = (verifIdURL.price/100).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' €'; // .toFixed(2) pour mettre la virgule et deux chiffres après + .replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') pour mettre separateur miliers et virgule au lieux du point
                        prixObjet.setAttribute('class','card-text')
                        document.querySelector('.card').appendChild(cardDiv).appendChild(cardTitre).appendChild(prixObjet);
                            console.log(prixObjet)

                    let cardSelection = document.createElement("div")
                        cardSelection.setAttribute('class', 'row')
                        document.querySelector('.card').appendChild(cardDiv).appendChild(cardSelection)

                    let menuDeroulant = document.createElement("select");
                        menuDeroulant.setAttribute('class', 'btn btn-outline-primary mb-1')
                        menuDeroulant.innerHTML = '<option>Lentilles</option>' // si besoin pour cart rajouter dans la balise option  : disabled selected hidden
                    
                        verifIdURL.lenses.forEach((lense) => {
                                
                                let menuOptions = document.createElement("option");
                                    menuOptions.text = lense
                                        console.log(menuOptions)
                                    document.querySelector('.card').appendChild(cardDiv).appendChild(cardSelection).appendChild(menuDeroulant).appendChild(menuOptions); // ajout de menuOptions dans les menuDéroulants
                                        console.log(lense)
                            });// fermeture forEach lenses
                            
    
                    let boutonAjouterPanier = document.createElement("button");
                        boutonAjouterPanier.textContent = 'Ajouter au panier';
                        boutonAjouterPanier.setAttribute('class','btn btn-primary mb-1')
                        document.querySelector('.card').appendChild(cardDiv).appendChild(cardSelection).appendChild(boutonAjouterPanier);
                    
                    boutonAjouterPanier.addEventListener('click', function(){

                        //fonction storage id/nom/link image au click sur le bouton ajouter au panier
                        let tableauStorage = localStorage.getItem("tableauStorage");
                        let tableauStorageLocal = [];
                            if(tableauStorage){
                                tableauStorageLocal=JSON.parse(tableauStorage);
                                console.log(tableauStorageLocal)
                            }
                        tableauStorageLocal.push({"nom": verifIdURL.name, "_id": verifIdURL._id, "img": verifIdURL.imageUrl, "Quantite":'1', "prix": (verifIdURL.price/100).toFixed(2), "prixTotalObjet":(verifIdURL.price/100).toFixed(2) });
                            localStorage.setItem("tableauStorage", JSON.stringify(tableauStorageLocal))
                            
                        console.log(tableauStorageLocal)
                                //localStorage.clear()
                        }); //fermeture addEventListener click button


                    let descriptionObjet = document.createElement("p") // Créé une zone de texte pour la description de l'objet
                        descriptionObjet.setAttribute('class','card-body text-center')
                        descriptionObjet.textContent = verifIdURL.description;
                        document.querySelector('.card').appendChild(cardDiv).appendChild(descriptionObjet);
                            console.log(descriptionObjet)


                        })// fermeture de itemData.then
            
        .catch(function(erreur){
            alert("Une erreur JS est survenue")
        })// fermeture .catch
    });// fermeture then response
}// fermeture carteProduit
carteProduit() // appelle carteProduit