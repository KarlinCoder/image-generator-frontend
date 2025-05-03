import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { FaPaintBrush } from "react-icons/fa";
import { styleOptions } from "../../../utils/styleOptions";

interface Props {
  value: string;
  setValue: (style: string) => void;
  disabled?: boolean;
}

export const CSelect: React.FC<Props> = ({ value, setValue, disabled }) => {
  return (
    <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel id="style-select-label">Estilo:</InputLabel>
      <Select
        labelId="style-select-label"
        value={value}
        label="Estilo:"
        onChange={(e) => !disabled && setValue(e.target.value as string)}
        size="small"
        disabled={disabled}
        MenuProps={{
          slotProps: {
            paper: {
              sx: {
                "& .MuiList-root": {
                  padding: 0,
                },
                maxHeight: 300,
                backgroundColor: "#0001",
                backdropFilter: "blur(15px)",
                color: "#eee",
              },
            },
          },
        }}
        sx={{
          backgroundColor: "#0004",
          backdropFilter: "blur(10px)",
          cursor: disabled ? "not-allowed" : "pointer",
          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            gap: "7px",
            cursor: disabled ? "not-allowed" : "pointer",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: disabled ? "rgba(255, 255, 255, 0.23)" : "",
          },
        }}
      >
        {styleOptions.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              backgroundColor: "#0004",
              display: "flex",
              gap: "7px",
              alignItems: "center",
              cursor: disabled ? "not-allowed" : "pointer",
              "&:hover": {
                backgroundColor: disabled
                  ? "inherit"
                  : "rgba(255, 255, 255, 0.08)",
              },
            }}
          >
            <FaPaintBrush />
            <Typography fontSize=".9rem">{option}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
