import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";

/**
 * A MUI Checkbox component wrapped in a FormControl, with a FormGroup and FormLabel.
 * It renders a legend with the title, and a checkbox for each option.
 * The checked state of the checkbox is determined by whether the value of the option
 * is included in the selectedItem array.
 * When the checkbox is changed, the handleChange function is called with the option
 * as an argument.
 * @param {string} title - The title of the legend.
 * @param {Object[]} options - An array of objects with value and label properties.
 * @param {string[]} selectedItem - An array of values of the selected options.
 * @param {function} handleChange - A function to call when the selection changes.
 * @returns {ReactElement} - The rendered checkbox group.
 */
export default function CheckBoxGroup({ title, options, selectedItem, handleChange }) {
  return (
    <FormControl sx={{ m: 2, mb: 0 }} component="fieldset" variant="standard">
      <FormLabel component="legend">{title}</FormLabel>
      <FormGroup>
        {options.map((item) => (
          <FormControlLabel
            key={item.label}
            control={
              <Checkbox
              size="small"
                checked={selectedItem?.includes(item.label)}
                onChange={() => handleChange(item)}
              />
            }
            label={item.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
