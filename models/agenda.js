module.exports = (dbinfo, Sequelize) =>{
    return dbinfo.define(
        "tbl_agenda",
        {
            id:{
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            date_debut:{
                type: Sequelize.DataTypes.DATE,
                allowNull: false
            },
            date_fin:{
                type: Sequelize.DataTypes.DATE,
                allowNull: false
            },
        },
        {
            timestamps: true,
            underscored: true
        }
    )
}