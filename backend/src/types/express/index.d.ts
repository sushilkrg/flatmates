declare global {
  namespace Express {
    interface Request {
      user?: { _id: { toString(): string } };
    }
  }
}