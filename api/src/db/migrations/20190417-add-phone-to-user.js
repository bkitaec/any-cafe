'use strict';

export default {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('User', 'phone', {
                    type: Sequelize.STRING,
                    unique: 'phone',
                }, { transaction: t })
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('User', 'phone', { transaction: t }),
            ])
        })
    }
};
