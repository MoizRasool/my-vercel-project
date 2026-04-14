const mongoose = require('mongoose');

// Vercel se automatic link uthayega
const MONGO_URI = process.env.MONGODB_URI;

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

// Model check
const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Sirf POST allowed hai" });
  }

  try {
    // Database connection
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGO_URI);
    }
    
    // Data save karna
    const newContact = new Contact(req.body);
    await newContact.save();
    
    return res.status(200).json({ success: true, message: "Data saved in MongoDB!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
// Triggering new build
