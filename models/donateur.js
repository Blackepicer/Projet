module.exports = (dbinfo, Sequelize) =>{
    return dbinfo.define (
        "tbl_donateur",
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
            prenom: {
                type: Sequelize.DataTypes.STRING(50),
                allowNull: false
            },
            email: {
                type: Sequelize.DataTypes.STRING(80),
                allowNull: false
            },
            tel: {
                type: Sequelize.DataTypes.INTEGER(50),
                allowNull: false
            },
            adresse: {
                type: Sequelize.DataTypes.STRING(100),
                allowNull: false
            },
            cp: {
                type: Sequelize.DataTypes.INTEGER(5),
                allowNull: false
            },
            ville: {
                type: Sequelize.DataTypes.STRING(30),
                allowNull: false
            },
            pays: {
                type: Sequelize.DataTypes.STRING(30),
                allowNull: false
            }
        },
        {
            timestamps: true,
            underscored: true
        }
    );
}