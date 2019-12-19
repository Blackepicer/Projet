module.exports = (dbinfo, Sequelize) =>{
    return dbinfo.define (
        "tbl_note",
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            note: {
                type: Sequelize.DataTypes.INTEGER(5),
                allowNull: false
            },
            avis: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true
            }
        },
        {
            timestamps: true,
            underscored: true
        }
    );
}