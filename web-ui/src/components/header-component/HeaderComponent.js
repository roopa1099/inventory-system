
import { AppBar, Toolbar, Typography, Paper, InputBase, IconButton, makeStyles, } from "@material-ui/core";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import React from "react";


const useStyles = makeStyles({
  searchpaper: {
    marginTop: '10px',
    marginLeft: '10px',
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
export default function HeaderComponent(props) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const displayDesktop = () => {
    return <Toolbar style={{ backgroundColor: '#1B98F5', width:'100%', display:'flex'}}>{femmecubatorLogo}</Toolbar>;
  };

  const isEmptyOrNot = (value) => {
    if (value.length == 0)
      return true;
    return false;
  }

  const onChangeEvent = (event) => {
    setSearchValue(event.target.value);
    if (event.target.value == "") {
      props.searchValue(event.target.value);
    }

  }

  const onClickSearch = (event) => {
    event.preventDefault();
    props.searchValue(searchValue);

  }

  const femmecubatorLogo = (
    <div style={{display: 'flex', justifyContent:'space-between',width:'100%'}}>
      <div>
    <Typography variant="h4" component="h1" display="flex" style={{paddingTop:'5px'}}>
     <CurrencyRupeeIcon fontSize="30px"/> &nbsp;
     StockMate
    </Typography>
    </div>
     <div style={{paddingRight:'25px',paddingBottom: '10px'}}>
     <Paper component="form" className={classes.searchpaper} >
       <InputBase className={classes.input} placeholder="Search"
         onChange={onChangeEvent}
         inputProps={{ 'aria-label': 'Search', size: 'small', color: 'primary' }} />
       <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={onClickSearch}>
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