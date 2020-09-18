const { validateSignupData } = require("../util/validators");
const crypto = require("crypto");
const connection = require("../mongoDb/connection");
const jwtSign = require("../util/jwt/jwtSign");
exports.signup = (req, res) => {
  console.log("signUp");
  const newUserData = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    fullName: req.body.fullName,
    mobileNumber: req.body.mobileNumber,
    user_type:req.body.user_type
  };
  console.log({ datarecivedforsignup: newUserData });
  const { valid, errors } = validateSignupData(newUserData);
  console.log(valid, errors);
  if (!valid) {
    console.log("not valid");
    return res.status(200).json({ errors: errors });
  } else {
    console.log("valid inputs");
    const db = connection.getDb();
    db.collection("registration").findOne(
      {
        $or: [
          { email: newUserData.email },
          { phone: newUserData.mobileNumber },
        ],
      },
      (err, doc) => {
        if (err) throw err;
        else if (doc !== null) {
          errors.email = "Email or Mobile number already registered";
          errors.general = "Email or Mobile number already registered";
          console.log(errors);
          return res.status(200).json({ errors: errors });
        } else {
          var salt = crypto.randomBytes(16).toString("hex");
          var hash = crypto
            .pbkdf2Sync(newUserData.password, salt, 1000, 64, `sha512`)
            .toString(`hex`);
          db.collection("registration").insertOne(
            {
              email: newUserData.email,
              phone: newUserData.mobileNumber,
              password_salt: salt,
              password_hash: hash,
              name: newUserData.fullName,
              user_type: newUserData.user_type,
            },
            (err, result) => {
              if (err) throw err;
              else if (result.insertedId) {
                const reg_id = result.insertedId;
                jwtSign
                  .jwtSign({
                    reg_id: reg_id,
                      })
                  .then((token) => {
                    console.log(token);
                    return res.status(200).json({ token })});
              }
            }
          );
        }
      }
    );
  }
};
