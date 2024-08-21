import { FirebaseAuthToken } from 'firebase-admin/auth'; // adjust the import according to your setup

declare global {
  namespace Express {
    interface Request {
      user?: FirebaseAuthToken;
    }
  }
}
