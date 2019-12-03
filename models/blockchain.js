'use strict';
module.exports = (sequelize, DataTypes) => {
  const blockchain = sequelize.define('blockchain', {
    index: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    }
    });

    blockchain.associate = function(models) {
      
    }

  return blockchain;
};
