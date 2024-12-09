import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getDatabase, ref, push, onValue } from "firebase/database";

const Group = () => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);

  const data = useSelector((state) => state.user.value);
  const db = getDatabase();

  // fetch friend list =-------------
  useEffect(() => {
    if (isGroupModalOpen) {
      const friendListRef = ref(db, "friend/");
      onValue(friendListRef, (snapshot) => {
        const array = [];
        snapshot.forEach((item) => {
          if (item.key !== data?.uid) {
            array.push({ ...item.val(), uid: item.key });
          }
        });
        setFriendList(array);
      });
    }
  }, [isGroupModalOpen, db, data?.uid]);

  // Fetch all groups
  useEffect(() => {
    const groupsRef = ref(db, "groups/");
    onValue(groupsRef, (snapshot) => {
      const Array = [];
      snapshot.forEach((item) => {
        Array.push({ id: item.key, ...item.val() });
      });
      setGroups(Array);
    });
  }, [db]);

  // Handle group creation
  const handleCreateGroup = () => {
    if (!groupName.trim() || selectedUsers.length === 0) {
      alert("Group name and at least one member are required!");
      return;
    }

    const newGroupData = {
      groupName,
      groupDescription,
      createdBy: {
        id: data.uid,
        name: data.displayName,
      },
      members: selectedUsers,
      createdAt: Date.now(),
    };

    push(ref(db, "groups/"), newGroupData).then((snapshot) => {
      alert("Group created successfully!");
      setIsGroupModalOpen(false);
      setGroupName("");
      setGroupDescription("");
      setSelectedUsers([]);
    });
  };
  const toggleUserSelection = (uid) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(uid)) {
        return prevSelectedUsers.filter((id) => id !== uid);
      } else {
        return [...prevSelectedUsers, uid];
      }
    });
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      <button
        onClick={() => setIsGroupModalOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mb-4"
      >
        Create Group
      </button>
      <h2 className="text-2xl font-semibold">Existing Groups</h2>
      <div className="flex flex-row flex-wrap w-2/3 gap-4 rounded-lg shadow-md p-4 justify-between">
        {groups.map((group) => (
          <div
            key={group.id}
            className="flex w-96 items-center justify-between p-3 gap-3 rounded-lg mb-2 bg-opacity-50 shadow-lg hover:bg-blue-gray-100 transform transition duration-300 ease-in-out"
          >
            <div className="flex items-center">
              <img
                src="dummypp.png"
                alt="Profile"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <h2 className="text-lg font-semibold">{group.groupName}</h2>
                <p className="text-sm text-gray-500">
                  Admin: {group.createdBy ? group.createdBy.name : "Unknown"}
                </p>
              </div>
            </div>
            <div className="ml-8">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
      {isGroupModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
            {/* Modal Header */}
            <h2 className="text-xl font-bold mb-4">Create New Group</h2>

            {/* Group Name Input */}
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

            {/* Group Description Input */}
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

            {/* Add Members */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Add Members
              </label>
              <div className="max-h-40 overflow-y-auto border p-2 rounded-lg">
                {friendList.map((user) => (
                  <div key={user.uid} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedUsers.includes(user.uid)}
                      onChange={() => toggleUserSelection(user.uid)}
                    />
                    <span>
                      {data.uid === user.senderid
                        ? user.receivername
                        : user.sendername}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Action Buttons */}
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
