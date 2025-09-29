import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

const InventoryForm = ({ product, onSave, onCancel, suppliers, locations }) => {
  const [name, setName] = useState(product?.name || '');
  const [sku, setSku] = useState(product?.sku || '');
  const [unit, setUnit] = useState(product?.unit || '');
  const [locationId, setLocationId] = useState(product?.locationId || '');
  const [supplierId, setSupplierId] = useState(product?.supplierId || '');

  const handleSubmit = () => {
    if (!name || !sku || !unit || !locationId || !supplierId) {
      alert('Please fill all fields');
      return;
    }
    onSave({ name, sku, unit, locationId, supplierId });
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'white',
        p: 4,
        borderRadius: 2,
        width: 400,
      }}
    >
      <Typography variant="h6" sx={{ color: '#7f408e', mb: 2 }}>
        {product ? 'Edit Product' : 'Add Product'}
      </Typography>
      <TextField
        label="Product Name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="SKU"
        fullWidth
        value={sku}
        onChange={(e) => setSku(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Unit"
        fullWidth
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Select
        label="Location"
        fullWidth
        value={locationId}
        onChange={(e) => setLocationId(e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">Select Location</MenuItem>
        {locations.map((loc) => (
          <MenuItem key={loc.id} value={loc.id}>
            {loc.code}
          </MenuItem>
        ))}
      </Select>
      <Select
        label="Supplier"
        fullWidth
        value={supplierId}
        onChange={(e) => setSupplierId(e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">Select Supplier</MenuItem>
        {suppliers.map((sup) => (
          <MenuItem key={sup.id} value={sup.id}>
            {sup.name}
          </MenuItem>
        ))}
      </Select>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button onClick={onCancel} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default InventoryForm;
