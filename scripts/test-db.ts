import { config } from 'dotenv';
import { join } from 'path';
import mongoose from 'mongoose';
import connectDB from '../lib/mongodb';

config({ path: join(process.cwd(), '.env.local') });

async function testConnection() {
  console.log('🔍 Testing MongoDB connection...\n');
  try {
    if (!process.env.MONGODB_URI) {
      console.log('❌ MONGODB_URI environment variable is not set');
      console.log('📝 Please create .env.local file with:');
      console.log(
        '   MONGODB_URI=mongodb://localhost:27017/lacanian-psychoanalysis',
      );
      console.log('   (or your MongoDB Atlas connection string)');
      process.exit(1);
    }
    console.log(
      '✅ MONGODB_URI found:',
      process.env.MONGODB_URI.replace(/\/\/.*@/, '//***:***@'),
    );
    console.log('🔌 Attempting to connect to MongoDB...');
    await connectDB();
    console.log('✅ Successfully connected to MongoDB!');
    console.log('📊 Testing database operations...');
    const admin = mongoose.connection.db?.admin();
    const dbs = await admin?.listDatabases();
    console.log(
      '📋 Available databases:',
      dbs?.databases.map((db) => db.name).join(', '),
    );
    const dbName = mongoose.connection.name;
    console.log('🎯 Current database:', dbName);
    const collections = await mongoose.connection
      .db!.listCollections()
      .toArray();
    console.log(
      '📁 Collections in current database:',
      collections.length > 0
        ? collections.map((c) => c.name).join(', ')
        : 'No collections yet',
    );
    const stats = await mongoose.connection.db?.stats();
    console.log('📈 Database stats:');
    console.log(`   - Collections: ${stats?.collections}`);
    console.log(`   - Documents: ${stats?.objects}`);
    console.log(`   - Data size: ${(stats?.dataSize / 1024).toFixed(2)} KB`);
    console.log('\n🎉 Connection test completed successfully!');
  } catch (error) {
    console.log('\n❌ Connection test failed!');
    if (error instanceof Error) {
      console.log('Error message:', error.message);
      if (error.message.includes('ECONNREFUSED')) {
        console.log('\n💡 Troubleshooting:');
        console.log('   - Make sure MongoDB is running locally');
        console.log('   - For Windows: net start MongoDB');
        console.log('   - For macOS/Linux: sudo systemctl start mongod');
        console.log('   - Or use MongoDB Atlas (cloud) instead');
      } else if (error.message.includes('Authentication failed')) {
        console.log('\n💡 Troubleshooting:');
        console.log('   - Check your username and password in MONGODB_URI');
        console.log('   - Make sure the user has proper permissions');
      } else if (error.message.includes('getaddrinfo ENOTFOUND')) {
        console.log('\n💡 Troubleshooting:');
        console.log('   - Check your MongoDB Atlas cluster URL');
        console.log("   - Make sure you're connected to the internet");
      }
    }
    console.log('\nFull error:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the test
testConnection();
