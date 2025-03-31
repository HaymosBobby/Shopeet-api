import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export interface ResponseDataInterface {
  success: boolean;
  message?: string;
  data?: any;
  statusCode?: number;
}

export interface TokenPayload {
  id: Types.ObjectId;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  sessionId?: string;
  isRefresh?: boolean;
  loginPhaseComplete?: boolean;
  isResetToken?: boolean;
  is2FA?: boolean;
  isVerification?: boolean;
  isPasswordChange?: boolean;
}

export interface UserRequestType extends JwtPayload {
  id: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  sessionId: string;
}

export interface TokenVerificationResult {
  valid: boolean;
  expired: boolean;
  decoded: UserRequestType | null;
}
