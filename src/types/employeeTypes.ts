export type Employee = {
  id: string;
  fullName: string;
  phoneNumber: string;
  employeeCode: string;
  hireDate: string;
  roleName: string;
  restaurantName: string;
  status: number;
};

export type CreateEmployee = Omit<
  Employee,
  "id" | "employeeCode" | "hireDate" | "roleName" | "status" | "restaurantName"
> & {
  roleId: number;
  restaurantId: string;
};
