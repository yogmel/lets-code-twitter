let db;
const dbName = 'twitterDB';
const dbVersion = 1;
const dbTweetStore = 'tweets';
const dbUserStore = 'users';
const dbCommentStore = 'comments';

const openDb = () => {
  const req = indexedDB.open(dbName, dbVersion);
  db = req.result;

  req.onsuccess = function () {
    console.log("openDb DONE");
  };

  req.onerror = (evt) => {
    console.error("openDb:", evt.target.errorCode);
  };

  req.onupgradeneeded = (evt) => {
    console.log("openDb.onupgradeneeded");
    evt.currentTarget.result.createObjectStore(
      dbCommentStore, { keyPath: 'id', autoIncrement: true }
    );
    evt.currentTarget.result.createObjectStore(
      dbTweetStore, { keyPath: 'id', autoIncrement: true }
    );
    evt.currentTarget.result.createObjectStore(
      dbUserStore, { keyPath: 'id', autoIncrement: true }
    );
  };
}

/**
 * @param {string} storeName
 * @param {string} mode either "readonly" or "readwrite"
 */
const getObjectStore = (db, storeName, mode) => {
  const tx = db.transaction(storeName, mode);
  return tx.objectStore(storeName);
}

const clearObjectStore = (storeName) => {
  const store = getObjectStore(storeName, 'readwrite');
  const req = store.clear();

  req.onsuccess = () => {
    console.log(storeName, ' cleared');
  };

  req.onerror = (evt) => {
    console.error("clearObjectStore:", evt.target.errorCode);
  };
}

/* ADD */

const addObjInStore = (obj, storeName) => {
  const store = getObjectStore(db, storeName, 'readwrite');
  let req;
  try {
    req = store.add(obj);
  } catch (e) {
    throw e;
  }
  req.onsuccess = () => {
    console.log(`Object ${obj} in ${storeName}`);
  };
  req.onerror = () => {
    console.error(`Object ${obj} in ${storeName} error: ${req.error}`);
  };
}

/**
 * @param {object} tweet:
 *  {
 *    message: string;
 *    date: string;
 *    author: string;
 *    usersFavorited: number[];
 *    comments: number[];
 *  }
 */
const addTweet = (tweet) => {
  addObjInStore(tweet, dbTweetStore);
}

/**
 * @param {object} user:
 *  {
 *   id: number;
 *   username: string;
 *   name: string;
 *   myTweets: number[];
 *   favoriteTweets: number[];
 *  }
 */
const addUser = (user) => {
  addObjInStore(user, dbUserStore);
}

/**
* @param {object} comment:
*  {
*   tweet: number;
*   message: string;
*   author: User;
*  }
*/
const addComment = (comment) => {
  addObjInStore(comment, dbCommentStore);
}

/* DELETE */
const deleteObjInStore = (key, storeName) => {
  const userStore = getObjectStore(storeName, 'readwrite');

  const req = userStore.get(key);
  req.onsuccess = (evt) => {
    const record = evt.target.result;
    if (typeof record == 'undefined')
      return;

    const deleteReq = userStore.delete(key);
    deleteReq.onsuccess = () => {
      console.log(`Deleted ${record} in ${storeName}`);
    };
    deleteReq.onerror = (evt) => {
      console.error(`Failed to delete ${record} in ${storeName}. Message: `, evt.target.errorCode);
    };
  };

  req.onerror = (evt) => {
    console.error(`Failed to delete in ${storeName}. Message: `, evt.target.errorCode);
  };
}

const deleteTweet = (key) => {
  deleteObjInStore(key, dbTweetStore);
}

const deleteUser = (key) => {
  deleteObjInStore(key, dbUserStore);
}

const deleteComment = (key) => {
  deleteObjInStore(key, dbCommentStore);
}

/* GET */

const getAllInStore = (storeName) => {
  const store = getObjectStore(db, storeName, 'readwrite');

  const req = store.getAll();

  req.onsuccess = (evt) => {
    const record = evt.target.result;
    if (typeof record == 'undefined')
      return;

    console.log(`get all from ${storeName}: `, record);
  };

  req.onerror = (evt) => {
    console.log(`failed to get all from ${storeName}. Error: `, evt.target.errorCode);
  };
}

const getByIdInStore = (id, storeName) => {
  const store = getObjectStore(storeName, 'readwrite');

  const req = store.get(id);

  req.onsuccess = (evt) => {
    const record = evt.target.result;
    if (typeof record == 'undefined')
      return;

    console.log(`get all from ${storeName}: `, record);
  };

  req.onerror = (evt) => {
    console.log(`failed to get ${id} from ${storeName}. Error: `, evt.target.errorCode);
  };
}


const getAllTweets = () => {
  getAllInStore(dbTweetStore);
}

const getAllUsers = () => {
  getAllInStore(dbUserStore);
}

const getAllComments = () => {
  getAllInStore(dbCommentStore);
}

const getTweetById = (id) => {
  getByIdInStore(id, dbTweetStore);
}

const getUserById = (id) => {
  getByIdInStore(id, dbUserStore);
}

const getCommentById = (id) => {
  getByIdInStore(id, dbCommentStore);
}

/* PUT / EDIT */

const updateByIdInStore = (id, updatedData, storeName) => {
  const store = getObjectStore(storeName, 'readwrite');
  const objRequest = store.get(id);

  objRequest.onsuccess = () => {
    let data = objRequest.result;
    data = { ...data, ...updatedData };

    const updateObjRequest = store.put(data);

    console.log("The transaction that originated request is " + updateObjRequest.transaction);

    updateObjRequest.onsuccess = () => {
      console.log("The transaction that originated request is " + updateObjRequest.transaction);
    };
  };

  objRequest.onerror = (evt) => {
    console.log(`failed to update ${id} from ${storeName}. Error: `, evt.target.errorCode);
  };
}

const updateTweetById = (id, tweet) => {
  updateByIdInStore(id, tweet, dbTweetStore);
}

const updateUserById = (id, user) => {
  updateByIdInStore(id, user, dbUserStore);
}

const updateCommentById = (id, comment) => {
  updateByIdInStore(id, comment, dbCommentStore);
}

openDb();

export {
  addTweet,
  addUser,
  addComment,
  deleteTweet,
  deleteUser,
  deleteComment,
  getAllTweets,
  getAllUsers,
  getAllComments,
  getTweetById,
  getUserById,
  getCommentById,
  updateTweetById,
  updateUserById,
  updateCommentById
};
