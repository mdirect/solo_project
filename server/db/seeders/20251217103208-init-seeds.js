'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Дарья',
          email: 'test@ya.ru',
          password: await bcrypt.hash('Qwerty1!', 10),
          active: true,
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Plans',
      [
        {
          userId: 1,
          title: 'Один',
          description: 'Один описание',
          image: '1.png',
        },
        {
          userId: 1,
          title: 'Два',
          description: 'Два описание',
          image: '1.png',
        },
        {
          userId: 1,
          title: 'Три',
          description: 'Три описание',
          image: '1.png',
        },
        {
          userId: 1,
          title: 'Четыре',
          description: 'Четыре описание',
          image: '1.png',
        },
        {
          userId: 1,
          title: 'Пять',
          description: 'Пять описание',
          image: '1.png',
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Points',
      [
        {
          planId: 1,
          name: 'Один',
          image: '1.png',
          description: 'Один описание',
          status: false,
          x: 0,
          y: 0,
          layer: 1,
        },
        {
          planId: 1,
          name: 'Два',
          image: '1.png',
          description: 'Два описание',
          status: true,
          x: 100,
          y: 100,
          layer: 2,
        },
        {
          planId: 1,
          name: 'Три',
          image: '1.png',
          description: 'Три описание',
          status: false,
          x: 200,
          y: 200,
          layer: 3,
        },
        {
          planId: 1,
          name: 'Четыре',
          image: '1.png',
          description: 'Четыре описание',
          status: false,
          x: 400,
          y: 500,
          layer: 4,
        },
        {
          planId: 1,
          name: 'Пять',
          image: '1.png',
          description: 'Пять описание',
          status: false,
          x: 200,
          y: 700,
          layer: 4,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Points', null, {});
    await queryInterface.bulkDelete('Plans', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
