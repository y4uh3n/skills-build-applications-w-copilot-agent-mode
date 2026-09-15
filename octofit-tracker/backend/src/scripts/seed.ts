import mongoose from 'mongoose';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const users = await UserModel.create([
      { name: 'Maya Chen', email: 'maya.chen@example.com' },
      { name: 'Jordan Williams', email: 'jordan.williams@example.com' },
      { name: 'Avery Patel', email: 'avery.patel@example.com' },
      { name: 'Riley Thompson', email: 'riley.thompson@example.com' },
    ]);

    const teams = await TeamModel.create([
      {
        name: 'Summit Sprinters',
        description: 'Consistent runners working toward new personal bests.',
        memberIds: [users[0]._id, users[1]._id],
      },
      {
        name: 'Core Crew',
        description: 'Strength and mobility enthusiasts building healthy habits.',
        memberIds: [users[2]._id, users[3]._id],
      },
    ]);

    await UserModel.bulkWrite([
      { updateOne: { filter: { _id: users[0]._id }, update: { teamId: teams[0]._id } } },
      { updateOne: { filter: { _id: users[1]._id }, update: { teamId: teams[0]._id } } },
      { updateOne: { filter: { _id: users[2]._id }, update: { teamId: teams[1]._id } } },
      { updateOne: { filter: { _id: users[3]._id }, update: { teamId: teams[1]._id } } },
    ]);

    await ActivityModel.create([
      { userId: users[0]._id, type: 'Running', durationMinutes: 32, distanceKm: 5.1, points: 51, completedAt: new Date('2026-09-12') },
      { userId: users[1]._id, type: 'Walking', durationMinutes: 45, distanceKm: 3.8, points: 38, completedAt: new Date('2026-09-13') },
      { userId: users[2]._id, type: 'Strength training', durationMinutes: 40, points: 40, completedAt: new Date('2026-09-14') },
      { userId: users[3]._id, type: 'Cycling', durationMinutes: 50, distanceKm: 14.2, points: 71, completedAt: new Date('2026-09-14') },
    ]);

    await LeaderboardModel.create([
      { userId: users[3]._id, teamId: teams[1]._id, points: 71, period: 'monthly' },
      { userId: users[0]._id, teamId: teams[0]._id, points: 51, period: 'monthly' },
      { userId: users[2]._id, teamId: teams[1]._id, points: 40, period: 'monthly' },
      { userId: users[1]._id, teamId: teams[0]._id, points: 38, period: 'monthly' },
    ]);

    await WorkoutModel.create([
      {
        title: 'Starter Run',
        description: 'A steady run with a gentle warm-up and cool-down.',
        difficulty: 'Beginner',
        durationMinutes: 25,
        activityType: 'Running',
      },
      {
        title: 'Full Body Basics',
        description: 'A balanced bodyweight circuit for building foundational strength.',
        difficulty: 'Beginner',
        durationMinutes: 30,
        activityType: 'Strength training',
      },
      {
        title: 'Mobility Reset',
        description: 'A focused mobility session for hips, shoulders, and spine.',
        difficulty: 'Intermediate',
        durationMinutes: 20,
        activityType: 'Mobility',
      },
    ]);

    console.log('Database seeding complete: 4 users, 2 teams, 4 activities, 4 leaderboard entries, and 3 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
