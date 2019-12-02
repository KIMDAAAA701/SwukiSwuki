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

  newfile.associate = function(models) {
    models.newfile.hasMany(models.blockchain, {
        foreignKey: 'file_index',
        onDelete: 'no action',
        allowNull: false
    });
  }

  newfile.associate = function(models) {
    models.newfile.hasMany(models.voting_file, {
        foreignKey: 'voting_index',
        onDelete: 'no action',
        allowNull: false
    });
  }

  newfile.associate = function(models) {
    models.newfile.hasMany(models.log_vote_file, {
        foreignKey: 'voting_index',
        onDelete: 'no action',
        allowNull: false
    });
  }

  return newfile;
};
