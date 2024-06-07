// contactController.js

const Contact = require('../model/contact');

// Controller function to handle POST request for saving contact form data
exports.saveContact = async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;
console.log("contact", req)
console.log("contact", req.body)

    // Create a new Contact instance
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      subject,
      message
    });
    // Save the contact data to the database
    await newContact.save();

    res.status(201).json({ message: 'Contact form submitted successfully', contact: newContact });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'An error occurred while processing your request' });
  }
};

// Controller function to handle GET request to fetch all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'An error occurred while processing your request' });
  }
};

// Controller function to handle GET request to fetch a contact by its ID
exports.getContactById = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error('Error fetching contact by ID:', error);
    res.status(500).json({ message: 'An error occurred while processing your request' });
  }
};
///onContactDelete
exports.deleteContact = async (req, res, next) => {
  const id = req.params.id;


  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      const error = new Error("Contact not found.");
      error.statusCode = 404;
      throw error;
    }

    await Contact.findByIdAndRemove(id);

    res.status(200).json({ message: "Contact removed successfully!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
