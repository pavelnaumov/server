export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    googleID: DataTypes.STRING
  });

  User.associate = models => {
    models.User.hasMany(models.Post);
  };

  return User;
};
