import bcrypt from 'bcrypt';

function hashPassword(password, salt) {
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export default hashPassword;
