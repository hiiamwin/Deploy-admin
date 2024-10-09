import { WaiterSchedule } from "./components";

function ManageWaiterSchedulePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Lịch Làm Việc Nhân Viên Nhà Hàng
      </h1>
      <WaiterSchedule />
    </div>
  );
}

// function AddStaffForm({
//   scheduleItem,
//   onSave,
//   staffMembers,
//   shifts,
//   schedule,
// }) {
//   const [formData, setFormData] = useState(scheduleItem);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     validateForm();
//   }, [formData]);

//   const validateForm = () => {
//     const newErrors = {};

//     // Check for minimum and maximum staff
//     if (formData.staffIds.length < 5) {
//       newErrors.staffCount = "Vui lòng chọn ít nhất 5 nhân viên.";
//     } else if (formData.staffIds.length > 15) {
//       newErrors.staffCount = "Vui lòng chọn không quá 15 nhân viên.";
//     }

//     // Check for maximum 2 shifts per day per staff
//     const dailyShifts = schedule.filter((item) => item.date === formData.date);
//     formData.staffIds.forEach((staffId) => {
//       const shiftsForStaff = dailyShifts.filter((item) =>
//         item.staffIds.includes(staffId)
//       ).length;
//       if (shiftsForStaff >= 2 && !scheduleItem.staffIds.includes(staffId)) {
//         newErrors[`staff_${staffId}`] = `Nhân viên ${
//           staffMembers.find((s) => s.id === staffId).name
//         } đã làm 2 ca trong ngày này.`;
//       }
//     });

//     setErrors(newErrors);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (Object.keys(errors).length === 0) {
//       onSave(formData);
//     }
//   };

//   const handleStaffToggle = (staffId) => {
//     const updatedStaffIds = formData.staffIds.includes(staffId)
//       ? formData.staffIds.filter((id) => id !== staffId)
//       : [...formData.staffIds, staffId];
//     setFormData({ ...formData, staffIds: updatedStaffIds });
//   };

//   const shift = shifts.find((s) => s.id === formData.shiftId);

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <Label>
//           Ngày: {format(parseISO(formData.date), "dd/MM/yyyy", { locale: vi })}
//         </Label>
//       </div>
//       <div>
//         <Label>
//           Ca làm việc:{" "}
//           {shift
//             ? `${shift.name} (${shift.startTime} - ${shift.endTime})`
//             : "Không xác định"}
//         </Label>
//       </div>
//       <div>
//         <Label>Chọn Nhân Viên (tối thiểu 5, tối đa 15)</Label>
//         <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
//           {staffMembers.map((staff) => (
//             <div key={staff.id} className="flex items-center">
//               <input
//                 type="checkbox"
//                 id={`staff-${staff.id}`}
//                 checked={formData.staffIds.includes(staff.id)}
//                 onChange={() => handleStaffToggle(staff.id)}
//                 className="mr-2"
//               />
//               <Label htmlFor={`staff-${staff.id}`}>{staff.name}</Label>
//               {errors[`staff_${staff.id}`] && (
//                 <span className="text-red-500 text-sm ml-2">
//                   {errors[`staff_${staff.id}`]}
//                 </span>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//       <Button type="submit" disabled={Object.keys(errors).length > 0}>
//         Lưu Lịch
//       </Button>
//       {errors.staffCount && (
//         <p className="text-red-500 text-sm">{errors.staffCount}</p>
//       )}
//     </form>
//   );
// }

// function ViewStaffList({ scheduleItem, staffMembers, shifts }) {
//   const [isEarlyLeaveDialogOpen, setIsEarlyLeaveDialogOpen] = useState(false);
//   const [selectedStaff, setSelectedStaff] = useState(null);
//   const shift = shifts.find((s) => s.id === scheduleItem.shiftId);
//   const assignedStaff = staffMembers.filter((staff) =>
//     scheduleItem.staffIds.includes(staff.id)
//   );

//   const handleEarlyLeave = (staff) => {
//     setSelectedStaff(staff);
//     setIsEarlyLeaveDialogOpen(true);
//   };

//   return (
//     <div className="space-y-4">
//       <div>
//         <Label>
//           Ngày:{" "}
//           {format(parseISO(scheduleItem.date), "dd/MM/yyyy", { locale: vi })}
//         </Label>
//       </div>
//       <div>
//         <Label>
//           Ca làm việc:{" "}
//           {shift
//             ? `${shift.name} (${shift.startTime} - ${shift.endTime})`
//             : "Không xác định"}
//         </Label>
//       </div>
//       <div>
//         <Label>Danh sách nhân viên:</Label>
//         <ul className="mt-2 space-y-2 max-h-60 overflow-y-auto">
//           {assignedStaff.map((staff) => (
//             <li key={staff.id} className="flex items-center justify-between">
//               <span>{staff.name}</span>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => handleEarlyLeave(staff)}
//               >
//                 Ra về sớm
//               </Button>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <Dialog
//         open={isEarlyLeaveDialogOpen}
//         onOpenChange={setIsEarlyLeaveDialogOpen}
//       >
//         <DialogContent className="sm:max-w-[425px] bg-white">
//           <DialogHeader>
//             <DialogTitle>Đăng ký ra về sớm</DialogTitle>
//             <DialogDescription>Ra về sớm</DialogDescription>
//           </DialogHeader>
//           <EarlyLeaveForm
//           // staff={selectedStaff}
//           // shift={shift}
//           // onSave={(earlyLeaveData) => {
//           //   console.log("Early leave data:", earlyLeaveData);
//           //   // Implement the logic to save early leave data
//           //   setIsEarlyLeaveDialogOpen(false);
//           // }}
//           />
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// function EarlyLeaveForm({ staff, shift, onSave }) {
//   const [formData, setFormData] = useState({
//     leaveTime: "",
//     reason: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave({
//       staffId: staff.id,
//       staffName: staff.name,
//       shiftId: shift.id,
//       shiftName: shift.name,
//       ...formData,
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <Label>Nhân viên: {staff.name}</Label>
//       </div>
//       <div>
//         <Label>
//           Ca làm việc: {shift.name} ({shift.startTime} - {shift.endTime})
//         </Label>
//       </div>
//       <div>
//         <Label htmlFor="leaveTime">Thời gian ra về</Label>
//         <Input
//           id="leaveTime"
//           type="time"
//           value={formData.leaveTime}
//           onChange={(e) =>
//             setFormData({ ...formData, leaveTime: e.target.value })
//           }
//           required
//         />
//       </div>
//       <div>
//         <Label htmlFor="reason">Lý do</Label>
//         <Textarea
//           id="reason"
//           value={formData.reason}
//           onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
//           required
//         />
//       </div>
//       <DialogFooter>
//         <Button type="submit">Xác nhận</Button>
//       </DialogFooter>
//     </form>
//   );
// }

export default ManageWaiterSchedulePage;
