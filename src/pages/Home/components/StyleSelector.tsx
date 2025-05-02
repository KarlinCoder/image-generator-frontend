import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { FaPaintBrush } from "react-icons/fa";
import { styleOptions } from "../../../utils/styleOptions";

interface Props {
  styleType: string;
  setStyleType: (style: string) => void;
}

export const StyleSelector: React.FC<Props> = ({ styleType, setStyleType }) => {
  return (
    <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel id="style-select-label">Estilo</InputLabel>
      <Select
        labelId="style-select-label"
        value={styleType}
        label="Estilo"
        onChange={(e) => setStyleType(e.target.value as string)}
        size="small"
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

          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            gap: "7px",
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
