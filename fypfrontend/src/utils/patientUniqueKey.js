import CryptoJS from "crypto-js";

export function generateUniqueIdentifier(name, fatherName, age) {
  name = name.toLowerCase().trim().replace(/\s/g, "");
  fatherName = fatherName.toLowerCase().trim().replace(/\s/g, "");
  // Concatenate the information
  const combinedInfo = `${name}${fatherName}${age}`;

  // Create a SHA-256 hash using crypto-js
  const hash = CryptoJS.SHA256(combinedInfo).toString(CryptoJS.enc.Hex);

  // Convert the first 4 characters of the hash to a numeric value
  const numericValue = parseInt(hash.substring(0, 4), 16);

  // Ensure it's a 4-digit number and prepend 'PTN'
  const fourDigitIdentifier = `PTN-${String(numericValue).padStart(4, "0")}`;

  return fourDigitIdentifier;
}
