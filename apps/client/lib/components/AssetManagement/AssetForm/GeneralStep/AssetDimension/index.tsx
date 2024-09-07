import { Flex, HStack, SimpleGrid } from '@chakra-ui/react';
import SectionInfo from '../../SectionInfo';
import { Field } from 'formik';
import TextInput from '~/lib/components/UI/TextInput';
import { useState } from 'react';
import DimensionDropDown from './DimensionDropDown';

const sampleDimensions = [
  { value: 'kg', label: 'Kg' },
  { value: 'cm', label: 'Cm' },
  { value: 'ft', label: 'Ft' },
];
const AssetDimension = () => {
  const [dimensions, setDimensions] = useState({
    weight: '',
    width: '',
    height: '',
    depth: '',
  });
  return (
    <HStack
      width="full"
      alignItems="flex-start"
      spacing="104px"
      position="relative"
    >
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Dimension"
          info="Choose the category and the sub-category"
          isRequired
        />
      </Flex>
      <SimpleGrid width="full" columns={4} gap="11px" position="relative">
        <Field
          as={TextInput}
          name="weight"
          type="text"
          label="Weight"
          rightElementWidth="72px"
          customRightElement={
            <DimensionDropDown
              options={sampleDimensions}
              value={dimensions.weight}
              handleChange={(value: string) =>
                setDimensions((prev) => ({ ...prev, weight: value }))
              }
            />
          }
        />
        <Field
          as={TextInput}
          name="width"
          type="text"
          label="Width"
          rightElementWidth="72px"
          customRightElement={
            <DimensionDropDown
              options={sampleDimensions}
              value={dimensions.width}
              handleChange={(value: string) =>
                setDimensions((prev) => ({ ...prev, width: value }))
              }
            />
          }
        />
        <Field
          as={TextInput}
          name="height"
          type="text"
          label="Height"
          rightElementWidth="72px"
          customRightElement={
            <DimensionDropDown
              options={sampleDimensions}
              value={dimensions.height}
              handleChange={(value: string) =>
                setDimensions((prev) => ({ ...prev, height: value }))
              }
            />
          }
        />
        <Field
          as={TextInput}
          name="depth"
          type="text"
          label="Depth"
          rightElementWidth="72px"
          customRightElement={
            <DimensionDropDown
              options={sampleDimensions}
              value={dimensions.depth}
              handleChange={(value: string) =>
                setDimensions((prev) => ({ ...prev, depth: value }))
              }
            />
          }
        />
      </SimpleGrid>
    </HStack>
  );
};

export default AssetDimension;
