"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
(0, typeorm_1.getConnectionOptions)().then(options => {
    const newOptions = options;
    newOptions.host = 'database'; // Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
    (0, typeorm_1.createConnection)(Object.assign({}, options));
});
