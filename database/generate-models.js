var SequelizeAuto = require('sequelize-auto');

var auto = new SequelizeAuto('myapp', 'root', '', {
    directory: __dirname,
    indentation: 2,
    spaces: true,
});

auto.run();