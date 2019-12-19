module.exports = (dbinfo, Sequelize) =>{
    return dbinfo.define(
        "tbl_artiste",
        {
            id:{
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nom: {
                type: Sequelize.DataTypes.STRING(45),
                allowNull: false
            },
            prenom: {
                type: Sequelize.DataTypes.STRING(45),
                allowNull: false
            },
            email: {
                type: Sequelize.DataTypes.STRING,
                allownull: false
            },
            tel:{
                type: Sequelize.DataTypes.STRING(30),
                allowNull: false
            },
        },
        {
            timestamps: true,
            underscored: true
        }
    );
};