module.exports = (dbinfo, Sequelize) =>{
    return dbinfo.define(
        "tbl_user",
        {
          id: {
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
          date_naissance:{
            type: Sequelize.DataTypes.DATE,
            allowNull: false
          },
          email:{
            type: Sequelize.DataTypes.STRING(200),
            allowNull: false
          },
          password:{
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          },
          confirm_password:{
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          },
          tel: {
            type: Sequelize.DataTypes.INTEGER(50),
            allowNull: false
          },
          adresse:{
            type: Sequelize.DataTypes.STRING(200),
            allowNull: false
          },
          cp: {
            type: Sequelize.DataTypes.INTEGER(10),
            allowNull: false
          },
          ville: {
            type: Sequelize.DataTypes.STRING(50),
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