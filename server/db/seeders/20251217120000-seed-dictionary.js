'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Dictionaries',
      [
        {
          word: 'JavaScript',
          description:
            'Язык программирования для веба, поддерживающий событийную модель и асинхронность.',
          tags: ['frontend'],
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: 'Promise',
          description:
            'Объект, представляющий результат асинхронной операции: pending, fulfilled или rejected.',
          tags: ['async'],
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          word: 'REST API',
          description: 'Архитектурный стиль взаимодействия клиент–сервер через HTTP.',
          tags: ['backend'],
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Dictionaries', null, {});
  },
};
