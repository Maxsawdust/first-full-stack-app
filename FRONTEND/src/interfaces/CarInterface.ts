export interface OwnerType {
  _id: string;
  firstName: string;
  lastName: string;
  address: string;
  isCurrent: boolean;
}

export interface CarType {
  _id: string;
  make: string;
  model: string;
  registration: string;
  year: number;
  price: number;
  owners: OwnerType[];
  currentOwner: string;
  creationDate: Date;
  updatedDate: Date;
}
