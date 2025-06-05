import { AppFile } from './domain/appFile';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  roles: string[];
  profileImage?: AppFile;
}
