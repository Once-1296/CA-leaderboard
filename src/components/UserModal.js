import { useState, useEffect } from 'react';

export default function UserModal({ user, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">User Profiles</h2>
        <div className="space-y-3">
          <a 
            href={`https://codeforces.com/profile/${user.codeforces}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded transition"
          >
            Codeforces: {user.codeforces}
          </a>
          <a 
            href={`https://www.codechef.com/users/${user.codechef}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-orange-100 hover:bg-orange-200 text-orange-800 px-4 py-2 rounded transition"
          >
            CodeChef: {user.codechef}
          </a>
          <a 
            href={`https://leetcode.com/${user.leetcode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded transition"
          >
            LeetCode: {user.leetcode}
          </a>
        </div>
      </div>
    </div>
  );
}