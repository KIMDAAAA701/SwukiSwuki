'use strict';
module.exports = (sequelize, DataTypes) => {
  const log_vote_file = sequelize.define('log_vote_file', {
    Yes_vote: {
        type: DataTypes.INTEGER
      },
    No_vote: {
        type: DataTypes.INTEGER
    },
    vote_result: {
        type: DataTypes.CHAR
    }
  });

  log_vote_file.associate = function(models) {
      
    }

  return log_vote_file;
};
