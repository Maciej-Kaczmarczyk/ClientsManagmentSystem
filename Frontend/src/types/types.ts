interface Client {
  firstname: string;
  lastname: string;
  address: string;
  zip_code: string;
  city: string;
  email: string;
  phone: string;
  join_date: Date;
}

interface Credentials {
    email: string;
    password: string;
  }

export type { Client, Credentials };
