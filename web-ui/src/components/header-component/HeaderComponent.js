
import { AppBar, Toolbar, Typography, Paper, InputBase, IconButton, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import React from "react";


const useStyles = makeStyles({
  searchpaper: {
      marginTop: '10px',
      marginLeft:'10px',
      height: '30px',
      padding: '2px 6px',
      display: 'flex',
      alignItems: 'center',
      width: 200,
      marginRight: '12px',
      border: '1px solid  #97A1A9',
      '& .MuiInputLabel-root':
      {
          textAlign: 'left',
          color: '#97A1A9',
          opacity: '1',
      }
  },
    input:
    {
        color: '#97A1A9',
    }
}
)
export default function HeaderComponent() {
  const classes=useStyles();
  const [searchValue,setSearchValue]=useState("");
  const displayDesktop = () => {
    return <Toolbar style={{ backgroundColor: '#1B98F5', width:'1900px', display:'flex'}}>{femmecubatorLogo}</Toolbar>;
  };

  const onChangeEvent=(event)=>{
    debugger
    setSearchValue(event.target.value);
  }

  const femmecubatorLogo = (
    <div style={{display: 'contents', justifyContent:'space-between'}}>
      <div>
    <Typography variant="h6" component="h1">
      Inventory Management
    </Typography>
    </div>
     <div style={{paddingLeft:'1300px'}}>
     <Paper component="form" className={classes.searchpaper} >
       <InputBase className={classes.input} placeholder="Search by Product Name"
         onChange={onChangeEvent}
         inputProps={{ 'aria-label': 'Search by Invoice Number', size: 'small', color: 'primary' }} />
       <IconButton type="submit" className={classes.iconButton} aria-label="search">
         <SearchIcon color="primary" fontSize="small" />
       </IconButton>
     </Paper>
     </div>
     </div>
  );

  return (
    <header backgroundColor='#1B98F5'>
     
      <AppBar>

        {displayDesktop()}
      </AppBar>
     
    </header>
  );
}