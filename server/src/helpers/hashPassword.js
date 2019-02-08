import bcrypt from 'bcrypt';

/**
 * @function hashPassword
 * @memberof UserController
 * @param {string} password
 * @param {integer} salt
 * @returns
 */
function hashPassword(password, salt) {
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export default hashPassword;
