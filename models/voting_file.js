'use strict';
module.exports = (sequelize, DataTypes) => {
  const voting_file = sequelize.define('voting_file', {
    index: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    writer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      uniqeu: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
    }); 

    voting_file.associate = function(models) {
      
    }

  return voting_file;
};
