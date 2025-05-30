// pages/api/user-data.js
export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  try {
    const userData = await fetchAllUserData();
    res.status(200).json(userData);
  } catch (error) {
    // ... error handling
  }
}