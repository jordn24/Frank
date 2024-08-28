import mongoose, { Mongoose, ObjectId } from 'mongoose';
import User from './models/User';
import 'dotenv/config'

class DatabaseHandler {

  private dataBaseUrl: string = process.env.DATABASE_URL!;
  private connection: Mongoose | null = null;

  async connect(): Promise<void> {
    try {
      this.connection = await mongoose.connect(this.dataBaseUrl, { dbName: 'MyPortfolioDB' });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
    }
  }

  async getUsers() {
    try {
      const users = await User.find({});
      return users;
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  }
  
  async updateUser(userId: any, fieldName: string, updatedValue: string) {
    try {
      const update = { [fieldName]: updatedValue };
      const user = await User.findByIdAndUpdate(userId, update, { new: true }).exec();
      return user;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  
}

export default DatabaseHandler;