const express = require("express");
const router = express.Router();
const formSchema = require("../validation/validation.js");
const dbClient = require("../db/db.js");

// POST route for form submission with Joi validation
router.post("/submit", async (req, res) => {
  try {
    // Validate request body against the Joi schema
    const validatedData = await formSchema.validateAsync(req.body);

    // SQL query to insert data into the form_submissions table
    const insertQuery = `
            INSERT INTO form_submissions (
                aadhaar_number,
                name_of_entrepreneur,
                pan_number,
                pan_name,
                type_of_organization,
                pin_code,
                state,
                city
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;

    // Extract values from the validated data object
    const values = [
      validatedData.aadhaar_number,
      validatedData.name_of_entrepreneur,
      validatedData.pan_number,
      validatedData.pan_name,
      validatedData.type_of_organization,
      validatedData.pin_code,
      validatedData.state,
      validatedData.city,
    ];

    // Execute the query
    const result = await dbClient.query(insertQuery, values);

    console.log(
      "Form data successfully submitted to the database:",
      result.rows[0]
    );
    res
      .status(201)
      .json({ message: "Form submitted successfully!", data: result.rows[0] });
  } catch (error) {
    // Handle validation errors or database errors
    if (error.isJoi) {
      console.error("Validation Error:", error.details);
      return res
        .status(400)
        .json({ message: "Validation Error", details: error.details });
    }

    console.error("Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
