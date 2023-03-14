import React, { useEffect, useState } from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

import { Checkbox, CircularProgress } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    tableContainer:
    {
        maxHeight: 370
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),

    },
    table: {
        minWidth: 750,

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

export default function RenderSearchTable(props) {
    const classes = useStyles();
    const [selected, setSelected] = React.useState([]);
    const [isAllChecked, setIsAllChecked] = React.useState(false);


    useEffect(() => {
        console.log("TableComponent has rendered");
    })
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = props.responseData.map((n) => n.docId);
            setSelected(newSelecteds);
            setIsAllChecked(true);
            props.getSelectedRecord(selected);
            return;
        }
        setSelected([]);
        setIsAllChecked(false);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
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

    const isSelected = (name) => selected.indexOf(name) !== -1;
    return (<div id="otherScrollableDiv">
        <TableContainer className={classes.tableContainer} id="otherScrollableDiv">
            <Table
                className={classes.table}
            >
               <TableHead >
                    <TableRow >
                        <TableCell>
                        </TableCell>
                        <TableCell>Product ID</TableCell>
                        <TableCell align="right" className={classes.cell_id}>Product Name
                        </TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Price_Per_unit</TableCell>
                        <TableCell align="right">Shelf Number</TableCell>
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