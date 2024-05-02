// doctorsDB.js

// Open or create a database
const dbName = "DoctorsDatabase";
const dbVersion = 1;

// Function to open the database
export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = (event) => {
      reject(`Failed to open database: ${event.target.error}`);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create an object store (table) if it doesn't exist
      if (!db.objectStoreNames.contains("Doctors")) {
        const store = db.createObjectStore("Doctors", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };
  });
};

// Function to add a doctor to the database
export const addDoctor = async (doctorData) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction("Doctors", "readwrite");
    const store = transaction.objectStore("Doctors");

    const addRequest = store.add(doctorData);

    addRequest.onsuccess = () => {
      console.log("Doctor added successfully:", doctorData);
    };

    addRequest.onerror = (event) => {
      console.error("Error adding doctor:", event.target.error);
    };
  } catch (error) {
    console.error("Error opening database:", error);
  }
};

export const addArrayOfDoctors = async (doctorsArray) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction("Doctors", "readwrite");
    const store = transaction.objectStore("Doctors");

    doctorsArray.forEach(async (doctorData) => {
      const putRequest = store.put(doctorData);

      putRequest.onsuccess = () => {
        console.log("Doctor added successfully:", doctorData);
      };

      putRequest.onerror = (event) => {
        console.error("Error adding/updating doctor:", event.target.error);
      };
    });
  } catch (error) {
    console.error("Error opening database:", error);
  }
};

// Function to get all doctors from the database
// export const getAllDoctors = async () => {
//   try {
//     const db = await openDatabase();
//     const transaction = db.transaction("Doctors", "readonly");
//     const store = transaction.objectStore("Doctors");
//     const getAllRequest = store.getAll();

//     getAllRequest.onsuccess = () => {
//       const doctors = getAllRequest.result;
//       return doctors;
//     };

//     getAllRequest.onerror = (event) => {
//       console.error("Error getting doctors:", event.target.error);
//     };
//   } catch (error) {
//     console.error("Error opening database:", error);
//   }
// };

// Function to get all doctors from the database
export const getAllDoctors = () => {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then((db) => {
        const transaction = db.transaction("Doctors", "readonly");
        const store = transaction.objectStore("Doctors");
        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = () => {
          const doctors = getAllRequest.result;
          resolve(doctors);
        };

        getAllRequest.onerror = (event) => {
          console.error("Error getting doctors:", event.target.error);
          reject(event.target.error);
        };
      })
      .catch((error) => {
        console.error("Error opening database:", error);
        reject(error);
      });
  });
};

// Function to delete a doctor by ID from the database
export const deleteDoctorById = (id) => {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then((db) => {
        const transaction = db.transaction("Doctors", "readwrite");
        const store = transaction.objectStore("Doctors");
        const request = store.delete(id);

        request.onsuccess = () => {
          resolve(`Doctor with ID ${id} deleted successfully.`);
        };

        request.onerror = (event) => {
          console.error("Error deleting doctor:", event.target.error);
          reject(event.target.error);
        };
      })
      .catch((error) => {
        console.error("Error opening database:", error);
        reject(error);
      });
  });
};

// Function to clear all doctors from the database
export const clearAllDoctors = () => {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then((db) => {
        const transaction = db.transaction("Doctors", "readwrite");
        const store = transaction.objectStore("Doctors");
        const request = store.clear();

        request.onsuccess = () => {
          resolve("All doctors cleared successfully.");
        };

        request.onerror = (event) => {
          console.error("Error clearing doctors:", event.target.error);
          reject(event.target.error);
        };
      })
      .catch((error) => {
        console.error("Error opening database:", error);
        reject(error);
      });
  });
};

// Function to delete a doctor by _id from the database
export const deleteDoctorByUniqueId = (_id) => {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then((db) => {
        const transaction = db.transaction("Doctors", "readwrite");
        const store = transaction.objectStore("Doctors");
        const index = store.index("_id");
        const request = index.getKey(_id);

        request.onsuccess = (event) => {
          const key = event.target.result;

          if (key !== undefined) {
            // Key found, delete the doctor
            const deleteRequest = store.delete(key);

            deleteRequest.onsuccess = () => {
              resolve(`Doctor with _id ${_id} deleted successfully.`);
            };

            deleteRequest.onerror = (deleteEvent) => {
              console.error("Error deleting doctor:", deleteEvent.target.error);
              reject(deleteEvent.target.error);
            };
          } else {
            // Key not found
            resolve(`Doctor with _id ${_id} not found.`);
          }
        };

        request.onerror = (event) => {
          console.error("Error getting key:", event.target.error);
          reject(event.target.error);
        };
      })
      .catch((error) => {
        console.error("Error opening database:", error);
        reject(error);
      });
  });
};
