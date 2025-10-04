
const User = require("../models/user_model");

const Contact = require("../models/contact_model");

//*--------------------------------------------------------
//How to fetch the all  users data from mongodb
//*-------------------------------------------------------

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0 }); // backend se data ko fetch kar rahe hai. using UserSchema ki help se
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No Users Found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

//*-------------------------------------------------------
//How to fetch the all  contacts data from mongodb
//*-------------------------------------------------------

const getAllContacts = async (req, res, next) => {
    try {
        const users = await Contact.find(); // backend se data ko fetch kar rahe hai. using UserSchema ki help se
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No Contacts Found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

//*-------------------------------------------------------
// user update logic
//*--------------------------------------

const updateUserById = async (req, res) => {

    try {
        const id = req.params.id;
        const updatedUserData = req.body;

        const updatedData = await User.updateOne({ _id: id }, {
            $set: updatedUserData,
        });

        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
}


//*--------------------------------------
// user delete logic
//*--------------------------------------
const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;

        // MongoDB delete result
        const result = await User.deleteOne({ _id: id });

        // Agar koi document delete hua hai
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



//*-------------------------------------->>>
// single user logic
//*-------------------------------------->>>
const getUserById = async (req, res) => {
    try {

        const id = req.params.id; // agr url pe koi data pas ho raha hai to usko yaise le sakte hai.

        const data = await Contact.findOne({ _id: id }, { password: 0 });

        return res.status(200).json(data);

    } catch (error) {
        next(error);
    }
}








//*-------------------------------------->>>
//Delete Contact logic--------------------->>>>
//*-------------------------------------->>>

const deleteContactById = async (req, res) => {
    try {
        const id = req.params.id;

        // MongoDB delete result
        const result = await Contact.deleteOne({ _id: id });

        // Agar koi document delete hua hai
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Contact not found" });
        }

        return res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


//*-------------------------------------------------------
// contact update logic
//*--------------------------------------

const updateContactById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;

        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            { $set: updatedUserData },
            { new: true } // return the updated document
        );

        if (!updatedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        return res.status(200).json(updatedContact);
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};




//*-------------------------------------->>>
// single Contact logic
//*-------------------------------------->>>
const getContactById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Contact.findById(id);

        if (!data) {
            return res.status(404).json({ message: "Contact not found" });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error("Fetch error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById , deleteContactById , getContactById , updateContactById};