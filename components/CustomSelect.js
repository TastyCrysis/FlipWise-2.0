import Select from "react-select";
import { useTheme } from "styled-components";

export default function CustomSelect({ options, selectedValues, onChange }) {
  const theme = useTheme();

  return (
    <Select
      isMulti
      name="collections"
      value={options.filter((option) => selectedValues.includes(option.value))}
      onChange={onChange}
      className="basic-multi-select"
      classNamePrefix="select"
      options={options}
      styles={{
        control: (provided) => ({
          ...provided,
          boxShadow: theme.boxShadowButton,
          borderColor: theme.border,
          backgroundColor: theme.background,
          color: theme.collectionCardText,
        }),
      }}
    />
  );
}
