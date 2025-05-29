import { fetchAllUserData } from '../../utils/api';

export default async function handler(req, res) {
  try {
    const userData = await fetchAllUserData();
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
}