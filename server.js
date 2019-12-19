const express = require("express");
// Express.js est un cadre pour la construction d'applications Web basées sur Node.js.
//  * Ceci est le cadre standard pour le développement de serveurs dans Node.js.

const bodyParser = require("body-parser");
//  Node.js Parsing analysant le middleware.
//  * Analyser les corps des demandes entrantes dans un middleware avant vos gestionnaires, disponible dans la propriété req.body.
//  * Remarque La forme de req.body étant basée sur une entrée contrôlée par l'utilisateur, toutes les propriétés et valeurs de cet objet ne sont pas fiables et doivent être validées avant l'approbation. Par exemple, req.body.foo.toString () peut échouer de plusieurs manières. Par exemple, la propriété foo peut ne pas exister ou ne pas être une chaîne, et toString peut ne pas être une fonction mais plutôt une chaîne ou une autre entrée utilisateur.
//  * @type {Parsers}

const cors = require("cors");
// Le partage de ressources inter-origines (CORS) est une spécification du W3C qui permet les requêtes inter-domaines provenant de navigateurs compatibles.
//  Si l'API que vous interrogez est compatible avec CORS, vous pourrez y accéder même s'il ne se trouve pas sur le même domaine que votre application.

//  CORS sont compatibles avec:

//  -------------------
//  -------------------
//  Chrome 3+
//  Firefox 3.5+
//  Opéra 12+
//  Safari 4+
//  Internet Explorer 8+

//  ---------------------
//  ----------------------

//  Pour utiliser CORS, il est nécessaire d’envoyer au serveur les en-têtes de contrôle d’accès qu’il inspectera pour approuver ou non la demande.
//  Ces en-têtes de contrôle d'accès décriront le contexte de la demande, sa méthode HTTP, son origine, ses en-têtes person

const port = process.env.PORT || 3000;
// end Require des modules
// lance le serveur avec tous les paramètres
// que le port sur lequel vous pouvez appeler pour utiliser votre serveur en local

const app = express();
// app = express

app.use(cors());
// in our app we use cors

app.use(bodyParser.json());
// in our app we user bodyParser in json

app.use(bodyParser.urlencoded({extended: false}));

// stockez-le dans une variable nommée bodyParser. Le middleware permettant de gérer les données encodées en URL est renvoyé par bodyParser.urlencoded ({extended: false}).
//  * extended = false est une option de configuration qui demande à l'analyseur d'utiliser le codage classique. Lors de son utilisation, les valeurs ne peuvent être que des chaînes ou des tableaux.

// require router (je déclare ma route)
const pays = require("./router/pays");
const agenda = require("./router/agenda");
const art = require("./router/art");
const artiste = require("./router/artiste");
const evenement = require("./router/evenement");
const formulaire = require("./router/formulaire");
const oeuvre = require("./router/oeuvre");
const donateur = require("./router/donateur");
const paiement =  require("./router/paiement");
const note = require("./router/note");
const administrateur = require("./router/administrateur");
const reservation = require('./router/reservation');
const user = require("./router/user");


// je fais appel à mes fichiers ROUTES
app.use("/pays", pays);
app.use("/agenda", agenda);
app.use("/art", art);
app.use("/artiste", artiste);
app.use("/evenement", evenement);
app.use("/formulaire", formulaire);
app.use("/oeuvre", oeuvre);
app.use("/donateur", donateur);
app.use("/paiement", paiement);
app.use("/note", note);
app.use("/administrateur", administrateur);
app.use("/reservation", reservation);
app.use("/user", user)



app.listen(port, function () {
    console.log("server start on " + port)
});