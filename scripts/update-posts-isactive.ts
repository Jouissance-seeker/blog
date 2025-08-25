import connectDB from '../lib/mongodb';
import { PostModel } from '../models/post';
import dotenv from 'dotenv';

dotenv.config();

async function updatePostsIsActive() {
  try {
    await connectDB();
    console.log('connected to database');

    const result = await PostModel.updateMany(
      { isActive: { $exists: false } },
      { $set: { isActive: 'yes' } },
    );

    console.log(`updated ${result.modifiedCount} posts with isActive: 'yes'`);

    const totalPosts = await PostModel.countDocuments();
    console.log(`total posts in database: ${totalPosts}`);

    const postsWithIsActive = await PostModel.countDocuments({
      isActive: { $exists: true },
    });
    console.log(`posts with isActive field: ${postsWithIsActive}`);

    process.exit(0);
  } catch (error) {
    console.error('error updating posts:', error);
    process.exit(1);
  }
}

updatePostsIsActive();
