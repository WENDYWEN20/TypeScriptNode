import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { users } from '../models/users.js';
import jwt from 'jsonwebtoken';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      res.status(409).json({ message: 'Email already Registered' });
      return;
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), email, passwordHash };
    users.push(newUser);
    res.status(201).json({ id: newUser.id, email: newUser.email });
  } catch (error) {
    next(error);
  }
};
const JWT_SECRET = process.env.JWT_SECRET || 'customizable';
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const user = users.find((user) => user.email === email);
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }
    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
