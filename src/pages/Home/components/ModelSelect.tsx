import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { FaTools } from "react-icons/fa";
import { IModel, models as modelsArray } from "../../../utils/models";
import { Box } from "@mui/material";

interface Props {
  value: IModel;
  setValue: (m: IModel) => void;
}

export const ModelSelect: React.FC<Props> = ({ value, setValue }) => {
  const handleChange = (event: SelectChangeEvent) => {
    const modelName = event.target.value as string;
    const selectedModel = modelsArray.find((model) => model.name === modelName);
    if (selectedModel) {
      setValue(selectedModel);
    }
  };

  return (
    <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel id="style-select-label">Modelo</InputLabel>
      <Select
        labelId="style-select-label"
        value={value.name}
        label="Modelo"
        onChange={handleChange}
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
        {modelsArray.map((modelItem) => (
          <MenuItem
            key={modelItem.name}
            value={modelItem.name}
            sx={{
              backgroundColor: "#0004",
              display: "flex",
              justifyContent: "space-between",
              gap: "7px",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <FaTools />
              <Typography fontSize=".9rem">{modelItem.name}</Typography>
            </Box>
            <Typography variant="caption" color="#ccc">
              {modelItem.base_provider}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
