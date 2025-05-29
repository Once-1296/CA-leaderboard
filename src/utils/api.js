export async function fetchCodeforcesRating(handle) {
  try {
    const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
    const data = await response.json();
    if (data.status === "OK" && data.result.length > 0) {
      return data.result[0].rating || 0;
    }
    return 0;
  } catch (error) {
    console.error(`Error fetching Codeforces rating for ${handle}:`, error);
    return 0;
  }
}

export async function fetchLeetCodeRating(username) {
  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              profile {
                ranking
              }
            }
          }
        `,
        variables: {
          username: username
        }
      })
    });
    const data = await response.json();
    return data.data?.matchedUser?.profile?.ranking || 0;
  } catch (error) {
    console.error(`Error fetching LeetCode ranking for ${username}:`, error);
    return 0;
  }
}

export async function fetchAllUserData() {
  const { users } = await import('../data/users');
  
  const userData = await Promise.all(users.map(async (user) => {
    const [codeforcesRating, leetcodeRating] = await Promise.all([
      fetchCodeforcesRating(user.codeforces),
      fetchLeetCodeRating(user.leetcode)
    ]);
    
    return {
      ...user,
      codeforcesRating,
      leetcodeRating
    };
  }));
  
  // Sort by Codeforces rating (descending), then LeetCode rating (descending)
  return userData.sort((a, b) => {
    if (b.codeforcesRating !== a.codeforcesRating) {
      return b.codeforcesRating - a.codeforcesRating;
    }
    return b.leetcodeRating - a.leetcodeRating;
  });
}