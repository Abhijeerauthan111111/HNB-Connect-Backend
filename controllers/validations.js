const {check} = require ('express-validator')

const fullNameValidator = check('fullName')
  .notEmpty()
  .withMessage("Full Name is mandatory")
  .trim()
  .isLength({ min: 3 })
  .withMessage("Full Name should be at least 3 characters long")
  .matches(/^[a-zA-Z]+(?: [a-zA-Z]+)+$/)
  .withMessage("Full Name must contain at least two words and only alphabets");


// Email Validator
const emailValidator = check('email')
  .isEmail()
  .withMessage('Please enter a valid email')
  .normalizeEmail()
  .custom((value) => {
    // Convert email to lowercase for comparison
    const emailLower = value.toLowerCase();

    // regex pattern 
    const emailPattern = /^[a-zA-Z]+_\d+@hnbgu\.edu\.in$/i;

    // Checking if the email follows the required pattern
    if (!emailPattern.test(emailLower)) {
      throw new Error('Email must be in the format name_enrollmentNumber@hnbgu.edu.in');
    }

    return true;
  });


// Password Validator
const passwordValidator = check('password')
  .trim()
  .isLength({min: 8})
  .withMessage('Password should be minium 8 chars')
  .matches(/[a-z]/)
  .withMessage('Password should have atleast one small alphabet')
  .matches(/[A-Z]/)
  .withMessage('Password should have atleast one capital alphabet')
  .matches(/[!@#$%^&*_":?]/)
  .withMessage('Password should have atleast one Special Character');



//graduation year validation 

const graduationYearValidator = check('graduationYear')
  .notEmpty().withMessage('Graduation Year is required')
  .isInt({ min: 2000, max: 2100 }).withMessage('Graduation Year should be between 2000 and 2100');



//department validator

const departmentValidator = check('department')
  .notEmpty()
  .withMessage('Department is required')
  

module.exports = {
  fullNameValidator,
  emailValidator,
  passwordValidator,
  graduationYearValidator,
  departmentValidator
  
};