import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const ADMIN_ROLES = new Set(['admin', 'super_admin']);

function issueToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) throw new Error('JWT_SECRET is not configured securely.');
  return jwt.sign(
    { id: user._id.toString(), role: user.role },
    secret,
    { algorithm: 'HS256', expiresIn: '8h', issuer: 'peculiar-college-doma' }
  );
}

function publicUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    ...(user.studentId ? { studentId: user.studentId } : {}),
    ...(user.className ? { className: user.className } : {}),
    mustChangePassword: user.mustChangePassword,
  };
}

async function authenticate(req, res, allowedAdminRoles) {
  const loginId = typeof req.body?.loginId === 'string' ? req.body.loginId.trim() : '';
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  const identity = loginId || email;
  if (!identity || !password) return res.status(400).json({ error: 'Login ID/email and password are required.' });

  const lookup = identity.includes('@')
    ? { email: identity.toLowerCase() }
    : { studentId: identity.toUpperCase() };
  const user = await User.findOne(lookup).select('+password');
  const passwordMatches = user ? await bcrypt.compare(password, user.password) : false;
  if (!user || !passwordMatches) return res.status(401).json({ error: 'Invalid login credentials.' });

  if (ADMIN_ROLES.has(user.role) !== allowedAdminRoles) {
    return res.status(403).json({ error: allowedAdminRoles ? 'Use the general portal login for this account.' : 'Use the administrator login for this account.' });
  }
  return res.json({ token: issueToken(user), user: publicUser(user) });
}

export async function login(req, res, next) {
  try { return await authenticate(req, res, false); } catch (error) { return next(error); }
}

export async function adminLogin(req, res, next) {
  try { return await authenticate(req, res, true); } catch (error) { return next(error); }
}

export async function changePassword(req, res, next) {
  try {
    const currentPassword = typeof req.body?.currentPassword === 'string' ? req.body.currentPassword : '';
    const newPassword = typeof req.body?.newPassword === 'string' ? req.body.newPassword : '';
    if (newPassword.length < 8) return res.status(400).json({ error: 'New password must be at least 8 characters.' });

    const user = await User.findById(req.user.id).select('+password');
    if (!user) return res.status(404).json({ error: 'User not found.' });
    if (!(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(401).json({ error: 'Current password is incorrect.' });
    }
    user.password = newPassword;
    user.mustChangePassword = false;
    await user.save();
    return res.json({ success: true, message: 'Password updated successfully.' });
  } catch (error) { return next(error); }
}
