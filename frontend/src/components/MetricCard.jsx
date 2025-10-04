import React from "react";
import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const MetricCard = ({
  title,
  value,
  change,
  bg_color = "success",
  subtitle = "Last month",
}) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={1}
      >
        <Typography variant="body2" color="text.secondary" mr={2}>
          {title}
        </Typography>
        <Chip
          icon={<TrendingUpIcon sx={{ fontSize: 14, color: "white" }} />}
          label={change}
          size="small"
          sx={{
            height: 20,
            backgroundColor: (theme) => theme.palette[bg_color].main,
            color: "white",
            "& .MuiChip-icon": {
              color: "white",
            },
          }}
        />
      </Box>
      <Typography variant="h4" fontWeight="bold" mb={0.5}>
        {value}
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          →
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default MetricCard;
