module.exports = (sequelize, DataTypes) => {
  const listed_products = sequelize.define("listed_products", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    distributor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    photo: {
      type: DataTypes.BLOB,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  return listed_products;
};
