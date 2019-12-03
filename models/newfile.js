'use strict';
module.exports = (sequelize, DataTypes) => {
  const newfile = sequelize.define('newfile', {
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
    },
    onVote: {
      type: DataTypes.CHAR,
      allowNull: true
    }
  });

  return newfile;
};
