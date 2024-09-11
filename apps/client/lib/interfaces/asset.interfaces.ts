interface AssetLocation {
  locationId: number;
  locationGuid: string | null;
  facilityId: number;
  facilityName: string;
  facilityRef: string;
  facilityAdress: string;
  longitude: number;
  latitude: number;
  buildingId: number;
  buildingName: string;
  buildingRef: string;
  buildingAddress: string;
  buildingLongitude: number;
  buildingLatitude: number;
  floorId: number;
  floorName: string;
  floorRef: string;
  departmentId: number;
  departmentName: string;
  departmentRef: string;
  roomId: number;
  roomName: string;
  roomRef: string;
  aisleId: number;
  aisleName: string;
  aisleRef: string;
  shelfId: number;
  shelfName: string;
  shelfRef: string;
}

type AssetStatusType =
  | 'Active'
  | 'Inactive'
  | 'Decommissioned'
  | 'Pending Disposal'
  | 'In Storage'
  | 'Operational'
  | 'Non-Operational'
  | 'Scheduled for Maintenance'
  | 'Out of Service';

interface Asset {
  rowId: number;
  assetId: number | null;
  brandName: string | null;
  modelRef: string | null;
  assetName: string;
  assetCode: string;
  assetTag: string;
  rfidtag: string | null;
  serialNo: string;
  lifeExpectancy: number;
  acquisitionDate: string;
  currentOwner: string;
  assignedTo: string | null;
  responsibleFor: string | null;
  purchaseDate: string;
  initialValue: number | null;
  resalevalue: number;
  dateCreated: string;
  scrapvalue: number;
  parentId: number | null;
  isDeleted: boolean;
  assetType: string | null;
  currentStatus: AssetStatusType;
  assetCategory: string;
  assetSubCategory: string;
  currentCondition: string;
  weightKg: number | null;
  lengthCm: number | null;
  widthCm: number | null;
  heightCm: number | null;
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
  floorName: string;
  floorRef: string;
  departmentName: string;
  departmentRef: string;
  roomName: string;
  roomRef: string;
  aisleName: string;
  aisleRef: string;
  shelfName: string;
  shelfRef: string;
  description: string;
  assetComponentId: number | null;
  lastMaintenanceDate: string | null;
  nextMaintenanceDate: string | null;
  currentCost: number | null;
  maintenanceCost: number | null;
}

interface AssetFormDetails {
  images: (string | File)[];
  name: string;
  description: string;
  assetCode: string;
  make: string;
  model: string;
  serialNo: string;
  codePrefix: string;
  codeSuffix: string;
  category: string;
  subCategory: string;
  weight: number | undefined;
  width: number | undefined;
  height: number | undefined;
  depth: number | undefined;
  owner: string;
  department: string;
  assignedTo: string;
  responsibleFor: string;
  acquisitionDate: string;
  assetCondition: string;
  purchasePrice: number | undefined;
  warrantyStartDate: string;
  warrantyEndDate: string;
  warrantyTerms: string;
  paymentTerms: string;
  depreciationStartDate: string;
  depreciationMethod: string;
  depreciationRate: number | undefined;
  vendorId: string;
  vendorDetail: string;
  documents: (string | File)[];
}

interface FilterInput {
  category: (string | number)[];
  location: (string | number)[];
}

export type {
  AssetLocation,
  Asset,
  AssetFormDetails,
  FilterInput,
  AssetStatusType,
};
