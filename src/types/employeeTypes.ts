export type Employee = {
  id: string;
  fullName: string;
  email: string;
  employeeCode: string;
  hireDate: string;
  roleName: "Manager" | "Waiter";
  restaurantId: string;
  status: 1 | 2;
  creted: string;
};

export type CreateEmployee = Omit<
  Employee,
  | "id"
  | "employeeCode"
  | "hireDate"
  | "roleName"
  | "fullName"
  | "status"
  | "creted"
> & {
  lastName: string;
  firstName: string;
  address: string;
  roleId: number;
};
