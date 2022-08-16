import { CustomError } from '.';
import { HttpStatus } from './constants';

export default (err: Error):Error => (err.toString().includes('JsonWebTokenError') || err.toString().includes('TokenExpiredError') ? new CustomError(err.message, HttpStatus.BAD_REQUEST) : err);
