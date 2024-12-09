export type UnassignedEmployeeInfo = {
  employeeId: string;
  employeeName: string;
  employeeCode: string;
};

export type AssignedEmployeeInfo = {
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  waiterScheduleId: string;
  isCheckIn: boolean;
};

export type WeeklyShiftCount = {
  date: string;
  shiftId: string;
  shiftName: string;
  employeeCount: number;
};
