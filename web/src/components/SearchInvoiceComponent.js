import React, {useState,useEffect} from 'react';
import axios from 'axios';
import DebouncingComponent from './DebouncingComponent';
import RenderTableComponent from './RenderTableComponent';
import { Typography } from '@material-ui/core';
import {makeStyles, Paper,Grid } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export default function SearchInvoiceComponent(props)
{
    const [listOfUser, setListOfUser] = useState([])
    const debouncedSearchItem = DebouncingComponent(props.searchItem, 1500);
    const classes = useStyles();
    useEffect(() => {
        if (debouncedSearchItem) {
            axios.get(`http://localhost:8190/product/search/${debouncedSearchItem}`,{
                params:{
                    pageNumber: 0,
                    pageSize: 5
                }
            })
                .then(response => {
                    setListOfUser(response.data);
                });
    }
       
    }, [debouncedSearchItem])
    
    const isEmptyOrNot = (value) => {
        if(value.length == 0)
        return true;
        return false;
    }

return(

    <div>
        {isEmptyOrNot(listOfUser) ?
            <Grid container direction="column" alignItems="center" justify="center" alignContent = "center" className={classes.noResult}>
            <Grid item >
            <Icon style = {{color : 'red'}}>
                <ErrorOutlineIcon ></ErrorOutlineIcon>
                </Icon>
            </Grid>
            <Grid item>
            <Typography>
                No Results found!
            </Typography>
            </Grid>
           <Grid item>
                    <Typography style={{ color: '#C0C6CA'}}>
                Try adjusting your search to find out what are you looking for
            </Typography>
            </Grid>
            </Grid>
        :
        <RenderTableComponent responseData={listOfUser} selectedData = {props.selectedData} getSelectedRecord = 
            {props.getSelectedRecord}
        />
        }
    </div>
)
}

const useStyles = makeStyles({
    noResult: {
    paddingTop : '100px',
     margin:'auto',
        width: '50vw',
        color : 'white',
        
    },
    '& .MuiIcon-root':
    {
        color : 'red'
    }
}
);
