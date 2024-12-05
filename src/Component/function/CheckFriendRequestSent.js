import { get, query, equalTo, orderByChild, ref } from "firebase/database";

/**
 * Checks if a friend request has already been sent.
 * @param {Object} db - Firebase database instance.
 * @param {string} senderId - ID of the user sending the request.
 * @param {string} receiverId - ID of the user receiving the request.
 * @returns {Promise<boolean>} - Resolves to `true` if the request is sent, `false` otherwise.
 */
export const checkFriendRequestSent = async (db, senderId, receiverId) => {
  try {
    const requestsRef = ref(db, "friendRequest/");
    const requestQuery = query(
      requestsRef,
      orderByChild("senderid"),
      equalTo(senderId)
    );
    const snapshot = await get(requestQuery);

    if (snapshot.exists()) {
      const requests = snapshot.val();
      const isAlreadySent = Object.values(requests).some(
        (req) => req.receiverid === receiverId
      );
      return isAlreadySent;
    }
    return false;
  } catch (error) {
    console.error("Error checking friend request:", error);
    return false; // Default to false on error
  }
};
