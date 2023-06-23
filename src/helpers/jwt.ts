import jwt from "jsonwebtoken";
import { tokenInfo } from "../config/envConfigs";

async function createToken(data: any, exp?: any) {
  const finalExp = exp ? exp + "s" : tokenInfo.accessTokenValidity;

  return await jwt.sign(data, tokenInfo.jwtSecret, {
    expiresIn: finalExp,
  });
}

async function verifyToken(token: string) {
  try {
    if (token) {
      const result = await jwt.verify(token, tokenInfo.jwtSecret);
      return result;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

async function decodeToken(token: string) {
  if (token) {
    return await jwt.decode(token);
  } else {
    return null;
  }
}

export { createToken, verifyToken, decodeToken };
