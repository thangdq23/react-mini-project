const STORAGE_PREFIX = "todo_app_v1";

export const storageAPI = {
  getCurrentUser: () => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (e) {
      return null;
    }
  },

  _keyFor: (user) => {
    if (!user) return `${STORAGE_PREFIX}_tasks_guest`;
    const id =
      (user.user && user.user.email) ||
      user.email ||
      user.id ||
      user.name ||
      "user";
    return `${STORAGE_PREFIX}_tasks_${id}`;
  },

  _loadLocal: () => {
    const user = storageAPI.getCurrentUser();
    const key = storageAPI._keyFor(user);
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  _saveLocal: (tasks) => {
    const user = storageAPI.getCurrentUser();
    const key = storageAPI._keyFor(user);
    localStorage.setItem(key, JSON.stringify(tasks));
  },

  _normalize: (doc) => {
    if (!doc) return doc;
    const t = { ...doc };
    if (t._id && !t.id) {
      t.id = t._id;
    }
    return t;
  },

  saveTasks: (tasks) => {
    storageAPI._saveLocal(tasks);
  },

  getTasks: () => {
    return storageAPI._loadLocal();
  },
};

export default storageAPI;
