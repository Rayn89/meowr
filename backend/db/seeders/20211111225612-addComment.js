'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Images",
      [
        {
          content: "fatcat",
          imageUrl:
            "https://res.cloudinary.com/deaekdi5y/image/upload/v1636393179/photo-1548247416-ec66f4900b2e_eqk3ka.jpg",
          albumId: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "Tester",
          imageUrl:
            "https://res.cloudinary.com/deaekdi5y/image/upload/v1636393179/photo-1548247416-ec66f4900b2e_eqk3ka.jpg",
          albumId: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "greyyy",
          imageUrl:
            "https://res.cloudinary.com/deaekdi5y/image/upload/v1636393179/photo-1548247416-ec66f4900b2e_eqk3ka.jpg",
          albumId: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "Big cat",
          imageUrl:
            "https://res.cloudinary.com/deaekdi5y/image/upload/v1636393179/photo-1548247416-ec66f4900b2e_eqk3ka.jpg",
          albumId: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("People", null, {});
  },
};
