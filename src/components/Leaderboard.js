import { useState } from 'react';
import useSWR from 'swr';
import UserModal from './UserModal';

const fetcher = () => fetch('/api/user-data').then(res => res.json());

export default function Leaderboard() {
  const { data: users, error } = useSWR('user-data', fetcher, {
    refreshInterval: 3600000, // Refresh every hour
    revalidateOnFocus: true
  });
  
  const [selectedUser, setSelectedUser] = useState(null);

  if (error) return <div className="text-red-500">Failed to load data</div>;
  if (!users) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">Coding Leaderboard</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Codeforces Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">LeetCode Rating</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={user.codeforces} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                <td 
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 cursor-pointer hover:underline"
                  onClick={() => setSelectedUser(user)}
                >
                  {user.codeforces}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.codeforcesRating >= 2400 ? 'bg-red-100 text-red-800' :
                    user.codeforcesRating >= 2100 ? 'bg-orange-100 text-orange-800' :
                    user.codeforcesRating >= 1900 ? 'bg-yellow-100 text-yellow-800' :
                    user.codeforcesRating >= 1600 ? 'bg-purple-100 text-purple-800' :
                    user.codeforcesRating >= 1400 ? 'bg-blue-100 text-blue-800' :
                    user.codeforcesRating >= 1200 ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.codeforcesRating}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.leetcodeRating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
      
      <div className="mt-4 text-sm text-gray-500 text-center">
        Data refreshes automatically every hour. Last updated: {new Date().toLocaleString()}
      </div>
    </div>
  );
}