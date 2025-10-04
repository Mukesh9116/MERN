const contactvalidate = (schema) => async (req, res, next) => {
// schema pass hua hai argument ki tarah ye zod vali schema hai.
  try {
     // parseAsync()-> method insure karega ki jo bhi data hamare user ne input kiya hai
     // vo hamare zod se match kar raha hai ki nahi . Agar kar rha hai to req.body = parsed;
    const parsed = await schema.parseAsync(req.body);
    req.body = parsed;
    next();
  } catch (err) {
    const status = 422;
    const message ="Fill the input properly";
    const extraDetails =  err.issues?.[0]?.message || "Validation failed";
    const error = {
      status,
      message,
      extraDetails
    };
    // return res.status(400).json({ msg: message });
    next(error);
  }
};

module.exports = contactvalidate;


