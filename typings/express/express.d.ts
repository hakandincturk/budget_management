/* eslint-disable @typescript-eslint/no-namespace */
export {};

interface decodedObject {
  id: number,
}

declare global {
  namespace Express {
    interface Request {
      decoded: decodedObject;
    }
  }
}
