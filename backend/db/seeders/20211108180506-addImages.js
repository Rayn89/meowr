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
    {
      content: "Another kitty!!",
      imageUrl:
        "https://res.cloudinary.com/deaekdi5y/image/upload/v1636941455/photo-1628936915525-289c5314123c_t8szmy.jpg",
      albumId: 1,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      content: "Black and white",
      imageUrl:
        "https://res.cloudinary.com/deaekdi5y/image/upload/v1636941384/photo-1634115570696-cfaef92944f7_oe2l4o.jpg",
      albumId: 1,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      content: "Orange",
      imageUrl:
        "https://res.cloudinary.com/deaekdi5y/image/upload/v1636941326/photo-1634115503749-0d2b50fe4caa_dtiieo.jpg",
      albumId: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      content: "Christmas cat",
      imageUrl:
        "https://res.cloudinary.com/deaekdi5y/image/upload/v1636941282/photo-1559224372-8543e6ed6f90_p2xqdg.jpg",
      albumId: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      content: "Fluffy boy!",
      imageUrl:
        "https://res.cloudinary.com/deaekdi5y/image/upload/v1636941233/photo-1605450648855-63f9161b7ef7_utaba8.jpg",
      albumId: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      content: "Christmas cat",
      imageUrl:
        "https://res.cloudinary.com/deaekdi5y/image/upload/v1636941109/photo-1618596845253-8b1cd8f1fd9d_tlzybr.jpg",
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
    return queryInterface.bulkDelete('Images', null, {});
  }
};
