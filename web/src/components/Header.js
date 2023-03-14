import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import img from '../assets/abc-logo.png';
import hrc from '../assets/logo.png'
import { Grid } from '@material-ui/core';

const styles = theme => ({
  
    main:
    {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
    },
    menuButton: {

        marginTop : '200px', 
        top: '200px',
        left: '300px',
        width: '311px',
        height: '50px',
        marginBottom : '50px',
    opacity: 1,
    },
    
    highradiusLogo:
    {
    margin:'auto',  
    top: '22px',
    left: '5000px',
    width: '235px',
    height: '50px',
        marginBottom: '50px',
    }
});

 function Header(props) {
    return (
        
        <AppBar elevation={0}>
                <Toolbar>
                <Grid container direction= "row" >
                    <Grid item sm={5}  style={{
                        top: '22px',
                        width: '255px', 
                    }
                    } >
                       <h2>Inventory Management System</h2>
                            </Grid>
                    <Grid item  sm= {7} style = {{ position : 'relative' , margin : 'auto',
                        width: '235px',
                       }}>
    
                     
                        </Grid>
                        </Grid>

                </Toolbar>
            </AppBar>
    
    );}
export default Header;
