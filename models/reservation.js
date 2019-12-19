module.exports = (dbinfo, Sequelize) =>{
    return dbinfo.define(
        "tbl_reservation",
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            reserver: {
                type:Sequelize.DataTypes.DATEONLY,
                allowNull: false
            },
            nbre_place:{
                type: Sequelize.DataTypes.STRING(100),
                allowNull: false
            }
        },
        {
            timestamps: true,
            underscored: true
        }
    )
}