import React, { useState, useEffect } from 'react';
import theme, { pxToVh } from '../utils/theme';
import axios from "axios";
import { InputLabel, makeStyles, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { InputBase, TextField, OutlinedInput, Button } from '@material-ui/core';
import RenderTableComponent from '../components/RenderTableComponent';
import AddInvoiceComponent from '../components/AddInvoiceComponent';
import DeleteInvoiceComponent from '../components/DeleteInvoiceComponent';
import EditInvoiceComponent from '../components/EditInvoiceComponent';
import ViewCorrespondanceTemplate from '../components/ViewCoresspondanceTemplate';
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import SearchInvoiceComponent from '../components/SearchInvoiceComponent';
export default function CollectorDashboard(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isViewCorrespondenceOpen, setViewCorrespondance] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchItem, setSearchItem] = useState("");
    const [responseData, setResponseData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [isNextPage, setNext] = useState(true);
    const [fieldName, setFieldName] = useState("id");
    const [orderBy, setOrderBy] = useState("asc");
    const [sortUpdated,setSortUpdated]=useState(false);
    const [firstTime,setFirstTime]=useState(false);
    const select="Select";



    const getResposeData = async ({ fieldNameArg, orderByArg, pageCountArg }) => {
        const response = await axios.get(`http://localhost:8190/products`, {
            params: {
                sortBy: orderByArg,
                fieldName: fieldNameArg,
                pageNumber: pageCountArg,
                pageSize: 5

            }
        });
        setSortUpdated(false);
        setFirstTime(true);
        if (response.data.content.length > 0) {
            setResponseData([...response.data.content]);
        }
        else {
            setNext(false);
        }
    }


    useEffect(() => {
       
        if(!firstTime || sortUpdated){
            getResposeData({ fieldNameArg: fieldName, orderByArg: orderBy, pageCountArg:pageCount });
        }
        
       
        
    }, [sortUpdated,firstTime]);

    const handleClose = () => {
        setOpen(false);
    };

    const addProductRecord = () => {
        setOpen(true);
    }

    const handleClickDeleteButton = () => {
        setIsDeleteOpen(true);
        console.log(selectedData);
    }
    const handleClickEditButton = () => {
        setIsEditOpen(true);
    }
    const getSelectedRecord = (data) => {
        setSelectedData(data);
    }

    const closeDeleteButton = () => {
        setIsDeleteOpen(false);
    }

    const closeEditButton = () => {
        setIsEditOpen(false);
    }

    const handleSort=(event)=>{
        setSortUpdated(true);
    }

    const handleViewClose = () => {
        setViewCorrespondance(false);
    }

    const onNextClick = () => {
        setPageCount(pageCount + 1);
        getResposeData({ fieldNameArg: fieldName, orderByArg: orderBy, pageCountArg:pageCount+1 });
    }

    const onPrevClick = () => {
        setPageCount(pageCount - 1);
        getResposeData({ fieldNameArg: fieldName, orderByArg: orderBy, pageCountArg:pageCount-1 });
    }

    const onChangeEvent = (event) => {
        setIsSearching(true);
        setSearchItem(event.target.value);

    }
    const handleIsSearching = (value) => {
        setIsSearching(value);
    }

    const onSelectField = (event) => {
        setFieldName(event.target.value);
        getResposeData({ fieldNameArg: event.target.value, orderByArg: orderBy, pageCountArg:pageCount });
    }

    const onOrderBy = (event) => {
        setOrderBy(event.target.value);
        getResposeData({ fieldNameArg: fieldName, orderByArg: event.target.value,  pageCountArg:pageCount });
    }

    return (
        <div className={classes.mainDashboard} >
            <Grid container direction="column" className={classes.mainGrid}>
                <Grid item xs={12}>
                    <Typography style={{ color: 'white', paddingLeft: '3px' }}>
                        Product List
                    </Typography>
                    <br></br>
                    <Grid item xs={12}>
                        <Paper sm={12} elevation={3} className={classes.gridPaper}>
                            <Grid container alignItems="center" justify="space-between">

                                <Grid item display="flex" alignItem="center" >

                                    <Grid container justifyContent='space-between' className={classes.root}>

                                        <Button onClick={addProductRecord} variant="outlined"
                                            style={{
                                                color: '#FFFFFF',
                                                borderColor: '#14AFF1',
                                                color: 'white'
                                            }}> <AddIcon fontSize="small" /> Add </Button>

                                        <Button onClick={handleClickEditButton} disabled={selectedData.length !== 1} variant="outlined" style={{
                                            borderColor: selectedData.length != 1 ? '#97A1A9' : '#14AFF1',
                                            color: selectedData.length != 1 ? '#97A1A9' : 'white',
                                        }}> <EditIcon fontSize="small" />Edit</Button>

                                        <Button disabled={selectedData.length === 0} style={{
                                            borderColor: selectedData.length !== 0 ? '#14AFF1' : '#97A1A9',
                                            color: selectedData.length !== 0 ? 'white' : '#97A1A9',
                                        }} onClick={handleClickDeleteButton} variant="outlined">  <RemoveIcon fontSize="small" />Delete </Button>
                                        {/* <select className={classes.select} onChange={onSelectField}>
                                            <option value="" disabled selected>Select</option>
                                            <option value="vendorLink">Vendor</option>
                                            <option value="pricePerUnit">Price</option>
                                            <option value="category">Category</option>
                                        </select>

                                        <select className={classes.select} onChange={onOrderBy}>
                                            <option value="asc">Asc</option>
                                            <option value="desc">Desc</option>
                                        </select> */}

                                    </Grid>
                                </Grid>
                                <Grid item style={{ display: "flex" }} className={classes.root}>
                                    <Button variant="outlined" disabled={pageCount <= 0} onClick={onPrevClick} style={{
                                        borderColor: '#97A1A9',
                                        color: '#97A1A9',
                                    }}>Previous </Button>
                                    <Button onClick={onNextClick} variant="outlined" disabled={responseData.length == 0 && !!isNextPage} style={{
                                        borderColor: '#97A1A9',
                                        color: '#97A1A9',

                                    }}>Next </Button>
                                    <Paper component="form" className={classes.searchpaper} >
                                        <InputBase className={classes.input} placeholder="Search by Product Name"
                                            onChange={(event) => {
                                                onChangeEvent(event);
                                            }}
                                            inputProps={{ 'aria-label': 'Search by Invoice Number', size: 'small', color: 'primary' }} />
                                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                            <SearchIcon color="primary" fontSize="small" />
                                        </IconButton>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Grid style={{ paddingTop: '20px' }} >
                                {
                                    open == true && (<AddInvoiceComponent handleCloseProp={handleClose} />)
                                }
                                {
                                    isDeleteOpen == true && (<DeleteInvoiceComponent selectedData={selectedData} handleDeleteClose={closeDeleteButton} />)
                                }
                                {
                                    isEditOpen == true && (<EditInvoiceComponent selectedData={selectedData} handleEditClose={closeEditButton} />)
                                }
                                {
                                    isViewCorrespondenceOpen == true && (<ViewCorrespondanceTemplate selectedData={selectedData} handleViewClose={handleViewClose} />)
                                }
                                {
                                    (!isSearching || searchItem === '') && <RenderTableComponent orderBy={setOrderBy} sortBy={setFieldName} sort={setSortUpdated} responseData={responseData} getSelectedRecord={getSelectedRecord} />
                                }
                                {
                                    (isSearching && !searchItem == '') && <SearchInvoiceComponent searchItem={searchItem}
                                        handleIsSearching={handleIsSearching} selectedData={selectedData} getSelectedRecord={getSelectedRecord} />
                                }
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );

}

const useStyles = makeStyles({
    mainDashboard: {
        top: '0px',
        left: '0px',
        width: '100vw',
        height: '100vh',
        background: 'transparent radial-gradient(closest-side at 50% 50%, #58687E 0%, #39495E 100%) 0% 0% no-repeat padding-box',
        opacity: '1'
    },
    loadSearch: {
        display: 'flex',
        width: 'vw',
        border: '1px solid  #97A1A9',
        backgroundColor: '#273D49CC',
        background: '#273D49CC 0% 0 % no - repeat padding- box'
    },
    searchpaper: {
        marginTop: '10px',
        backgroundColor: theme.palette.primary.dark,
        height: '30px',
        marginLeft: theme.spacing(1),
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
    select: {
        color: '#97A1A9',
        width: '95px',
        /* margin: 3px; */
        marginTop: '11px',
        borderRadius: '6px',
        backgroundColor: theme.palette.primary.light,
        marginLeft: '18px',
        border:'1px solid'
    },
    input:
    {
        color: '#97A1A9',
    },
    panelHeader:
    {
        position: 'relative',
        top: '20px',
        left: '10px'
    },
    mainGrid:
    {
        position: 'absolute',
        top: '100px',
        left: '30px',
        width: '141px',
        height: '31px',
    },
    gridPaper:
    {
        top: '162px',
        left: '30px',
        width: '95vw',
        height: '70vh',
        backgroundColor: theme.palette.primary.light,
    },
    root:
    {
        '& .MuiButton-root':
        {
            marginTop: '10px',
            marginLeft: '20px',
            border: '1px solid 97A1A9#',
            borderRadius: '10px',
            opacity: '1',
            textAlign: 'left',
            letterSpacing: '0px',
            textTransform: 'none',
            color: '#97A1A9',
            opacity: '1',
            '&:hover': {
                backgroundColor: '#14AFF1',
                borderColor: '#14AFF1',
                color: 'white',
            },
        }
    }

}
)
    ;
