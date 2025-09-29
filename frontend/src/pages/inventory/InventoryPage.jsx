import React, { useState } from 'react';
import {
  ThemeProvider,
  Typography,
  TextField,
  Button,
  Modal,
  Box,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import theme from '@/theme';
import InventoryForm from './InventoryForm';

const InventoryPage = () => {
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Widget A',
      sku: 'WID-A',
      unit: 'pcs',
      availableQty: 100,
      locationId: '1',
      locationCode: 'A-01',
      supplierId: '1',
      supplierName: 'Supplier A',
    },
    {
      id: '2',
      name: 'Widget B',
      sku: 'WID-B',
      unit: 'kg',
      availableQty: 50,
      locationId: '2',
      locationCode: 'B-02',
      supplierId: '2',
      supplierName: 'Supplier B',
    },
  ]);
  const [suppliers] = useState([
    { id: '1', name: 'Supplier A' },
    { id: '2', name: 'Supplier B' },
  ]);
  const [locations] = useState([
    { id: '1', code: 'A-01' },
    { id: '2', code: 'B-02' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState('');

  const handleSave = (product) => {
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...product,
                supplierName: suppliers.find((s) => s.id === product.supplierId)
                  ?.name,
                locationCode: locations.find((l) => l.id === product.locationId)
                  ?.code,
              }
            : p
        )
      );
    } else {
      setProducts([
        ...products,
        {
          id: String(products.length + 1),
          ...product,
          availableQty: 0,
          supplierName: suppliers.find((s) => s.id === product.supplierId)
            ?.name,
          locationCode: locations.find((l) => l.id === product.locationId)
            ?.code,
        },
      ]);
    }
    setShowForm(false);
    setEditingProduct(null);
    // TODO: Replace with API call
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    // TODO: Replace with API call
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'sku', headerName: 'SKU', width: 120 },
    { field: 'unit', headerName: 'Unit', width: 100 },
    { field: 'availableQty', headerName: 'Quantity', width: 100 },
    { field: 'locationCode', headerName: 'Location', width: 100 },
    { field: 'supplierName', headerName: 'Supplier', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => {
              setEditingProduct(params.row);
              setShowForm(true);
            }}
            sx={{ color: '#3e468a', mr: 1 }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(params.row.id)} color="error">
            Delete
          </Button>
        </>
      ),
    },
  ];

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <Typography
          variant="h4"
          sx={{ color: '#7f408e', textAlign: 'center', mb: 4 }}
        >
          Inventory Management
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <TextField
            label="Search by name or SKU"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 300 }}
          />
          <Button variant="contained" onClick={() => setShowForm(true)}>
            Add Product
          </Button>
        </Box>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredProducts}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
        <Modal
          open={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        >
          <InventoryForm
            product={editingProduct}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
            suppliers={suppliers}
            locations={locations}
          />
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default InventoryPage;
