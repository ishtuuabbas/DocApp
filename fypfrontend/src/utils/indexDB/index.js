// Function to open an IndexedDB database
export const openDatabase = (databaseName, version, tableName) => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(databaseName, version);

    request.onerror = (event) => {
      reject(`Failed to open database: ${event.target.error}`);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Check if the object store already exists, create it if it doesn't
      if (!db.objectStoreNames.contains(tableName)) {
        const store = db.createObjectStore(tableName, { keyPath: "id" });
        store.createIndex("id", "id", { unique: true });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };
  });
};

// Function to create a table in IndexedDB
// Function to create a table in IndexedDB
export const createTable = (db, tableName) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([tableName], "readwrite");

    transaction.onerror = (event) => {
      reject(`Error creating table ${tableName}: ${event.target.error}`);
    };

    // Check if the object store already exists, create it if it doesn't
    if (!db.objectStoreNames.contains(tableName)) {
      const store = db.createObjectStore(tableName, { keyPath: "id" });
      store.createIndex("id", "id", { unique: true });
    }

    transaction.oncomplete = () => {
      resolve(`Table ${tableName} created successfully.`);
    };
  });
};

// Function to insert data into a table
export const insertData = (db, tableName, data) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([tableName], "readwrite");
    transaction.oncomplete = () => {
      resolve("Data inserted successfully.");
    };
    transaction.onerror = (event) => {
      reject(`Error inserting data: ${event.target.error}`);
    };

    const store = transaction.objectStore(tableName);
    store.add(data);
  });
};

// Function to get data by ID from a table
export const getDataById = (db, tableName, id) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([tableName], "readonly");
    const store = transaction.objectStore(tableName);
    const request = store.get(id);

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(`Error getting data: ${event.target.error}`);
    };
  });
};

// Function to update data in a table
export const updateData = (db, tableName, id, newData) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([tableName], "readwrite");
    const store = transaction.objectStore(tableName);
    const request = store.get(id);

    request.onsuccess = (event) => {
      const existingData = event.target.result;

      if (existingData) {
        for (const key in newData) {
          existingData[key] = newData[key];
        }

        const updateRequest = store.put(existingData);

        updateRequest.onsuccess = () => {
          resolve(`Data with ID ${id} updated successfully.`);
        };

        updateRequest.onerror = (event) => {
          reject(`Error updating data: ${event.target.error}`);
        };
      } else {
        reject(`Data with ID ${id} not found.`);
      }
    };

    request.onerror = (event) => {
      reject(`Error getting data: ${event.target.error}`);
    };
  });
};

// Function to delete data from a table
export const deleteData = (db, tableName, id) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([tableName], "readwrite");
    const store = transaction.objectStore(tableName);
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve(`Data with ID ${id} deleted successfully.`);
    };

    request.onerror = (event) => {
      reject(`Error deleting data: ${event.target.error}`);
    };
  });
};

async function runExample() {
  const databaseName = "MyDatabase";
  const version = 1;
  const tableName = "MyTable";

  const db = await openDatabase(databaseName, version);

  console.log(await createTable(db, tableName));

  const data = { id: 1, name: "John" };
  console.log(await insertData(db, tableName, data));

  const retrievedData = await getDataById(db, tableName, 1);
  console.log("Retrieved Data:", retrievedData);

  const newData = { name: "Jane" };
  console.log(await updateData(db, tableName, 1, newData));

  console.log(await deleteData(db, tableName, 1));
}
