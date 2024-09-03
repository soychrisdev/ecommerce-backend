
export const USER_ROLES = ["admin", "user"] as const;

export type UserRoles = (typeof USER_ROLES)[number];

export interface UserToken {
  userId: string;
  token: string;
  createdAt: Date;
}

export interface Item {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface CheckoutData {
  currency: string;
  authorize: boolean;
  cancel_url_method: string;
  success_url_method: string;
  items: Item[];
}


export interface JwtPayload {
  id: string;
  role: UserRoles;
  iat: number;
  exp: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRoles;
  photo?: string;
  aboutMe?: string;
  ventiPay?: string;
}


export interface UserModel extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRoles;
  photo?: string;
  aboutMe?: string;
  ventiPayId?: string;
}