
const url =	"http://localhost:3000/api/cameras/";
console.log(url)

// fetch pour créer le texte et importer images des appareils photo

let appareils = []; // tableau reception tableau promise

let texteImages =  async function() { //fonction asynchrone pour laisser charger le reste du site avant
    let response = await fetch(url)
        .then((response)=>{
            let itemData = response.json(); // renvoit la promesse en JSON
                    console.log(response.body)
                appareils.push(itemData) //envoit les réponses reçues de JSON dans tableau appareils recenssant tous les appareils
                    console.log(appareils)

                itemData.then(function (appareil){
                    appareils.push(...appareil)// (opérateur de décomposition : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Spread_syntax) Array appareil contenant chaque élément du Json "...appareil" pour importer tous les appareils dans le tableau appareil
                        console.table(appareil)

                    appareil.forEach((appareilPhoto) => {

                        let cardDiv = document.createElement("div") // créé une div reprensentant la card des produits
                            cardDiv.setAttribute('class', 'card')
                            document.querySelector('.caroussel').appendChild(cardDiv);

                            console.log(appareilPhoto.name + " " + appareilPhoto.price + appareilPhoto.imageUrl) // pour chaque élément reçu du JSON et enregistré dans notre array appareil, on va créer des images, texte, titre, prix issu du JSON et jouer sur le DOM pour les afficher dans le navigateur
                        let img = new Image(); // display des images
                            img.src = appareilPhoto.imageUrl; //donne les urls des photos dans du JSON
                            img.alt = appareilPhoto.description;    
                            console.log(img)
                            document.querySelector('.caroussel').appendChild(cardDiv).appendChild(img);// display des photos en tant qu'img dans le html
                        
                        let nomObjet = document.createElement("h2") // créé un élément HTML H2 pour le nom du produit
                            nomObjet.textContent = appareilPhoto.name;
                            document.querySelector('.caroussel').appendChild(cardDiv).appendChild(nomObjet);
                                console.log(nomObjet)
                        
                        let prixObjet = document.createElement("h3") // créé un élément HTML H3 pour le prix du produit
                            prixObjet.textContent = (appareilPhoto.price/100).toFixed(2) + ' €'; // .toFixed(2) pour mettre la virgule et deux chiffres après
                            document.querySelector('.caroussel').appendChild(cardDiv).appendChild(prixObjet);
                                console.log(prixObjet)

                        let descriptionObjet = document.createElement("p") // Créé une zone de texte pour la description de l'objet
                            descriptionObjet.textContent = appareilPhoto.description;
                            document.querySelector('.caroussel').appendChild(cardDiv).appendChild(descriptionObjet);
                                console.log(descriptionObjet)

                        let menuDeroulant = document.createElement("select");
                            menuDeroulant.setAttribute('class', 'options-lenses')
                            menuDeroulant.innerHTML = '<option>Choisissez votre option</option>' // si besoin pour cart rajouter dans la balise option  : disabled selected hidden

                        appareilPhoto.lenses.forEach((lense) => {
                            let menuOptions = document.createElement("option");
                                menuOptions.text = lense
                                    console.log(menuOptions)
                                document.querySelector('.caroussel').appendChild(cardDiv).appendChild(menuDeroulant).appendChild(menuOptions); // ajout de menuOptions dans les menuDéroulants
                                    console.log(lense)
                        })// fermeture forEach lenses
         
                    });// fermeture appareils.forEach appareilPhoto dans tableau appareil
         
                })// fermeture de itemData.then
                
        .catch(function(erreur){
            alert("Une erreur JS est survenue")
        })// fermeture .catch
    });// fermeture then response
}// fermeture fonction texteImage
    texteImages()

