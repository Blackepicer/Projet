module.exports = (dbinfo, Sequelize) =>{
    return dbinfo.define (
        "tbl_paiement",
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            montant: {
                type: Sequelize.DataTypes.DECIMAL(5.7),
                allowNull: false
            }

        },
        {
            timestamps: true,
            underscored: true
        }
    );
}