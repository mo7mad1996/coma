export interface User {
  account?: string;
  password: string;
  email?: string;
  remember_me: string;
}

export interface NewUser {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  password: string;
  password_confirmation: string;
  country_id?: string | null;
  // city_id: string;
  user_type: string;
  photo?: File | null;
  country_code?: string | null;
}
export interface NewCharity {
  "charity_name:ar": string;
  "charity_name:en": string;
  email: string;
  mobile: string;
  password: string;
  password_confirmation: string;
  country_id: string;
  user_type: string;
}
