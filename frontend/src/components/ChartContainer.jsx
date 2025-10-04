import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";

const ChartContainer = ({
  title,
  children,
  showDropdown = true,
  dropdown = "Jun 2024",
}) => (
  <Card>
    <CardContent>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight="medium">
          {title}
        </Typography>
        {showDropdown && (
          <Select value={dropdown} size="small" sx={{ minWidth: 120 }}>
            <MenuItem value={dropdown}>{dropdown}</MenuItem>
          </Select>
        )}
      </Box>
      {children}
    </CardContent>
  </Card>
);

export default ChartContainer;
