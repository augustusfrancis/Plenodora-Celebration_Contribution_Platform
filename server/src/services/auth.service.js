import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

// Turns a plain password into a scrambled hash. The 10 is the "cost": higher is safer but slower.
export const hashPassword = (plain) => bcrypt.hash(plain, 10);

// Checks a typed password against the stored hash. Returns true or false.
export const verifyPassword = (plain, hash) => bcrypt.compare(plain, hash);

// Creates a login token holding the user's id ("sub"), valid for 7 days.
// It is signed with JWT_SECRET, so nobody can fake one.
export const signToken = (userId) =>
  jwt.sign({ sub: String(userId) }, env.jwtSecret, { expiresIn: '7d' });

// Checks a token's signature and expiry. Throws if invalid or expired.
export const verifyToken = (token) => jwt.verify(token, env.jwtSecret);

// The name of the cookie that carries the token.
export const COOKIE_NAME = 'token';

// Cookie settings.
export const cookieOptions = {
  httpOnly: true,                        // JavaScript in the browser cannot read it
  secure: env.nodeEnv === 'production',  // HTTPS only in production (localhost has no HTTPS)
  sameSite: 'lax',                       // not sent on requests from other sites (CSRF protection)
  maxAge: 7 * 24 * 60 * 60 * 1000,       // 7 days, matching the token expiry
};