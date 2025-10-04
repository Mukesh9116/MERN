
const { z } = require("zod");

const contactSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(255, { message: "Name must be less than 255 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address (Email must be at least 7 characters)"}),
    
   message: z
   .string({required_error: "message is required"})
   .trim()
   .min(10, { message: "Name must be at least 3 characters" })
   .max(2550, { message: "Name must be less than 255 characters" }),
});

module.exports = contactSchema;
