import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { menuItems } from "./MenuConfig";

const FormDialog = ({ open, onClose, mode, selectedMenu, selectedRow }) => {
  const currentMenu = menuItems.find((item) => item.id === selectedMenu);
  const isEditMode = mode === "edit";

  const renderFields = () => {
    if (isEditMode && !selectedRow) {
      return <Typography>Không có dữ liệu để hiển thị</Typography>;
    }

    switch (selectedMenu) {
      case "warehouses":
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Mã kho"
              defaultValue={isEditMode ? selectedRow.code : ""}
              fullWidth
            />
            <TextField
              label="Tên kho"
              defaultValue={isEditMode ? selectedRow.name : ""}
              fullWidth
            />
            <TextField
              label="Địa chỉ"
              defaultValue={isEditMode ? selectedRow.address : ""}
              fullWidth
            />
            <TextField
              label="Số lượng location"
              defaultValue={isEditMode ? selectedRow.quantity : ""}
              fullWidth
              type="number"
            />
          </Box>
        );
      case "locations":
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Mã location"
              defaultValue={isEditMode ? selectedRow.code : ""}
              fullWidth
            />
            <TextField
              label="Tên"
              defaultValue={isEditMode ? selectedRow.name : ""}
              fullWidth
            />
            <TextField
              label="Loại"
              defaultValue={isEditMode ? selectedRow.type : ""}
              fullWidth
            />
            <TextField
              label="Sức chứa"
              defaultValue={isEditMode ? selectedRow.capacity : ""}
              fullWidth
              type="number"
            />
            <FormControl size="small" fullWidth>
              <InputLabel>Warehouse</InputLabel>
              <Select
                defaultValue={isEditMode ? selectedRow.warehouse : ""}
                label="Warehouse"
              >
                <MenuItem value="Kho Trung Tâm">Kho Trung Tâm</MenuItem>
                <MenuItem value="Kho Miền Bắc">Kho Miền Bắc</MenuItem>
                <MenuItem value="Kho Miền Trung">Kho Miền Trung</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );
      case "products":
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="SKU"
              defaultValue={isEditMode ? selectedRow.sku : ""}
              fullWidth
            />
            <TextField
              label="Tên sản phẩm"
              defaultValue={isEditMode ? selectedRow.name : ""}
              fullWidth
            />
            <FormControl size="small" fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                defaultValue={isEditMode ? selectedRow.category : ""}
                label="Category"
              >
                <MenuItem value="Điện tử">Điện tử</MenuItem>
                <MenuItem value="Thực phẩm">Thực phẩm</MenuItem>
                <MenuItem value="Dệt may">Dệt may</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Đơn vị"
              defaultValue={isEditMode ? selectedRow.unit : ""}
              fullWidth
            />
            <TextField
              label="Barcode"
              defaultValue={isEditMode ? selectedRow.barcode : ""}
              fullWidth
            />
          </Box>
        );
      case "batches":
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Batch No"
              defaultValue={isEditMode ? selectedRow.batchNo : ""}
              fullWidth
            />
            <FormControl size="small" fullWidth>
              <InputLabel>Sản phẩm</InputLabel>
              <Select
                defaultValue={isEditMode ? selectedRow.product : ""}
                label="Sản phẩm"
              >
                <MenuItem value="Sản phẩm A">Sản phẩm A</MenuItem>
                <MenuItem value="Sản phẩm B">Sản phẩm B</MenuItem>
                <MenuItem value="Sản phẩm C">Sản phẩm C</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Số lượng"
              defaultValue={isEditMode ? selectedRow.quantity : ""}
              fullWidth
              type="number"
            />
            <TextField
              label="Ngày SX"
              defaultValue={isEditMode ? selectedRow.mfgDate : ""}
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="HSD"
              defaultValue={isEditMode ? selectedRow.expDate : ""}
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        );
      case "inventory":
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="SKU"
              defaultValue={isEditMode ? selectedRow.sku : ""}
              fullWidth
            />
            <FormControl size="small" fullWidth>
              <InputLabel>Sản phẩm</InputLabel>
              <Select
                defaultValue={isEditMode ? selectedRow.product : ""}
                label="Sản phẩm"
              >
                <MenuItem value="Sản phẩm A">Sản phẩm A</MenuItem>
                <MenuItem value="Sản phẩm B">Sản phẩm B</MenuItem>
                <MenuItem value="Sản phẩm C">Sản phẩm C</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Batch</InputLabel>
              <Select
                defaultValue={isEditMode ? selectedRow.batch : ""}
                label="Batch"
              >
                <MenuItem value="BATCH001">BATCH001</MenuItem>
                <MenuItem value="BATCH002">BATCH002</MenuItem>
                <MenuItem value="BATCH003">BATCH003</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Kho</InputLabel>
              <Select
                defaultValue={isEditMode ? selectedRow.warehouse : ""}
                label="Kho"
              >
                <MenuItem value="Kho Trung Tâm">Kho Trung Tâm</MenuItem>
                <MenuItem value="Kho Miền Bắc">Kho Miền Bắc</MenuItem>
                <MenuItem value="Kho Miền Trung">Kho Miền Trung</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                defaultValue={isEditMode ? selectedRow.location : ""}
                label="Location"
              >
                <MenuItem value="A-01-01">A-01-01</MenuItem>
                <MenuItem value="B-02-03">B-02-03</MenuItem>
                <MenuItem value="C-01-05">C-01-05</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Available Qty"
              defaultValue={isEditMode ? selectedRow.available : ""}
              fullWidth
              type="number"
            />
            <TextField
              label="Reserved Qty"
              defaultValue={isEditMode ? selectedRow.reserved : ""}
              fullWidth
              type="number"
            />
          </Box>
        );
      case "movements":
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Ngày giờ"
              defaultValue={isEditMode ? selectedRow.date : ""}
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            <FormControl size="small" fullWidth>
              <InputLabel>Loại</InputLabel>
              <Select
                defaultValue={isEditMode ? selectedRow.type : ""}
                label="Loại"
              >
                <MenuItem value="Nhập kho">Nhập kho</MenuItem>
                <MenuItem value="Chuyển kho">Chuyển kho</MenuItem>
                <MenuItem value="Xuất kho">Xuất kho</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Sản phẩm</InputLabel>
              <Select
                defaultValue={isEditMode ? selectedRow.product : ""}
                label="Sản phẩm"
              >
                <MenuItem value="Sản phẩm A">Sản phẩm A</MenuItem>
                <MenuItem value="Sản phẩm B">Sản phẩm B</MenuItem>
                <MenuItem value="Sản phẩm C">Sản phẩm C</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Batch</InputLabel>
              <Select
                defaultValue={isEditMode ? selectedRow.batch : ""}
                label="Batch"
              >
                <MenuItem value="BATCH001">BATCH001</MenuItem>
                <MenuItem value="BATCH002">BATCH002</MenuItem>
                <MenuItem value="BATCH003">BATCH003</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="From Location"
              defaultValue={isEditMode ? selectedRow.from : ""}
              fullWidth
            />
            <TextField
              label="To Location"
              defaultValue={isEditMode ? selectedRow.to : ""}
              fullWidth
            />
            <TextField
              label="Qty"
              defaultValue={isEditMode ? selectedRow.qty : ""}
              fullWidth
              type="number"
            />
            <TextField
              label="Reference"
              defaultValue={isEditMode ? selectedRow.reference : ""}
              fullWidth
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {isEditMode
          ? `Chỉnh sửa ${currentMenu?.label}`
          : `Thêm ${currentMenu?.label} mới`}
      </DialogTitle>
      <DialogContent dividers>{renderFields()}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
        <Button variant="contained">Lưu</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
