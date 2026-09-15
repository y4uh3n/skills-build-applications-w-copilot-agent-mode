import { Router, Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from './models';

const router = Router();

const asyncHandler = (handler: (req: Request, res: Response) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    handler(req, res).catch(next);
  };

const resourceRoutes = <T>(model: Model<T>) => {
  const resource = Router();

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

router.use('/users', resourceRoutes(UserModel));
router.use('/teams', resourceRoutes(TeamModel));
router.use('/activities', resourceRoutes(ActivityModel));
router.use('/leaderboard', resourceRoutes(LeaderboardModel));
router.use('/workouts', resourceRoutes(WorkoutModel));

export default router;