module.exports = (dbinfo, Sequelize) =>{
    return dbinfo.define(
        "tbl_evenement",
        {
            id:{
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type_events:{
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
        },
        {
            timestamps: true,
            underscored: true
        }
    );
};