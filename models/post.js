export default (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  });

  Post.associate = models => {
    Post.belongsTo(models.User);
  };

  return Post;
};
