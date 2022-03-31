import crypto from 'crypto';

const createHashedPassword = (password: string): string =>
  crypto.createHash('sha256').update(password).digest('base64');

export { createHashedPassword };
