module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true // Auto-incrementing primary key
      },
      name: {
          type: Sequelize.STRING
      },
      username: {
          type: Sequelize.STRING
      },
      password: {
          type: Sequelize.STRING
      },
      isActive: {
          type: Sequelize.BOOLEAN
      }
  });

  return User;
};