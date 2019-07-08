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
    models.User.belongsToMany(User, { as: 'Friends', through: 'friends' });
    models.User.belongsToMany(User, { as: 'Requestees', through: 'friendRequests', foreignKey: 'requesterId', onDelete: 'CASCADE'});
    models.User.belongsToMany(User, { as: 'Requesters', through: 'friendRequests', foreignKey: 'requesteeId', onDelete: 'CASCADE'});
  };

  return User;
};
