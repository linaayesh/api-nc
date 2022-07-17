import { Request, Response } from 'express';

export default async (req: Request, res: Response):
Promise<void> => {
  res.clearCookie('accessToken').json({ message: 'logged out successfully' });
};
