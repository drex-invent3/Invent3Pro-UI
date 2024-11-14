interface Ticket {
  rowId: number;
  ticketId: number;
  ticketTitle: string;
  issueDescription: string;
  issueReportDate: string;
  resolutionDate: string;
  isDeleted: boolean;
  assetId: number;
  assetCode: string;
  serialNo: string;
  assetDescription: string;
  reportedBy: string;
  reportedByEmployeeId: number;
  resolvedBy: string;
  resolvedByEmployeeId: number;
  activeSchedules: number;
  openTasks: number;
  facilityName: string;
  facilityRef: string;
  facilityAddress: string;
  facilityLongitude: number;
  facilityLatitude: number;
  buildingName: string;
  buildingRef: string;
  buildingAddress: string;
  buildingLongitude: number;
  buildingLatitude: number;
  priority: string;
  priorityColorCode: string;
  ticketTypeName: string;
  floor: string;
  floorRef: string;
  department: string;
  departmentRef: string;
  room: string;
  roomRef: string;
  aisle: string;
  aisleRef: string;
  shelf: string;
  shelfRef: string;
  taskPriorityId: number;
  taskStatusId: number;
  ticketTypeId: number;
  assetLocation: string;
}

export type { Ticket };
