import { taskFormDetails } from './task.interfaces';

interface MaintenancePlan {
  rowId: number;
  maintenancePlanId: number;
  planName: string;
  startDate: string;
  endDate: string;
  dateCreated: string;
  cost: number;
  isDeleted: boolean;
  owner: string;
  assetId: number;
  assetCode: string;
  assetTypeId: number;
  serialNo: string;
  assetDescription: string;
  planTypeName: string;
  planStatusName: string;
  frequencyName: string;
  frequencyId: number;
  assetTypeName: string;
  ownedByAssetType: number;
  activeSchedules: number;
  openTasks: number;
  assetLocation: string;
}

interface MaintenanceSchedule {
  rowId: number;
  assetId: number | null;
  assetTypeId: number | null;
  assetName: string | null;
  countryId: number | null;
  stateId: number | null;
  maintenancePlanId: number | null;
  planName: string | null;
  scheduleId: number;
  scheduleGuid: string;
  scheduledDate: string | null;
  completionDate: string | null;
  durationInHours: number | null;
  scheduleName: string | null;
  description: string | null;
  sla: number | null;
  maintenanceTypeId: number | null;
  isDeleted: boolean | null;
  comments: string | null;
  ticketId: number | null;
  assignedTo: number | null;
  statusId: number | null;
  currentStatus: string | null;
  contactPerson: string | null;
  contactPersonPhoneNo: string | null;
  contactPersonEmail: string | null;
  maintenanceType: string | null;
  frequencyName: string | null;
  frequencyId: number | null;
  createdBy: string | null;
  totalCost: number | null;
  assetLocation: string | null;
  activeTasksCount: number | null;
}

interface AggregateMaintenanceSchedule {
  totalScheduleCount: number;
  scheduledDate: string;
  maxCompletionDate: string;
}

interface MaintenanceScheduleStat {
  totalSchedules: number;
  totalHours: number;
  totalCost: number;
  completed: number;
  pending: number;
  missed: number;
}

interface ScheduleFormDetails {
  name: string | null;
  scheduleId: number | null;
  planId: number | null;
  typeId: number | null;
  typeName: string | null;
  assetId: number | null;
  assetTypeId: number | null;
  assetName: string | null;
  sla: number | null;
  frequencyId: number | null;
  frequencyName: string | null;
  assetLocation: string | null;
  description: string | null;
  comment: string | null;
  scheduledDate: string | null;
  completionDate: string | null;
  ticketId: string | null;
  maintenancePlanInfo: {
    planName: string | null;
    assetTypeName: string | null;
    planStatus: string | null;
    startDate: string | null;
    endDate: string | null;
  };
  taskCount: number | null;
  tasks: taskFormDetails[];
  contactDetails: {
    picture: string | null;
    contactPerson: string | null;
  };
}

export type {
  MaintenancePlan,
  MaintenanceScheduleStat,
  AggregateMaintenanceSchedule,
  ScheduleFormDetails,
  MaintenanceSchedule,
};
