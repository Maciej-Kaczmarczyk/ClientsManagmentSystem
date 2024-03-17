interface Client {
  firstName: string;
  lastName: string;
  address: string;
  zipCode: string;
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
