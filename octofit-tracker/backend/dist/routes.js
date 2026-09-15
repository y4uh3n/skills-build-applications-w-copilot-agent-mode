"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("./models");
const router = (0, express_1.Router)();
const asyncHandler = (handler) => (req, res, next) => {
    handler(req, res).catch(next);
};
const resourceRoutes = (model) => {
    const resource = (0, express_1.Router)();
    resource.get('/', asyncHandler(async (_req, res) => {
        res.json(await model.find().sort({ createdAt: -1 }));
    }));
    resource.post('/', asyncHandler(async (req, res) => {
        const item = await model.create(req.body);
        res.status(201).json(item);
    }));
    resource.get('/:id', asyncHandler(async (req, res) => {
        const item = await model.findById(req.params.id);
        if (!item) {
            res.status(404).json({ message: 'Resource not found' });
            return;
        }
        res.json(item);
    }));
    resource.patch('/:id', asyncHandler(async (req, res) => {
        const item = await model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!item) {
            res.status(404).json({ message: 'Resource not found' });
            return;
        }
        res.json(item);
    }));
    resource.delete('/:id', asyncHandler(async (req, res) => {
        const item = await model.findByIdAndDelete(req.params.id);
        if (!item) {
            res.status(404).json({ message: 'Resource not found' });
            return;
        }
        res.status(204).send();
    }));
    return resource;
};
router.use('/users', resourceRoutes(models_1.UserModel));
router.use('/teams', resourceRoutes(models_1.TeamModel));
router.use('/activities', resourceRoutes(models_1.ActivityModel));
router.use('/leaderboard', resourceRoutes(models_1.LeaderboardModel));
router.use('/workouts', resourceRoutes(models_1.WorkoutModel));
exports.default = router;
