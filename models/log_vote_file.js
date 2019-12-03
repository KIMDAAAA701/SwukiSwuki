'use strict';
module.exports = (sequelize, DataTypes) => {
  const log_vote_file = sequelize.define('log_vote_file', {
    index: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Yes_vote: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
    No_vote: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    vote_result: {
        type: DataTypes.CHAR,
        allowNull: true
    }
  });

  log_vote_file.associate = function(models) {
      
    }

  return log_vote_file;
};
