interface Client {
  firstName: string;
  lastName: string;
  address: string;
  zipCode: string;
  city: string;
  email: string;
  phone: string;
  joinDate: Date;
}

interface Credentials {
  email: string;
  password: string;
}

export type { Client, Credentials };
