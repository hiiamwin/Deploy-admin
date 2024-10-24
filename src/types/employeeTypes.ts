export type Employee = {
  id: string;
  fullName: string;
  phoneNumber: string;
  employeeCode: string;
  hireDate: string;
  roleName: string;
  restaurantName: string;
  status: number;
  createdDate: string;
};

export type CreateEmployee = Omit<
  Employee,
  | "id"
  | "employeeCode"
  | "hireDate"
  | "roleName"
  | "fullName"
  | "status"
  | "createdDate"
  | "restaurantName"
> & {
  lastName: string;
  firstName: string;
  roleId: number;
  restaurantId: string;
};
