import jwt from 'jsonwebtoken';

const ALLOWED_ROLES = new Set([
  'super_admin', 'admin', 'principal', 'teacher', 'bursar', 'parent', 'student',
]);

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) throw new Error('JWT_SECRET must be configured with at least 32 characters.');
  return secret;
}

export function protect(req, res, next) {
  const authorization = req.get('authorization') || '';
  const [scheme, token] = authorization.split(' ');
  if (scheme !== 'Bearer' || !token) return res.status(401).json({ error: 'Authentication required.' });

  try {
    const payload = jwt.verify(token, getJwtSecret(), {
      issuer: 'peculiar-college-doma',
      algorithms: ['HS256'],
    });
    if (
      typeof payload !== 'object' ||
      typeof payload.id !== 'string' ||
      typeof payload.role !== 'string' ||
      !ALLOWED_ROLES.has(payload.role)
    ) return res.status(401).json({ error: 'Invalid authentication token.' });

    req.user = { id: payload.id, role: payload.role };
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired authentication token.' });
  }
}

export function restrictTo(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Authentication required.' });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'You are not authorized to perform this action.' });
    }
    return next();
  };
}
