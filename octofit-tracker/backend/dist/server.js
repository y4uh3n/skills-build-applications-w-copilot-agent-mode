"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = require("./config/database");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api', (_req, res) => {
    res.json({ name: 'Octofit Tracker API', status: 'ok' });
});
app.use('/api', routes_1.default);
app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(400).json({ message: error.message || 'Request failed' });
});
exports.default = app;
if (require.main === module) {
    (0, database_1.connectDatabase)()
        .then(() => {
        app.listen(PORT, () => {
            console.log(`Octofit Tracker API listening at ${baseUrl}`);
        });
    })
        .catch((error) => {
        console.error('Unable to start the API:', error);
        process.exitCode = 1;
    });
}
