import {
    Sequelize,
    DataTypes
} from 'sequelize';

export interface PropertyAttributes {
    name ? : string;
    owner ? : string;
}

export interface PropertyInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    name: string;
    owner: string;

}

// @ts-ignore
module.exports = (sequelize: Sequelize, dataTypes: DataTypes) => {
    var Property = sequelize.define('Property', {
        name: dataTypes.STRING,
        owner: dataTypes.STRING
    });

    // Property.associate = function(models) {
    //     // associations can be defined here
    // };

    return Property;
};
