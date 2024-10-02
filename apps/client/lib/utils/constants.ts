import {
  AiOutlineFilePdf,
  AiOutlineFileWord,
  AiOutlineFileExcel,
  AiOutlineFilePpt,
  AiOutlineFileText,
  AiOutlineFileImage,
  AiOutlineQuestion,
} from 'react-icons/ai';

const OPERATORS = {
  Equals: 1,
  NotEquals: 2,
  GreaterThan: 3,
  GreaterThanOrEquals: 4,
  LessThan: 5,
  LessThanOrEquals: 6,
  Contains: 7,
  StartsWith: 8,
  EndsWith: 9,
};

const FORM_ENUM = {
  add: 1,
  delete: 2,
  update: 3,
};

const FILE_ICONS = {
  pdf: AiOutlineFilePdf,
  doc: AiOutlineFileWord,
  docx: AiOutlineFileWord,
  xls: AiOutlineFileExcel,
  xlsx: AiOutlineFileExcel,
  ppt: AiOutlineFilePpt,
  pptx: AiOutlineFilePpt,
  txt: AiOutlineFileText,
  jpeg: AiOutlineFileImage,
  jpg: AiOutlineFileImage,
  invalid: AiOutlineQuestion,
};

const timeRangeOptions = [
  {
    label: 'This Week',
    value: 2,
  },
  {
    label: 'This Month',
    value: 1,
  },
];

export { OPERATORS, FORM_ENUM, FILE_ICONS, timeRangeOptions };
