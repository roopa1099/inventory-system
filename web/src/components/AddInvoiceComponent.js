
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import theme, { pxToVh } from '../utils/theme';
import { InputLabel, makeStyles, Paper } from '@material-ui/core';
import { Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import WarningIcon from '@material-ui/icons/Warning';
import { red } from '@material-ui/core/colors';

export default function AddInvoiceComponent(props) {



    const [error, setError] = useState(false);
    const [openSnackbar, setSnackBarOpen] = useState(false);
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState(-1);
    const [category, setCategory] = useState("");
    const [pricePerUnit, setPricePerUnit] = useState(-1);
    const [shelfNumber, setShelfNumber] = useState(-1);
    const [vendorLink, setVendorLink] = useState("");
    const handleSubmit = (event) => {

        event.preventDefault();
        setError(false);
        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        var isValidated = validateForm(value);
        if (isValidated)
            sendToServer(value);
        else
            setSnackBarOpen(true);
    }

    function sendToServer(values) {
        var data = JSON.parse(JSON.stringify(values));
        debugger
        axios.post('http://localhost:8190/product', data

        )
            .then((response) => {
                alert(response.data);
                window.location.reload(true);
                this.closeDialog();
            }, (error) => {
                alert(error.response.data);
            });
    }

    const handleClose = () => {
        setSnackBarOpen(false);
    }
    function validateForm(values) {
        if (values.productName === "" || values.quantity === "" || values.category === "" || values.pricePerUnit === "") {
            setError(true);
            return false;

        }
        return true;
    }
    const closeDialog = () => {
        props.handleCloseProp();
    }

    const classes = useStyles();
    return (

        <div>

            <Snackbar
                ContentProps={{
                    classes: {
                        root: classes.snackRoot
                    }
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openSnackbar}
                autoHideDuration={1500}
                onClose={handleClose}
                message={<div><WarningIcon style={{ color: 'red' }} size="small" /> <span>  Mandatory Field cant be empty</span></div>}
            />
            <Dialog PaperProps={{
                classes: {
                    root: classes.paper
                }
            }} open={true} onClose={closeDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{ color: 'white' }}>Add Product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <form id="addProductForm" onSubmit={handleSubmit} className={classes.root}>
                            <Grid container >

                                <Grid item xs={6} >
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item xs={4}>
                                            <InputLabel className={classes.labelRoot} required> Product Name </InputLabel>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <input
                                                required  = {true}
                                                type="text"
                                                variant="outlined"
                                                name="productName"
                                                onChange={e => setProductName(e.target.value)}
                                                className={classes.input}
                                            />
                                           

                                        </Grid>
                                    </Grid>

                                    <Grid container className={classes.gridGap} direction="row" alignItems="center">
                                        <Grid item xs={4}>
                                            <InputLabel className={classes.labelRoot} required> Quantity(in Kg) </InputLabel>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <input
                                                required  = {true}
                                                variant="outlined"
                                                type="number"
                                                name="quantity"
                                                onChange={e => setQuantity(e.target.value)}
                                                className={classes.input}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container className={classes.gridGap} direction="row" alignItems="center">
                                        <Grid item xs={4}>
                                            <InputLabel className={classes.labelRoot} required> Category </InputLabel>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <input
                                                 required  = {true}
                                                variant="outlined"
                                                type="text"
                                                name="category"
                                                onChange={e => setCategory(e.target.value)}
                                                className={classes.input}
                                            />
                                   
                                        </Grid>
                                    </Grid>

                                    <Grid container className={classes.gridGap} direction="row" alignItems="center">
                                        <Grid item xs={4}>
                                            <InputLabel className={classes.labelRoot} required> Price Per Unit</InputLabel>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <input
                                                 required  = {true}
                                                variant="outlined"
                                                type="number"
                                                name="pricePerUnit"
                                                onChange={e => setPricePerUnit(e.target.value)}
                                                className={classes.input}
                                            />
                                          
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} >
                                    <Grid container direction="column" alignItems="center">
                                        <Grid item>
                                            <Grid container direction="row" alignItems="center" >
                                                <Grid item xs={4}>
                                                    <InputLabel className={classes.labelRoot} required >Shelf Number</InputLabel>
                                                </Grid>

                                                <Grid item xs={8}>
                                                    <input
                                                        variant="outlined"
                                                        name="shelfNumber"
                                                        type="number"
                                                        onChange={e => setShelfNumber(e.target.value)}
                                                        className={classes.input}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container className={classes.gridGap} direction="row" alignItems="center">
                                                <Grid item xs={4}>
                                                    <InputLabel className={classes.labelRoot} >Vendor Link</InputLabel>
                                                </Grid>

                                                <Grid item xs={8}>
                                                    <TextField
                                                        required={true}
                                                        variant="outlined"
                                                        name="vendorLink"
                                                        type="notes"
                                                        onChange={e => setVendorLink(e.target.value)}
                                                        style={{
                                                            width: '250px',
                                                            opacity: '1',
                                                            backgroundColor: 'darkGrey'
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        Cancel
                    </Button>
                    <Button disabled={openSnackbar} type="submit" form="addProductForm" className={classes.submitButton} >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const useStyles = makeStyles(
    {
        paper:
        {
            backgroundColor: '#2A3E4C',
            background: 'transparent 0% 0 % no - repeat padding- box',
            boxShadow: '0px 8px 24px #00000029',
            borderRadius: '4px',
            opacity: '1',
            minWidth: '72vw',
            minHeight: '60vh'
        },
        root:
        {
            '& .MuiFormControl-root': { // & refers to parent and .MuiFormControl-root will apply to all field 
                width: '80%',
                margin: theme.spacing(1),
                color: 'white',
            },
            '& .MuiInputLabel-root':
            {
                textAlign: 'left',
                color: '#97A1A9',
                opacity: '1',

            }
            ,
            '& .MuiInputLabel-asterisk':
            {
                color: 'red'
            }
            ,
        },
        errorLabel: {

            color: 'red',
            fontSize: '14px'
        },
        input: {
            backgroundColor: 'darkgrey',
            height: '25px',
            width: '250px'
        },
        gridGap: {
            paddingTop: '30px'
        },
        submitButton:
        {
            backgroundColor: '#14AFF1',
            background: 'transparent 0% 0 % no - repeat padding- box',
            borderRadius: '10px',
            opacity: '1'
        },
        snackRoot:
        {
            backgroundColor: '#21303B',
        }
    },

);