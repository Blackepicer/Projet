module.exports = (dbinfo, Sequelize) =>{
    return dbinfo.define(
        "tbl_pays",
        {
            id:{
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nom:{
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false
            }
        },
        {
            timestamps: false,
            underscored: true
        }
    );
};