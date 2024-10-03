export type TUser = {
  id: number;
  name: string;
  email?: string;
  avatarSrc?: string;
  role?: ERole;
};

export enum EGetSelfType {
  INIT = 'INIT',
  SIGN_IN = 'SIGN_IN',
  UPDATE = 'UPDATE',
}

export enum ERole {
  'ADMIN' = 'Administrator',
  'WORKER' = 'Worker',
  'VIEWER' = 'Viewer',
}
