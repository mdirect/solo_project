'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'TestUser',
          email: 'testUser@mail.ru',
          password: await bcrypt.hash('123456', 10),
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Dictionaries',
      [
        {
          userId: 1,
          word: 'React',
          description:
            'Компонент (библиотека, фреймворк) для разработки клиентской части веб-сайта',
          tag: 'frontend',
        },
        {
          userId: 1,
          word: 'Sequelize',
          description: 'Компонент для общения с базой данных в серверной части веб-сайта',
          tag: 'db',
        },
        {
          userId: 1,
          word: 'Morgan',
          description:
            'Компонент для получение логов в консоли в серверной части веб-сайта',
          tag: 'backend',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Dictionaries', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
