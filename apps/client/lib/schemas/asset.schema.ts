import * as Yup from 'yup';

const generalInfoSchema = Yup.object().shape({
  assetName: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is Required'),
  images: Yup.array()
    .required('Images is required')
    .min(1, 'Images must contain at least one item'),
  codePrefix: Yup.string().required('Code Prefix is Required'),
  codeSuffix: Yup.string().required('Code Suffix is Required'),
  assetCode: Yup.string().required('Asset Code is Required'),
  brandName: Yup.string().required('Make is Required'),
  modelRef: Yup.string().required('Model is Required'),
  serialNo: Yup.string().required('Serial No. is Required'),
  categoryId: Yup.string().required('Category is Required'),
  subCategoryId: Yup.string().required('Subcategory is Required'),
  weightKg: Yup.number().required('Weight is Required'),
  widthCm: Yup.number().required('Width is Required'),
  heightCm: Yup.number().required('Height is Required'),
  depthCm: Yup.number().required('Depth is Required'),
  currentOwner: Yup.string().required('Owner is Required'),
  department: Yup.string().required('Department is Required'),
  assignedTo: Yup.string().required('This is Required'),
  responsibleFor: Yup.string().required('This is Required'),
});

const acquisitionInfoSchema = Yup.object().shape({
  acquisitionDate: Yup.string().required('Acquisition Date is required'),
  conditionId: Yup.string().required('Asset Condition is required'),
  initialValue: Yup.number()
    .required('Purchase Price is required')
    .min(1, 'Price must be greater than 0'),
  warrantyStartDate: Yup.string().required('Warranty Start Date is required'),
  warrantyEndDate: Yup.string().required('Warranty End Date is required'),
  warrantyTerms: Yup.string().required('Warranty Terms is required'),
  paymentTerms: Yup.string().required('Payment Terms is required'),
  depreciationStartDate: Yup.string().required(
    'Depreciation Start Date is required'
  ),
  depreciationMethod: Yup.string().required('Depreciation Method is required'),
  depreciationRate: Yup.number()
    .required('Depreciation Rate is required')
    .min(1, 'Rate must be greater than 0'),
  vendorId: Yup.string().required('Vendor is required'),
  vendorDetail: Yup.string().required('Vendor Detail is required'),
});

const documentSchema = Yup.object().shape({
  documents: Yup.array(),
});

const assetTransferSchema = Yup.object().shape({
  newOwner: Yup.string().required('Owner is Required'),
  transferDate: Yup.string().required('Transfer Date is Required'),
  condition: Yup.string().required('Condition is Required'),
  reason: Yup.string(),
});

const locationSchema = Yup.object().shape({
  facilityId: Yup.string().required('Facility is Required'),
  buildingId: Yup.string().required('Building is Required'),
  floorId: Yup.string().required('Floor is is Required'),
  departmentId: Yup.string().required('Department is is Required'),
  roomId: Yup.string().required('Room is is Required'),
  aisleId: Yup.string().required('Aisle is is Required'),
  shelfId: Yup.string().required('Shelf is is Required'),
});

export {
  generalInfoSchema,
  acquisitionInfoSchema,
  documentSchema,
  assetTransferSchema,
  locationSchema,
};
