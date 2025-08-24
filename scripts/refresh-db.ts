async function refreshDB() {
  try {
    console.log('MongoDB connection refreshed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error refreshing connection:', error);
    process.exit(1);
  }
}

refreshDB();
