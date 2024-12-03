const admin = require('../config/firebase');
const db = admin.firestore();

// Register User
const registerUser = async (req, res) => {
    const { name, phone, email, password } = req.body;

    if (!name || !phone || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: name,
            phoneNumber: phone.startsWith("+") ? phone : `+${phone}`,
        });

        await db.collection('users').doc(userRecord.uid).set({
            name,
            phone,
            email,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: error.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    try {
        const user = await admin.auth().getUserByEmail(email);
        const snapshot = await db.collection('users').doc(user.uid).get();

        if (!snapshot.exists) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json({ message: "Login successful!", user: snapshot.data() });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser, loginUser };
