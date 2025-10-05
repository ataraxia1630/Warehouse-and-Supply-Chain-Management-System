import { Toolbar, Button } from "@mui/material";

export default function InventoryToolbar({
  menuItems,
  selectedMenu,
  onSelect,
}) {
  return (
    <Toolbar
      sx={{
        background: "#f5f5f5",
        borderRadius: 1,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {menuItems.map((item) => (
        <Button
          key={item.id}
          color={selectedMenu === item.id ? "secondary" : "inherit"}
          startIcon={item.icon}
          onClick={() => onSelect(item.id)}
        >
          {item.label}
        </Button>
      ))}
    </Toolbar>
  );
}
