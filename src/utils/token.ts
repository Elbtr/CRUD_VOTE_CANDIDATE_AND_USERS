// const jwt = require('jsonwebtoken')
// exports.getToken = (username, expirationTime) => {
//     //generate token for the user
//     const token = jwt.sign(
//         { username },
//         process.env.TOKEN_KEY,
//         {
//             expiresIn: expirationTime //2h in seconds
//         }
//     )
//     return token
// }

import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default new (class TokenConfig {
  getToken(user_name: String, expirationTime: number) {
    const token = sign({ user_name }, process.env.JWT_TOKEN_KEY, {
      expiresIn: expirationTime,
    });

    return token;
  }
})();
