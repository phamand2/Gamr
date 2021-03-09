const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let games = [];
    for (let i = 0; i < 10; i++) {
      const game = {
        name: faker.random.word(),
        platform: faker.random.arrayElement(["PC", "PS5", "Xbox Series X"]),
        genre: faker.random.arrayElement(["FPS", "Action", "Adventure"]),
        releaseDate: faker.date.past(),
        difficulty: faker.random.number({ min: 1, max: 10 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      games.push(game);
    }

    await queryInterface.bulkInsert("Games", [
      {
        name: "Among Us",
        platform: "Mobile",
        genre: "N/A",
        releaseDate: "2020-01-01",
        difficulty: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      ...games,
    ]);
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete("Games", null, {});
  },
};
