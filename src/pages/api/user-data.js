// pages/api/user-data.js
export default async function handler(req, res) {
  try {
    console.log('Fetching user data...'); // Add logging
    const userData = await fetchAllUserData();
    console.log('User data fetched successfully'); // Add logging
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error in API route:', error); // Detailed error logging
    res.status(500).json({ 
      error: 'Failed to fetch user data',
      details: error.message 
    });
  }
}