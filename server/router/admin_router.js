const express = require('express');

const router = express.Router();

// const {getAllUsers,getAllContacts , deleteUserById}= require('../controllers/admin_controller');
const adminController = require('../controllers/admin_controller');
const authMiddleware = require("../middlewares/auth_middleware");
const adminMidddleware = require('../middlewares/admin_middleware');

// authMiddleware ->(jwt authentication) check the user is pass the token or not (means check the user is login or not)
// 

//*-------------------------------------->>>
//User Route-->>
//*-------------------------------------->>>

router.route('/users').get(authMiddleware ,adminMidddleware, adminController.getAllUsers);

router.route('/users/:id').get(authMiddleware ,adminMidddleware, adminController.getUserById);

router.route('/users/update/:id').patch(authMiddleware ,adminMidddleware, adminController.updateUserById);

router.route("/users/delete/:id").delete(authMiddleware,adminMidddleware,adminController.deleteUserById);

//*-------------------------------------->>>
//Contact Route-->>
//*-------------------------------------->>>

router.route('/contacts').get(authMiddleware ,adminMidddleware, adminController.getAllContacts);

router.route('/contacts/:id').get(authMiddleware ,adminMidddleware, adminController.getContactById);

router.route('/contacts/update/:id').patch(authMiddleware ,adminMidddleware, adminController.updateContactById);

router.route("/contacts/delete/:id").delete(authMiddleware,adminMidddleware,adminController.deleteContactById);


module.exports = router;