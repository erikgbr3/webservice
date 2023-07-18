'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Player.belongsTo(models.Club,
        {
          as: 'club',
          foreignKey: 'clubId',
        }   
      );
      models.Player.hasMany(models.GoalScore,
        {
          as: 'goalscore',
          foreignKey: 'playerId',
        }  
      );
      models.FoulCard.hasMany(models.FoulCard,
        {
          as: 'foulcard',
          foreignKey: 'playerId',
        }  
      );
    }
  }
  Player.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El nombre del jugador es obligatorio"
        },
        isAlpha: {
          msg: "Solo se admiten letras"
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El Apellido es obligatorio"
        },
        isAlpha: {
          msg: "Solo se admiten letras"
        }
      }
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La edad es obligatoria"
        }
      }
    },
    numberjersey: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El número del jersey es obligatorio"
        }
      }
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El número de posición es obligatorio"
        }
      }
    },
    cellphone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El número de teléfono es obligatorio"
        }
      }
    },
    curp: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La CURP es obligatoria"
        }
      }
    },
    clubId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      validate: {
        notNull: {
          msg: "El Id del club es obligatorio"
        },
        isNumeric: {
          msg: "Solo se admiten números"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};