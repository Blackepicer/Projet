module.exports = (dbinfo, Sequelize) =>{
    return dbinfo.define(
        "tbl_oeuvre",
        {
            id:{
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nom: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            date_publication:{
                type: Sequelize.DataTypes.DATE,
                allowNull: false
            },
            img:{
                type: Sequelize.DataTypes.TEXT
            }
        },
        {
            timestamps: true,
            underscored: true
        }
    );
}