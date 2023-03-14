import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { Checkbox } from '@material-ui/core';





const useStyles = makeStyles((theme) => ({
    tableContainer:
    {
        maxHeight: 300
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),

    },
    table: {
        minWidth: 750,
        border: 'none',

    },
    tableBody:
    {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.primary.dark,
        },

    },
    checkBox:
    {
        color: '#97A1A9',
    },
    nobalance: {
        color: 'red'
    },
    lessBalance:
    {
        color: 'yellow'
    },
    mainCheckBox: {
        padding: '0px 10px',
        color: '#97A1A9',
        margin: '0'
    },

    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function RenderTableComponent(props) {
    const classes = useStyles();
    const [selected, setSelected] = React.useState([]);
    const [currentOrder,setCurrentOrder]=useState({fieldName:"id",ascOrder:true});
    const [orderBy,setOrderBy]=useState("asc");
    const[responseData,setResponseData]=useState(props.responseData);


    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
        props.getSelectedRecord(newSelected);
        
    };

    const isBalanceAvailable = (capacity) => capacity > 5;
    const isEmpty = (capacity) => capacity == 0;

    const handleHeaderClick=(event)=>{
        let orderNow="asc";
        const fieldName=event.target.id;
        if(currentOrder.fieldName==fieldName){
           currentOrder.ascOrder=!currentOrder.ascOrder;
        }
        else{
            currentOrder.fieldName=fieldName;
            currentOrder.ascOrder=true;
            
        }
        if(currentOrder.ascOrder){
            orderNow="asc"
        }
        else{
            orderNow="desc";
        }

       props.orderBy(orderNow);
       props.sortBy(fieldName);
       props.sort(true);
    }


    useEffect(()=>{
            setResponseData(props.responseData);
            
    },[])

    const isSelected = (name) => selected.indexOf(name) !== -1;
    return (<div>
        <TableContainer className={classes.tableContainer} id="scrollableId">
            <Table
                className={classes.table}
            >
                <TableHead >
                    <TableRow >
                        <TableCell>
                        </TableCell>
                        <TableCell id="id"  onClick={handleHeaderClick}>Product ID</TableCell>
                        <TableCell id="productName" onClick={handleHeaderClick} align="right" className={classes.cell_id}>Product Name
                        </TableCell>
                        <TableCell id="quantity" onClick={handleHeaderClick} align="right">Quantity</TableCell>
                        <TableCell id="category" onClick={handleHeaderClick} align="right">Category</TableCell>
                        <TableCell id="pricePerUnit" onClick={handleHeaderClick} align="right">Price_Per_unit</TableCell>
                        <TableCell id="shelfNumber" onClick={handleHeaderClick} align="right">Shelf Number</TableCell>
                        <TableCell align="right">Vendor Lnk</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.responseData.map((data, index) => {
                            const isItemSelected = selected.length == data.length || isSelected(data.id);
                            return (
                                <TableRow
                                    className={classes.tableBody}
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={index}
                                >
                                    <TableCell padding="checkbox" >
                                        <Checkbox
                                            className={classes.checkBox}
                                            id={data.id}
                                            onChange={(event) => handleClick(event, data.id)}
                                            checked={isItemSelected}
                                            disabled={selected.length > 0 && !isItemSelected}
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row" padding="none" >
                                        {data.id}
                                    </TableCell>
                                    <TableCell align="right">{data.productName}</TableCell>
                                    {isBalanceAvailable(data.avlSpaceForShelf) ? <TableCell align="right" >{data.quantity}</TableCell> : ""}
                                    {!isBalanceAvailable(data.avlSpaceForShelf) ? <TableCell align="right" className={isEmpty(data.avlSpaceForShelf) ? classes.nobalance : classes.lessBalance}>{data.quantity}</TableCell> : ""}
                                    <TableCell align="right">{data.category}</TableCell>
                                    <TableCell align="right">{data.pricePerUnit}</TableCell>
                                    <TableCell align="right">{data.shelfNumber}</TableCell>
                                    <TableCell align="right">{data.vendorLink}</TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>

        </TableContainer>
    </div>);
}