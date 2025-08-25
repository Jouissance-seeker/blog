import { config } from 'dotenv';
import { getPosts } from '../services/get-posts.js';

// Load environment variables
config();

async function getAllPostsData() {
  try {
    console.log('🔍 Fetching posts from database...');

    const posts = await getPosts({
      title: '',
      authors: [],
      category: '',
      isAll: true,
    });

    console.log(`📊 Found ${posts.length} posts:`);
    console.log(
      JSON.stringify(
        posts.map((post) => ({
          title: post.title,
          authors: post.authors,
          category: post.category,
          status: true,
        })),
        null,
        2,
      ),
    );
  } catch (error) {
    console.error('❌ Error fetching posts:', error);
    console.log(
      '🔧 Make sure your .env file is properly configured with MONGODB_URI',
    );
  }
}

getAllPostsData();
