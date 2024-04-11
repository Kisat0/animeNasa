const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const path = require("path");

// import Model
const User = require("../models/User");

const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

const generatePasswordResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const signup = async (req, res) => {
  const {
    userMail,
    userPassword,
    userName
  } = req.body;

  try {
    const existingUser = await User.findOne({ email: userMail });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "L'adresse e-mail est déjà utilisée." });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const newUser = new User({
      username: userName,
      email: userMail,
      password: hashedPassword,
      create_at: new Date(),
      refreshToken: generateRefreshToken(),
    });

    await newUser.save();
    return res
      .status(200)
      .send({ message: "Utilisateur créé avec succès.", userData: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        "Une erreur s'est produite lors de la création de l'utilisateur.",
    });
  }
};

/**
 * The login function is responsible for authenticating a user by checking their email and password,
 * generating access and refresh tokens, and returning them in the response.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request body, and request parameters. In this code
 * snippet, `req.body` is used to access the request body, which is expected to contain the `userEmail`
 * and `
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending data, and setting headers. In this code snippet, the `res` object
 * is used
 * @returns The login function returns a response with the status code and message indicating the
 * result of the login attempt. If the login is successful, it returns a status code of 200 along with
 * the access token and refresh token. If the user does not exist, it returns a status code of 404 with
 * a message indicating that the user does not exist. If the user's account is not verified, it returns
 */
const login = async (req, res) => {
  const { userMail, userPassword } = req.body;

  try {
    const user = await User.findOne({ email: userMail });

    if (!user) {
      return res.status(404).send({ message: "L'utilisateur n'existe pas" });
    }

    const passwordMatch = await bcrypt.compare(userPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).send({ message: "Mot de passe incorrect" });
    }

    const options = { expiresIn: "3h" };
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.SECRET_JWT_KEY,
      options
    );
    const refreshToken = generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).send({
      message: "Connexion réussie.",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Une erreur s'est produite lors de la connexion." });
  }
};

/**
 * The function `getUserLoggedData` is an asynchronous function that retrieves user data based on an
 * access token, verifies the token, and returns the user data if the token is valid.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as headers, body, and query parameters. It is used to access the `accessToken`
 * from the request body.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to set the status code, headers, and
 * send the response body. In this code snippet, the `res` object is used to send JSON responses with
 * @returns a response object with the appropriate status code and message in case of errors, and the
 * user object if the user is found and the token is valid.
 */
const getUserLoggedData = async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(accessToken, process.env.SECRET_JWT_KEY);

    const userId = decodedToken.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

/**
 * The above function is a JavaScript code that handles the refreshing of an access token using a
 * refresh token.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as headers, body, and query parameters. It is typically provided by the web
 * framework or server handling the request.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to set the status code, headers, and
 * send the response body. In this code snippet, it is used to send the response with the new access
 * token
 * @returns a response with a status code and a JSON object containing the new access token.
 */
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const user = await User.findOne({ refreshToken: refreshToken });

    if (!user) {
      return res.status(401).send({ message: "Refresh token invalide" });
    }

    const options = { expiresIn: "3h" };
    const newAccessToken = jwt.sign(
      { userId: user._id },
      process.env.SECRET_JWT_KEY,
      options
    );

    return res.status(200).send({ accessToken: newAccessToken });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Erreur lors du rafraîchissement du token" });
  }
};

/**
 * The above function is an asynchronous function that handles the logic for sending a reset password
 * email to a user.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made to the server. It includes properties such as `body`, `params`, `query`, `headers`,
 * etc. In this code snippet, `req.body` is used to access the request body, which is expected
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending data, and setting headers. In this code, it is used to send the
 * response back
 * @returns a response with a status code and a message. If the user is not found, it returns a 404
 * status code with a message "Utilisateur non trouvé." If the email is successfully sent, it returns a
 * 200 status code with a message "Email de réinitialisation envoyé." If there is an error, it returns
 * a 500 status code with a message "
 */
const resetPasswordEmail = async (req, res) => {
  const { userEmail } = req.body;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send({ message: "Utilisateur non trouvé." });
    }

    // Generate reset token and expiration date
    const resetToken = generatePasswordResetToken();
    const resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour

    (user.resetPasswordTokens = {
      token: resetToken,
      expires: resetTokenExpiration,
    }),
      await user.save();

    const resetPasswordLink = `${process.env.DEV_URL}/resetpassword/${resetToken}`;

    const context = {
      userFirstName: user.firstname,
      resetPasswordLink: resetPasswordLink,
    };

    const logoFilePath = path.resolve(__dirname, "../mail/assets/logo.png");
    const resetPasswordEmailFilePath = path.resolve(
      __dirname,
      "../mail/assets/reset_password.png"
    );

    const attachments = [
      {
        filename: "logo.png",
        path: logoFilePath,
        cid: "logo",
      },
      {
        filename: "reset_password.png",
        path: resetPasswordEmailFilePath,
        cid: "resetPasswordArt",
      },
    ];

    sendEmail(
      userEmail,
      "Réinitialiser le mot de passe",
      "reset_password",
      context,
      attachments
    );

    return res
      .status(200)
      .send({ message: "Email de réinitialisation envoyé." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        "Une erreur s'est produite lors de la réinitialisation du mot de passe.",
    });
  }
};

/**
 * The function `resetPasswordUser` is an asynchronous function that resets the password for a user
 * based on a token and a new password provided in the request body.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as `body`, `params`, `query`, `headers`,
 * etc. In this code snippet, `req.body` is used to access the request body, which typically contains
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending data, and setting headers.
 * @returns a response to the client. If the user is not found or the token has expired, it returns a
 * 401 status code with a message indicating the error. If the password reset is successful, it returns
 * a 200 status code with a success message. If an error occurs during the password update process, it
 * returns a 500 status code with an error message.
 */
const resetPasswordUser = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      "resetPasswordTokens.token": token,
      "resetPasswordTokens.expires": { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(401)
        .send({ message: "Utilisateur non trouvé ou token expiré." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordTokens = undefined;
    await user.save();

    return res
      .status(200)
      .send({ message: "Mot de passe réinitialisé avec succès." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        "Une erreur s'est produite lors de la mise à jour du mot de passe.",
    });
  }
};

const changeAvatar = async (req, res) => {

  try {
    const { id } = req.params;
    const { newAvatar } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatar: newAvatar },
      { new: true }
    );
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).send("User not found");
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { action, identifier, newEmail, newPassword } = req.body;
    let updateFields = {};

    switch (action) {
      case 'pseudo':
        updateFields = { username: identifier };
        break;
      case 'email':
        const existingUser = await User.findOne({ email: newEmail });
        if (existingUser) {
          return res
            .status(400)
            .send({ message: "L'adresse e-mail est déjà utilisée." });
        }
        updateFields = { email: newEmail };
        break;
      case 'mdp':
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        updateFields = { password: hashedPassword };
        break;
      default:
        return res.status(400).send("Action non prise en charge");
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).send("User not found");
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}


module.exports = {
  signup,
  login,
  getUserLoggedData,
  refreshToken,
  resetPasswordEmail,
  resetPasswordUser,
  changeAvatar,
  updateUser,
};
