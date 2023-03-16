
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";

export default function HeaderComponent() {
  const displayDesktop = () => {
    return <Toolbar style={{ backgroundColor: '#1B98F5'}}>{femmecubatorLogo}</Toolbar>;
  };

  const femmecubatorLogo = (
    <Typography variant="h6" component="h1">
      Inventory Management
    </Typography>
  );

  return (
    <header>
      <AppBar>{displayDesktop()}</AppBar>
    </header>
  );
}