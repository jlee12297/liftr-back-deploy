const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Coach extends Model {
    checkPassword(coachPw) {
        return bcrypt.compareSync(coachPw, this.password)
    };
};

Coach.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 20]
            },
        },
        // coach_code: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // }
    },

    {
        hooks: {
            beforeCreate: async (newCoachData) => {
                newCoachData.password = await bcrypt.hash(newCoachData.password, 10);
                return newCoachData;
            },
            beforeUpdate: async (updatedCoachData) => {
                updatedCoachData.password = await bcrypt.hash(updatedCoachData.password, 10);
                return updatedCoachData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'coach',
    }
);

module.exports = Coach;

