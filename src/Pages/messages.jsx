import React from "react";
import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { TbSend } from "react-icons/tb";
import { msgInfo } from "../features/msgSlice";
import EmojiPicker from "emoji-picker-react";

const Messages = () => {
  const [activeTab, setActiveTab] = useState("chats");
  const [activeFriend, setActiveFriend] = useState(null);
  const [lastMessages, setLastMessages] = useState({});
  const [Message, setMessage] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [isInputInvalid, setIsInputInvalid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const data = useSelector((state) => state.user.value);
  const msgData = useSelector((state) => state.msg?.value || null);
  const db = getDatabase();
  const [friendList, setFriendList] = useState([]);
  const msgListDispatch = useDispatch();

  // Fetch user list--------------
  useEffect(() => {
    const FriendListRef = ref(db, "friend");
    onValue(FriendListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (
          data.uid === item.val().receiverid ||
          data.uid === item.val().senderid
        ) {
          array.push({ ...item.val(), uid: item.key });
        }
      });
      setFriendList(array);
    });
  }, [data.uid, db]);

  // Fetch last messages for each friend
  useEffect(() => {
    const messagesRef = ref(db, "messages/");
    onValue(messagesRef, (snapshot) => {
      const messages = {};
      snapshot.forEach((item) => {
        const messageData = item.val();
        const friendKey =
          messageData.senderId === data.uid
            ? messageData.receiverId
            : messageData.senderId;
        if (
          !messages[friendKey] ||
          messages[friendKey].timestamp < messageData.timestamp
        ) {
          messages[friendKey] = messageData;
        }
      });
      setLastMessages(messages);
    });
  }, [db, data.uid]);

  // Fetch messages for each friend
  useEffect(() => {
    const messagesRef = ref(db, "messages/");
    onValue(messagesRef, (snapshot) => {
      const messages = [];
      snapshot.forEach((item) => {
        const messageData = item.val();
        if (
          messageData.senderId === data.uid ||
          messageData.receiverId === data.uid
        ) {
          messages.push(messageData);
        }
      });
      setMsgList(messages);
    });
  }, [db, data.uid]);
  // fetch my group
  let [groupData, setGroupData] = useState([]);

  useEffect(() => {
    {
      const groupsRef = ref(db, "groups/");
      onValue(groupsRef, (snapshot) => {
        const groupsArray = [];
        snapshot.forEach((item) => {
          if (data.uid == item.val().createdBy.id) {
            groupsArray.push({ id: item.key, ...item.val() });
          }
        });
        setGroupData(groupsArray);
      });
    }
  }, [db]);

  let handleMassage = () => {
    if (Message.trim() === "") {
      setIsInputInvalid(true);
    } else if (msgData?.Id) {
      push(ref(db, "messages/"), {
        senderId: data.uid,
        senderName: data.displayName,
        receiverId: msgData.Id,
        receiverName: msgData.Name,
        message: Message.trim(),
        timestamp: Date.now(),
      })
        .then(() => {
          setMessage("");
          setIsInputInvalid(false);
        })
        .catch((err) => {
          console.error("Error sending message:", err);
        });
    } else {
      alert("Select A User");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleMassage();
    }
  };
  let handleUserClick = (item) => {
    setActiveFriend({
      uid: item.senderid === data.uid ? item.receiverid : item.senderid,
      name: item.senderid === data.uid ? item.receivername : item.sendername,
    });

    msgListDispatch(
      msgInfo({
        Id: item.senderid === data.uid ? item.receiverid : item.senderid,
        Name: item.senderid === data.uid ? item.receivername : item.sendername,
        Message: item.message,
      })
    );
  };
  // emoji picker
  const toggleEmojiPicker = () => {
    setIsOpen(!isOpen);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
  };

  // search =======
  let handleSearch = (e) => {
    let searchResult = msgList.filter((item) =>
      item.Message.includes(e.target.value)
    );
    console.log(searchResult);
  };

  return (
    <div className="flex h-screen bg-gray-100 w-3/4 rounded-lg">
      {/* ------------------------------ Sidebar Container ------------------------------ */}
      <div className="w-80 bg-white shadow-md flex flex-col">
        {/* --------Tab Navigation----------- */}
        <div className="p-4 border-b flex justify-between">
          <button
            onClick={() => setActiveTab("chats")}
            className={`px-4 py-2 ${
              activeTab === "chats"
                ? "bg-[radial-gradient(circle_80px_at_80%_-10%,_#93A0F9,_#3F57F5)] text-white rounded-full"
                : "text-gray-600"
            }`}
          >
            Chats
          </button>
          <button
            onClick={() => setActiveTab("groups")}
            className={`px-4 py-2 ${
              activeTab === "groups"
                ? "bg-[radial-gradient(circle_80px_at_80%_-10%,_#93A0F9,_#3F57F5)] text-white rounded-full"
                : "text-gray-600"
            }`}
          >
            Groups
          </button>
        </div>

        {/* ---------------Search Bar------------------ */}
        <div className="p-4 border-b relative">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
          />
          <CiSearch className="absolute right-8 text-2xl top-1/2 transform -translate-y-1/2" />
        </div>

        {/* -----------Tab Content---------- */}
        <div className="flex-grow overflow-y-auto p-4">
          {activeTab === "chats" && (
            <ul className="space-y-4">
              {friendList.map((user) => (
                <li
                  key={user.uid}
                  onClick={() => handleUserClick(user)}
                  className={`flex items-center p-3 hover:bg-gray-200 cursor-pointer rounded-lg ${
                    activeFriend?.uid === user.uid ? "bg-blue-100" : ""
                  }`}
                >
                  <div className="bg-blue-500 rounded-full h-10 w-10 flex items-center justify-center">
                    {/* -------------------User.ProfilePicture--------------------- */}
                    <img src="default-profile.png" alt="" />
                  </div>
                  <div className="ml-3">
                    <h4 className=" font-semibold text-gray-900">
                      {/* ------------------User.name--------------------- */}
                      {data.uid === user.senderid
                        ? user.receivername
                        : user.sendername}
                    </h4>
                    <p className="text-gray-600 text-sm w-40">
                      {lastMessages[
                        user.senderid === data.uid
                          ? user.receiverid
                          : user.senderid
                      ]?.message || "No messages yet"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {activeTab === "groups" && (
            <ul className="space-y-4">
              {groupData.map((group) => (
                <li className="flex items-center p-3 hover:bg-gray-200 cursor-pointer rounded-lg">
                  <div className="bg-blue-500 rounded-full h-10 w-10 flex items-center justify-center ">
                    {/* -------------------Group.ProfilePicture--------------------- */}
                    G1
                  </div>
                  <div className="ml-3 text-gray-800">
                    <h3>{group.groupName}</h3>
                    <p className="text-gray-600 text-sm">
                      {/* ------------------Group.Description--------------------- */}
                      <p className="text-sm text-gray-500">
                        Admin:{" "}
                        {group.createdBy ? group.createdBy.name : "Unknown"}
                      </p>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* -------------------Chat Area----------------------- */}
      <div className="flex-grow flex flex-col max-w-[1180px]">
        <header className="p-[14px] bg-white shadow-md flex items-center">
          <div className="relative bg-blue-500 rounded-full h-10 w-10 flex items-center justify-center">
            {/* ------------------ Profile Picture ------------------ */}
            <img
              src="default-profile.png"
              alt=""
              className="h-full w-full rounded-full object-cover"
            />
            {/* ------------------ Green Dot ------------------ */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
          <div className="ml-3">
            <div>
              <h2 className="font-semibold text-gray-900">{msgData?.Name}</h2>
              <p className="text-gray-600 text-sm">Active now</p>
            </div>
          </div>
        </header>

        {/* ----------------Messages Area------------------------ */}

        {/* --------------- Friend message --------------- */}
        <div className="flex-grow p-4 overflow-y-auto h-full ">
          <div className="space-y-4">
            {msgList
              .filter(
                (message) =>
                  (message.senderId === data.uid &&
                    message.receiverId === activeFriend?.uid) ||
                  (message.receiverId === data.uid &&
                    message.senderId === activeFriend?.uid)
              )
              .map((message) => (
                <div
                  key={message.timestamp}
                  className={`flex ${
                    message.senderId === data.uid
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 max-w-[65%] ${
                      message.senderId === data.uid
                        ? "bg-blue-400 text-white"
                        : "bg-gray-300 text-black"
                    } rounded-lg break-words whitespace-pre-wrap`}
                  >
                    <p>{message.message}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* -------------------------Message Input--------------------- */}
        <footer className="p-4 bg-white border-t">
          <div className="flex items-center gap-3">
            <input
              value={Message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Type a message..."
              className={`w-full px-4 py-2 border ${
                isInputInvalid ? "border-red-500" : "border-gray-300"
              } rounded-full focus:outline-none focus:border-blue-500`}
            />
            <button
              type="submit"
              onClick={handleMassage}
              className="ml-2 p-2 bg-blue-500 text-white rounded-full"
            >
              <TbSend className="text-2xl" />
            </button>
            <div className="flex items-center">
              {/* Emoji Icon */}
              <button
                onClick={toggleEmojiPicker}
                className="p-2 bg-gray-200 rounded-full"
              >
                😀
              </button>
            </div>

            {/* Emoji Picker */}
            {isOpen && (
              <div className="absolute bottom-20 left-[69%] ">
                <EmojiPicker onEmojiClick={handleEmojiSelect} />
              </div>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Messages;
