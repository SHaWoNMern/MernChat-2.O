import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getDatabase, ref, push, onValue } from "firebase/database";

const Group = () => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [userList, setUserList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

  const data = useSelector((state) => state.user.value);
  const db = getDatabase();

  // Fetch user list when the modal is open
  useEffect(() => {
    if (isGroupModalOpen) {
      const userListRef = ref(db, "users/");
      onValue(userListRef, (snapshot) => {
        const array = [];
        snapshot.forEach((item) => {
          if (item.key !== data?.uid) {
            array.push({ ...item.val(), uid: item.key });
          }
        });
        setUserList(array);
      });
    }
  }, [isGroupModalOpen, db, data?.uid]);

  // Handle group creation
  const handleCreateGroup = () => {
    if (!groupName.trim() || selectedUsers.length === 0) {
      alert("Group name and at least one member are required!");
      return;
    }

    push(ref(db, "groups/"), {
      groupName,
      groupDescription,
      createdBy: {
        id: data.uid,
        name: data.displayName,
      },
      members: selectedUsers,
      createdAt: Date.now(),
    }).then(() => {
      alert("Group created successfully!");
      setIsGroupModalOpen(false);
      setGroupName("");
      setGroupDescription("");
      setSelectedUsers([]);
    });
  };

  const toggleUserSelection = (uid) => {
    setSelectedUsers((prev) =>
      prev.includes(uid) ? prev.filter((id) => id !== uid) : [...prev, uid]
    );
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="flex justify-between w-1/2">
        <h1 className="text-2xl font-bold mb-4">Groups</h1>

        {/* Button to open the modal */}
        <button
          onClick={() => setIsGroupModalOpen(true)}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Create Group
        </button>
      </div>

      <div className="flex flex-wrap justify-center">
        {/* Display existing groups */}
        <div className="flex items-center justify-between p-3 gap-3 rounded-lg mb-2 bg-opacity-50 shadow-lg hover:bg-blue-gray-100 transform transition duration-300 ease-in-out">
          <div className="flex items-center">
            <img
              src="dummypp.png"
              alt="Profile"
              className="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <h2 className="text-lg font-semibold">Group Name</h2>
              <p className="text-sm text-gray-600">Group Description</p>
            </div>
          </div>
        </div>
      </div>

      {/* Group Modal */}
      {isGroupModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Create New Group</h2>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Group Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Group Description (Optional)
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                placeholder="Enter group description"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Add Members
              </label>
              <div className="max-h-40 overflow-y-auto border p-2 rounded-lg">
                {userList.map((user) => (
                  <div key={user.uid} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedUsers.includes(user.uid)}
                      onChange={() => toggleUserSelection(user.uid)}
                    />
                    <span>{user.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsGroupModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Group;
