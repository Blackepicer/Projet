module.exports = (dbinfo, Sequelize) =>{
    return dbinfo.define(
        "tbl_formulaire",
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nom: {
                type: Sequelize.DataTypes.STRING(50),
                allowNull: false
            },
            prenom:{
                type: Sequelize.DataTypes.STRING(60),
                allowNull: false
            },
            email:{
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false
            },
            tel:{
                type: Sequelize.DataTypes.INTEGER(30),
                allowNull: false
            },
            message:{
                type: Sequelize.DataTypes.TEXT,
                allowNull: false
            },
        },
        {
            timestamps: true,
            underscored: true
        }
    );
}