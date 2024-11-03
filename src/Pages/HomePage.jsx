import React, { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  // State to hold user data
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
      try {
        const friendRequestsResponse = await axios.get(
          "/https://dummyjson.com/users/friend-requests"
        );
        const friendsResponse = await axios.get("/api/friends");
        const blockedUsersResponse = await axios.get("/api/blocked-users");
        const groupsResponse = await axios.get("/api/groups");

        setFriendRequests(friendRequestsResponse.data);
        setFriends(friendsResponse.data);
        setBlockedUsers(blockedUsersResponse.data);
        setGroups(groupsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search friends or groups"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
        />
      </div>

      {/* Friend Requests Box */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-3">Friend Requests</h2>
        <div className="space-y-3">
          {friendRequests.map((request) => (
            <div
              key={request.id}
              className="flex justify-between items-center p-2 border border-gray-300 dark:border-gray-700 rounded-lg"
            >
              <p className="font-medium">{request.name}</p>
              <div>
                <button className="bg-green-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-green-600">
                  Accept
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Friends Box */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-3">Friends</h2>
        <div className="space-y-3">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="flex justify-between items-center p-2 border border-gray-300 dark:border-gray-700 rounded-lg"
            >
              <p className="font-medium">{friend.name}</p>
              <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                Block
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Blocking Box */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-3">Blocked Users</h2>
        <div className="space-y-3">
          {blockedUsers.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center p-2 border border-gray-300 dark:border-gray-700 rounded-lg"
            >
              <p className="font-medium">{user.name}</p>
              <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                Unblock
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Group Box */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-3">Groups</h2>
        <div className="space-y-3">
          {groups.map((group) => (
            <div
              key={group.id}
              className="flex justify-between items-center p-2 border border-gray-300 dark:border-gray-700 rounded-lg"
            >
              <p className="font-medium">{group.name}</p>
              <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                Enter
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
