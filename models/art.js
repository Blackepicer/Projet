module.exports = (dbinfo, Sequelize) =>{
    return dbinfo.define(
        "tbl_art",
        {
            id:{
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type_art:{
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: false,
            underscored: true
        }
    );
};