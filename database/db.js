// Sequelize est un ORM basé sur des promesses pour Node.js.
//  * Sequelize est facile à apprendre et propose des dizaines de fonctionnalités intéressantes
//  comme la synchronisation, l'association, la validation, etc. Il prend également en charge 
// PostgreSQL, MySQL, MariaDB, SQLite et MSSQL. Je suppose que vous avez démarré une forme de service
//  de base de données SQL sur votre ordinateur. J'utilise actuellement MySQL.
const Sequelize  = require('sequelize');

// ******** déclarer la const de db**********************************
const db = {};

//***************************************************************** */
// nouveau Sequelize ({base de données}, {nom d'utilisateur}, {mot de passe}, options {
//     * hôte: {nom d'hôte},
//     * dialecte: un de 'mysql' | 'mariadb' | 'postgres' | 'mssql', le dialecte de la base de données à laquelle 
// vous vous connectez. Un de mysql, postgres, sqlite et mssql.
//     * port: si vous n'avez pas changé votre port mysql par défaut il sera 3306, ou si vous changez assurez vous
//  d'utiliser votre port,
//     * operatorsAliases: {false},
// pool: {sequelize connexion pool pool
//     * max: {5 numéros de connexion max dans votre base de données}, nombre maximal de connexions dans le pool par défaut: 5
//     * min: {0} Nombre minimal de connexions dans le pool, par défaut: 0,
//     * acquérir: {30000} la durée maximale, en millisecondes, pendant laquelle le pool essaie d’obtenir
//  la connexion avant de générer une erreur, valeur par défaut 60000,
//     * inactif: {10000} Temps maximal, en millisecondes, pendant lequel une connexion peut être inactive
//  avant d'être libérée.*}
const dbinfo = new Sequelize("tah","root","",{
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    operatorsAliases: false,
    pool:{
        max:5,
        min:0,
        acquire: 30000,
        idle: 10000,
    }
});

dbinfo
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// **************************************************************************************************
//     Il existe quatre types d’associations disponibles dans Sequelize.
//  *
//  * BelongsTo (Appartient à): les associations sont des associations où la clé étrangère pour la relation un-à-un
//  existe sur le modèle source.
//  * HasOne: les associations sont des associations dans lesquelles la clé étrangère de la relation un-à-un
//  existe sur le modèle cible.
//  * HasMany: les associations connectent une source avec plusieurs cibles. Cependant, les cibles sont à 
// nouveau connectées à une source spécifique.
//  * BelongsToMany: les associations sont utilisées pour connecter des sources avec plusieurs cibles. 
// En outre, les cibles peuvent également avoir des connexions vers plusieurs sources.
//  *
//MODELS TABLES 
db.pays = require ('../models/pays')(dbinfo,Sequelize);
db.agenda = require('../models/agenda')(dbinfo,Sequelize);
db.art = require('../models/art')(dbinfo,Sequelize);
db.artiste = require('../models/artiste')(dbinfo, Sequelize);
db.evenement = require('../models/evenement')(dbinfo, Sequelize);
db.formulaire = require('../models/formulaire')(dbinfo, Sequelize);
db.oeuvre = require('../models/oeuvre')(dbinfo, Sequelize);
db.note = require('../models/note')(dbinfo, Sequelize);
db.paiement = require('../models/paiement')(dbinfo, Sequelize);
db.donateur = require('../models/donateur')(dbinfo, Sequelize);
db.administrateur = require('../models/administrateur') (dbinfo, Sequelize);
db.user = require('../models/user')(dbinfo, Sequelize);
db.reservation = require('../models/reservation')(dbinfo, Sequelize);


// LES RELATIONS
// un pays a plusieurs artistes
db.pays.hasMany(db.artiste,{foreignKey: "paysId"});

// un artiste a plusieurs oeuvres
db.artiste.hasMany(db.oeuvre,{foreignKey: "artisteId"});
// une oeuvre appartient à un seul artiste
db.oeuvre.belongsTo(db.artiste,{foreignKey:"artisteId"});

db.agenda.hasMany(db.evenement,{foreignKey: "agendaId"});
db.evenement.belongsTo(db.agenda,{foreignKey: "agendaId"});

db.art.hasMany(db.oeuvre,{foreignKey: "artId"});
db.oeuvre.belongsTo(db.art,{foreignKey: "artId"});

db.paiement.belongsTo(db.donateur,{foreignKey: "paiementId"});
db.donateur.hasMany(db.paiement,{foreignKey: "paiementId"});

db.oeuvre.hasMany(db.note,{foreignKey: "oeuvreId"});
db.user.hasMany(db.note,{foreignKey: "userId"});
db.evenement.hasMany(db.note,{foreignKey: "evenementId"})

db.user.hasMany(db.reservation, {foreignKey: "userId"});
db.evenement.hasMany(db.reservation, {foreignKey: "evenementId"})



db.dbinfo = dbinfo;
db.Sequelize = Sequelize;


dbinfo.sync(); 


module.exports = db;