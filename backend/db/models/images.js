'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      albumId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  Image.associate = function(models) {
      Image.belongsTo(models.Album, { foreignKey: "albumId" });
      Image.belongsTo(models.User, { foreignKey: "userId" });
      Image.hasMany(models.Comment, { foreignKey: "imageId", onDelete: "CASCADE", hooks: true });
  };
  return Image;
};