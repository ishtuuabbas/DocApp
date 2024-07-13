// patientsDB.js
import { BASE_URL } from "../../constant/url";
// Open or create a database
const dbName = "PatientsDatabase";
const dbVersion = 1;

// Function to open the database
export const openPatientDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = (event) => {
      reject(`Failed to open database: ${event.target.error}`);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create an object store (table) if it doesn't exist
      if (!db.objectStoreNames.contains("Patients")) {
        const store = db.createObjectStore("Patients", {
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

// Function to add a patient to the database
export const addPatient = async (patientData) => {
  try {
    const db = await openPatientDatabase();
    const transaction = db.transaction("Patients", "readwrite");
    const store = transaction.objectStore("Patients");

    const addRequest = store.add(patientData);

    addRequest.onsuccess = () => {
      console.log("Patient added successfully:", patientData);
    };

    addRequest.onerror = (event) => {
      console.error("Error adding patient:", event.target.error);
    };
  } catch (error) {
    console.error("Error opening database:", error);
  }
};


export const getAllPatients = () => {
  return new Promise((resolve, reject) => {
    openPatientDatabase()
      .then((db) => {
        const transaction = db.transaction("Patients", "readonly");
        const store = transaction.objectStore("Patients");
        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = () => {
          const patients = getAllRequest.result;
          resolve(patients);
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

// Function to transfer all patient data to the backend
export const transferPatientsToBackend = async (authCtx) => {
  try {
    const db = await openPatientDatabase();
    const transaction = db.transaction("Patients", "readonly");
    const store = transaction.objectStore("Patients");
    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = () => {
      const patients = getAllRequest.result;

      // Assuming you have a backend API endpoint to receive the data
      const apiUrl =
        BASE_URL+"/api/patient/create/many";

      // Make an HTTP POST request to send the data to the backend
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.token,
        },

        body: JSON.stringify(patients),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data transferred to backend:", data);
          // After successful transfer, delete the patients from IndexedDB
          const deleteTransaction = db.transaction("Patients", "readwrite");
          const deleteStore = deleteTransaction.objectStore("Patients");
          const deleteRequest = deleteStore.clear();

          deleteRequest.onsuccess = () => {
            console.log("Patients deleted from IndexedDB");
          };

          deleteRequest.onerror = (event) => {
            console.error(
              "Error deleting patients from IndexedDB:",
              event.target.error
            );
          };
        })
        .catch((error) => {
          console.error("Error transferring data to backend:", error);
        });
    };

    getAllRequest.onerror = (event) => {
      console.error("Error getting patients:", event.target.error);
    };
  } catch (error) {
    console.error("Error opening database:", error);
  }
};
