import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, Button, makeStyles, InputLabel } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import WarningIcon from '@material-ui/icons/Warning';
import axios from 'axios';

export default function EditProductComponent(props) {


    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState(-1);
    const [openSnackbar, setSnackBarOpen] = useState(false);
    const [pricePerUnit, setPricePerUnit] = useState(-1);
    const [shelfNumber, setShelfNumber] = useState(-1);
    const [responseReceived, setResponseReceived] = useState(false);
    const [error, setError] = useState(false);

    const setSource = (value) => {
        Object.assign(source, value);
    }


    const source = {
        id: props.selectedData[0],
        productName: '',
        quantity: 0,
        category: '',
        pricePerUnit: 0,
        shelfNumber: 0,
        vendorLink: ''
    }


    useEffect(() => {
        console.log("Data");
        const getData = async () => {
            const id = props.selectedData[0];
            const response = await axios.get(`http://localhost:8290/product/${id}`);
            if (response.data) {
                setSource({
                    id: response.data.id,
                    productName: response.data.productName,
                    quantity: response.data.quantity,
                    category: response.data.category,
                    pricePerUnit: response.data.pricePerUnit,
                    shelfNumber: response.data.shelfNumber,
                    vendorLink: response.data.vendorLink
                })
                setProductName(response.data.productName);
                setPricePerUnit(response.data.pricePerUnit);
                setQuantity(response.data.quantity);
                setShelfNumber(response.data.shelfNumber);
                setResponseReceived(true);
            }

        }
        getData();
    }
    );

    function validateForm(values) {
        if (values.quantity === "" || values.shelfNumber === "" || values.pricePerUnit === "") {
            setError(true);
            return false;

        }
        return true;
    }


    const handleClose = () => {
        props.handleEditClose();
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        var isValidated = validateForm(value);


        if (isValidated) {
            setSource({ ...source,  productName: value.productName ,quantity: value.quantity, pricePerUnit: value.pricePerUnit, shelfNumber: value.shelfNumber })

            axios.put('http://localhost:8290/product', source
            ).then((response) => {
                alert("Record Succesfully Edited");
                handleClose();
                window.location.reload(true);
            }, (error) => {
                alert(error.response.data);
            });
        }


    }

    const handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => {
                if (input.name != "productName")
                    input.value = "";
            }
        );
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
            }} open={responseReceived} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Product</DialogTitle>
                <hr/>
                <DialogContent>
                    <DialogContentText style={{ color: '#C0C6CA' }}>
                        <form id="addProductForm" onSubmit={handleSubmit} className={classes.root}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item xs={4}>
                                            <InputLabel className={classes.labelRoot} required>Product Name</InputLabel>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <input

                                                variant="outlined"
                                                type="text"
                                                name="productName"
                                                id="productName"
                                                className={classes.input}
                                                defaultValue={productName}
                                                onChange={e => setProductName(e.target.value)}
                                            />

                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.gridGap} direction="row" alignItems="center">
                                        <Grid item xs={4}>
                                            <InputLabel className={classes.labelRoot} required>Quantity</InputLabel>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <input
                                                required={true}
                                                variant="outlined"
                                                type="number"
                                                name="quantity"
                                                id="quantity"
                                                defaultValue={quantity}
                                                className={classes.input}
                                                onChange={e => setQuantity(e.target.value)}

                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.gridGap} direction="row" alignItems="center">
                                        <Grid item xs={4}>
                                            <InputLabel className={classes.labelRoot} required>Price Per Unit(in Rs.)</InputLabel>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <input
                                                required={true}
                                                variant="outlined"
                                                type="number"
                                                name="pricePerUnit"
                                                id="pricePerUnit"
                                                defaultValue={pricePerUnit}
                                                className={classes.input}
                                                onChange={e => setPricePerUnit(e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.gridGap} direction="row" alignItems="center">
                                        <Grid item xs={4}>
                                            <InputLabel className={classes.labelRoot} required>Shelf Number</InputLabel>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <input
                                                required={true}
                                                variant="outlined"
                                                type="number"
                                                name="shelfNumber"
                                                id="shelfNumber"
                                                className={classes.input}
                                                onChange={e => setShelfNumber(e.target.value)}
                                                defaultValue={shelfNumber}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleReset} color="primary">
                        Reset
                    </Button>
                    <Button type="submit" form="addProductForm" className={classes.submitButton} >
                        Save
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
            background: 'transparent 0% 0 % no - repeat padding- box',
            boxShadow: '0px 8px 24px #00000029',
            borderRadius: '4px',
            opacity: '1',
            minWidth: '900px',
            minHeight: '100px'
        },

        submitButton:
        {
            backgroundColor: '#14AFF1',
            background: 'transparent 0% 0 % no - repeat padding- box',
            borderRadius: '10px',
            opacity: '1'
        }
        ,

        root:
        {
            '& .MuiFormControl-root': { // & refers to parent and .MuiFormControl-root will apply to all field 
                width: '80%',
                color: 'white',
            },
            '& .MuiInputLabel-root':
            {
                textAlign: 'left',
                opacity: '1',
            }
            ,
            '& .MuiInputLabel-asterisk':
            {
                color: 'red'
            }
        },
        errorLabel: {

            color: 'red',
            fontSize: '14px'
        },
        input: {
            height: '25px',
            width: '250px'
        },
        gridGap: {
            paddingTop: '30px'
        },
        snackRoot:
        {
            backgroundColor: '#21303B',
        }
    }

);