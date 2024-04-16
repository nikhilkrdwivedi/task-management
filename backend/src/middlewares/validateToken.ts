import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";

import { fetchOne } from "../providers/authentications";

import {ENV_VARIABLES} from "../configurations/env";

import httpResponseMessages from "../constants/httpResponseMessages";
import { CustomRequest } from "../types/customRequest";

const extractTokenFromHeader = (request: CustomRequest) => {
  if (
    request.headers.authorization &&
    request.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return request.headers.authorization.split(" ")[1];
  }
  return undefined;
};

export const validateToken = async (
  request: CustomRequest,
  response: Response,
  next: NextFunction
) => {
  let token = extractTokenFromHeader(request);
  if (!token) {
    return response.status(401).json({
      success: false,
      message: httpResponseMessages.ACCESS_DENIED,
      error: null,
    });
  }
  token = token.replace(/\"/g, "");

  try {
    const userToken: any = jwt.verify(token, ENV_VARIABLES.JWT_SECRET);

    if (!userToken) {
      return response.status(401).json({
        success: false,
        message: httpResponseMessages.ACCESS_DENIED,
        error: null,
      });
    }

    const user = await fetchOne({
      _id: userToken.userId,
      tokens: token,
    });
    
    if (!user) {
      return response.status(401).json({
        success: false,
        message: httpResponseMessages.ACCESS_DENIED,
        error: null,
      });
    }
    request.user = user;
    next();
  } catch (error) {
    return response.status(401).json({
      success: false,
      message: httpResponseMessages.ACCESS_DENIED,
      error: null,
    });
  }
};

export default validateToken;