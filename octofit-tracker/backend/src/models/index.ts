import mongoose, { Schema } from 'mongoose';

export interface User {
  name: string;
  email: string;
  password?: string;
  teamId?: mongoose.Types.ObjectId;
}

export interface Team {
  name: string;
  description?: string;
  memberIds: mongoose.Types.ObjectId[];
}

export interface Activity {
  userId: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  points: number;
  completedAt: Date;
}

export interface LeaderboardEntry {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  points: number;
  period: string;
}

export interface Workout {
  title: string;
  description: string;
  difficulty: string;
  durationMinutes: number;
  activityType: string;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, select: false },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
}, { timestamps: true });

const teamSchema = new Schema<Team>({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const activitySchema = new Schema<Activity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, trim: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  distanceKm: { type: Number, min: 0 },
  points: { type: Number, required: true, min: 0, default: 0 },
  completedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const leaderboardSchema = new Schema<LeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  points: { type: Number, required: true, min: 0, default: 0 },
  period: { type: String, required: true, default: 'all-time' },
}, { timestamps: true });

const workoutSchema = new Schema<Workout>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  difficulty: { type: String, required: true, trim: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  activityType: { type: String, required: true, trim: true },
}, { timestamps: true });

export const UserModel = mongoose.model<User>('User', userSchema);
export const TeamModel = mongoose.model<Team>('Team', teamSchema);
export const ActivityModel = mongoose.model<Activity>('Activity', activitySchema);
export const LeaderboardModel = mongoose.model<LeaderboardEntry>('Leaderboard', leaderboardSchema);
export const WorkoutModel = mongoose.model<Workout>('Workout', workoutSchema);