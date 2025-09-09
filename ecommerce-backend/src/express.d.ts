//Declaration merging - Add new fields to an existing library’s type definitions without touching the library itself
import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
      };
    }
  }
}
