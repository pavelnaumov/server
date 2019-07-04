export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
        type: DataTypes.STRING
    }
  });

  User.associate = models => {
    models.User.hasMany(models.Post);
  };

  return User;
};
