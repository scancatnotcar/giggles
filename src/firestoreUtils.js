import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  increment,
  getDocs,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Create a new shareable message in Firestore
 * @param {Object} messageData - The message data to save
 * @returns {Promise<string>} - The document ID of the created message
 */
export const createShareableMessage = async (messageData) => {
  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      ...messageData,
      createdAt: new Date(),
      views: 0,
      isActive: true,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating shareable message:', error);
    throw new Error('Failed to create shareable message');
  }
};

/**
 * Get a shared message by ID
 * @param {string} messageId - The ID of the shared message
 * @returns {Promise<Object|null>} - The message data or null if not found
 */
export const getSharedMessage = async (messageId) => {
  try {
    const docRef = doc(db, 'messages', messageId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      // Increment view count
      await updateDoc(docRef, {
        views: increment(1),
        lastViewed: new Date(),
      });

      return {
        id: docSnap.id,
        ...data,
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting shared message:', error);
    throw new Error('Failed to load shared message');
  }
};

/**
 * Update a shared message (if you want to allow editing)
 * @param {string} messageId - The ID of the shared message
 * @param {Object} updateData - The data to update
 * @returns {Promise<void>}
 */
export const updateSharedMessage = async (messageId, updateData) => {
  try {
    const docRef = doc(db, 'messages', messageId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error updating shared message:', error);
    throw new Error('Failed to update shared message');
  }
};

/**
 * Generate a shareable URL for a message
 * @param {string} messageId - The ID of the shared message
 * @returns {string} - The complete shareable URL
 */
export const generateShareableUrl = (messageId) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/flower/share/${messageId}`;
};

/**
 * Validate message data before saving
 * @param {Object} messageData - The message data to validate
 * @returns {boolean} - True if valid, throws error if not
 */
export const validateMessageData = (messageData) => {
  if (!messageData.wishText || messageData.wishText.trim().length === 0) {
    throw new Error('Wish text is required');
  }

  if (!messageData.images || messageData.images.length === 0) {
    throw new Error('At least one image is required');
  }

  if (messageData.wishText.length > 1000) {
    throw new Error('Wish text is too long (max 1000 characters)');
  }

  return true;
};

/**
 * Clean up old shared messages (example: delete after 30 days)
 * Can be run periodically via CRON or Firebase Cloud Functions
 * @param {number} daysOld - Number of days after which to consider messages old
 */
export const cleanupOldMessages = async (daysOld = 30) => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const q = query(
      collection(db, 'messages'),
      where('createdAt', '<', cutoffDate),
      where('isActive', '==', true)
    );

    const querySnapshot = await getDocs(q);

    const batchDeletions = querySnapshot.docs.map(async (docSnap) => {
      const docRef = doc(db, 'messages', docSnap.id);
      await deleteDoc(docRef);
    });

    await Promise.all(batchDeletions);

    console.log(`Deleted ${batchDeletions.length} old messages.`);
  } catch (error) {
    console.error('Error cleaning up old messages:', error);
  }
};
