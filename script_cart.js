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

                        console.log(localStorage)

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

                    let quantite = document.createElement("input");
                        quantite.setAttribute('class', 'quantite')
                        quantite.setAttribute('type', 'number')
                        quantite.setAttribute('value', '1')
                        quantite.setAttribute('min', '1')
                        quantite.setAttribute('max', '10') // qté max de 10 on suppose que le stock est de 10
                        quantite.placeholder = 'Choisissez la quantité'
                        document.querySelector('.panier').appendChild(cardDiv).appendChild(quantite); // ajout de menuOptions dans les menuDéroulants
                    



                    let boutonValiderPanier = document.createElement("button");
                        boutonValiderPanier.textContent = 'Valider';
                        
                        boutonValiderPanier.setAttribute('class', 'boutonValider')
                        document.querySelector('.panier').appendChild(cardDiv).appendChild(boutonValiderPanier);
                    
 
                        

                    let boutonX = document.createElement("button");
                        boutonX.textContent = 'X';
                        boutonX.setAttribute('class', 'boutonValider')
                        document.querySelector('.panier').appendChild(cardDiv).appendChild(boutonX);
            
                        boutonX.addEventListener('click', function(){
                        let appareilFind= tableauStorage.find(appareil => appareil.id === ids) // appareilfind pour déclarer une variable pour trouver l'id de lappareil clické, on s'en sert ensuite pour le splice du nouveau tableau
                        console.log(appareilFind)

                        
                        
                    
                    let arrayUniqueFiltre = arrayUnique.splice(arrayUnique.indexOf(appareilFind) , 1)//creation nouveau tableau arrayuniquefiltre pour stocker la valeur qu'on retire du tableau arrayUnique
                        console.log(arrayUniqueFiltre)
                        console.log(arrayUnique)
                        localStorage.setItem("tableauStorage", JSON.stringify(arrayUnique)) // on set le nouveau tableau arrayunique sans larrayuniquefiltre dans le tableauStorage du localstorage pour remplacer l'ancien tableau par le nouveau
                        tableauStorage = JSON.parse(localStorage.getItem("tableauStorage")); // on parse le nouveau tableauStorage pour recréer la page du panier
                    })// fermeture addEventListener boutonX
                        console.log(arrayUnique)

                        let tableauTotal =document.createElement("div");
                        tableauTotal.setAttribute ('class', 'tableauTotal')
                        document.querySelector('.panier').appendChild(cardDiv).appendChild(tableauTotal)
    

                        let prixTotalApprareil = document.createElement("p"); 
                        prixTotalApprareil.setAttribute('class', 'prixTotalAppareil')

                        prixTotalApprareil.innerHTML = (verifIdURL.price/100).toFixed(2) + ' ' + '€';
                        console.log(prixTotalApprareil.innerHTML)
                        let totalLigne = boutonValiderPanier.addEventListener('click', function (){
   
                            prixTotalApprareil.innerHTML = (document.getElementsByClassName("prixTotalAppareil").innerHTML = quantite.value)*((verifIdURL.price/100).toFixed(2)) + ' ' + '€';
                            console.log(prixTotalApprareil.innerHTML)
                            }); //fermeture addEventListener click button
                        console.log(prixTotalApprareil.innerHTML)
                         
                        prixTotalApprareil.innerHTML = totalLigne
                    
                        document.querySelector('.panier').appendChild(cardDiv).appendChild(tableauTotal).appendChild(prixTotalApprareil); // ajout de menuOptions dans les menuDéroulants

                        

                             })//fermeture for each arrayUnique.id
                        })// fermeture de itemData.then
            
        .catch(function(erreur){
            alert("Une erreur JS est survenue")
        })// fermeture .catch
    });// fermeture then response
}// fermeture carteProduit


Panier() // appelle carteProduit