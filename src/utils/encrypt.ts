import crypto from 'crypto';

const createHashedPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('base64');
};

export { createHashedPassword };
