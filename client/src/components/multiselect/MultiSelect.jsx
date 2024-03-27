import React from "react";
import { TextField, Autocomplete, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function MultiSelect({
  data,
  label,
  color,
  placeholder,
  onSelectionChange,
}) {
  const handleSelectionChange = (event, newValue) => {
    onSelectionChange(newValue);
  };

  return (
    <Autocomplete
      sx={{ m: 1, width: 500 }}
      multiple
      options={data}
      getOptionLabel={(option) => option}
      disableCloseOnSelect
      onChange={handleSelectionChange}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          placeholder={placeholder}
          color={color}
        />
      )}
      renderOption={(props, option, { selected }) => (
        <MenuItem
          {...props}
          key={option}
          value={option}
          sx={{ justifyContent: "space-between", color: "black" }}
        >
          {option}
          {selected ? <CheckIcon color="info" /> : null}
        </MenuItem>
      )}
    />
  );
}
