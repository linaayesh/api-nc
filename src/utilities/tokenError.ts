import { CustomError } from '.';

export default (err: Error):Error => (err.toString().includes('JsonWebTokenError') ? new CustomError(err.message, 400) : err);
