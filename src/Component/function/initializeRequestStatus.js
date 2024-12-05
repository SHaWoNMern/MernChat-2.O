import { ref, get } from "firebase/database";

/**
 * Checks which friend requests are already sent by the current user.
 *
 * @param {Object} db - Firebase database instance.
 * @param {Array} userList - List of users to check.
 * @param {string} currentUserId - ID of the currently logged-in user.
 * @returns {Promise<Object>} - A mapping of user IDs to their request statuses.
 */
export const initializeRequestStatus = async (db, userList, currentUserId) => {
  try {
    const requestsRef = ref(db, "friendRequest");
    const snapshot = await get(requestsRef);

    if (snapshot.exists()) {
      const requests = snapshot.val();
      const updatedSentRequests = {};

      userList.forEach((user) => {
        const isAlreadySent = Object.values(requests).some(
          (req) => req.senderid === currentUserId && req.receiverid === user.uid
        );
        updatedSentRequests[user.uid] = isAlreadySent;
      });

      return updatedSentRequests;
    } else {
      return {}; // No requests exist
    }
  } catch (error) {
    console.error("Error checking friend request status:", error);
    return {};
  }
};
