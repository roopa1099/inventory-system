import { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Checkbox } from '@material-ui/core';
import DebouncingComponent from './DebouncingComponent';
import { color } from "@mui/system";

const useStyles = makeStyles({
    noBalance: {
       color:'#C0392B'
    },
    lessBalance: {
       color:'#F1C40F'
    }
})

export default function RenderTableComponent(props) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [responseData, setResponseData] = useState([]);
    const [selected, setSelected] = useState([]);
    const [totalElement, setTotalElements] = useState(0);
    const [currentOrder,setCurrentOrder]=useState({fieldName:"id",ascOrder:true});
    const [searchData,setSearchData]=useState([]);
    const [searchValue, setSearchValue]=useState("");

    const debouncedSearchCategory = DebouncingComponent(props.searchCategory, 1500);
    const debouncedSearchPrice = DebouncingComponent(props.searchPrice, 1500);
    const debouncedSearchVendorLink = DebouncingComponent(props.searchVendorLink, 1500);
    const debouncedSearchItem=DebouncingComponent(props.searchValue, 1500);

    const columns = [
        { id: 'id', label: 'Product ID', minWidth: 170 },
        { id: 'productName', label: 'Product Name', minWidth: 100 },
        {
            id: 'category',
            label: 'Category',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'shelfNumber',
            label: 'Shelf Number',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'pricePerUnit',
            label: 'Price/Unit',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'quantity',
            label: 'Quantity',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'vendorLink',
            label: 'Vendor Link',
            minWidth: 170,
            align: 'right',
        }
    ];



    const isSelected = (name) => selected.indexOf(name) !== -1;

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        if(props.searchValue!=""){
            const startIndex=newPage*10
            const endIndex=startIndex+10;
            const responseData=searchData.slice(startIndex,endIndex);
            setResponseData([...responseData]);
        }
    };

    const getResposeData = async ({ pageNumber }) => {
      
        const orderBy=currentOrder.ascOrder?'asc':'desc';
        const searchCat=debouncedSearchCategory==""?null:debouncedSearchCategory;
        const searchPrice=debouncedSearchPrice;
        const searchVendorLink=debouncedSearchVendorLink==""?null:debouncedSearchVendorLink;
        const json={
                pagination: {
                    pageNumber: pageNumber,
                    pageSize: 10
                },
                sortBy: {
                    field: currentOrder.fieldName,
                    descending: !currentOrder.ascOrder
                },
                filterBy: {
                    category: searchCat,
                    pricePerUnit: searchPrice,
                    vendorLink: searchVendorLink
                }
        }
        var data = JSON.parse(JSON.stringify(json))
        const response = await axios.post(`http://localhost:8290/products`,data);

        setResponseData([...response.data.content]);
        setTotalElements(response.data.totalElements);
    }

    const handleHeaderClick=(event)=>{
        let orderNow="asc";
        const fieldName=event.target.id;
        if(currentOrder.fieldName==fieldName){
           setCurrentOrder({fieldName:fieldName,ascOrder:!currentOrder.ascOrder});
        }
        else{
            setCurrentOrder({fieldName:fieldName,ascOrder:true});
        }   

    }


    const isBalanceAvailable =(capacity) => capacity > 5;

    const isEmpty = (capacity) => {
        console.log(capacity == 0);
        return capacity == 0
    };

    const getSearchResponse=async ()=>{
        const searchedData= await axios.get(`http://localhost:8290/product/find/${props.searchValue}`);
        setSearchValue(props.searchValue);
        setSearchData([...searchedData.data]);
        if(searchedData.data.length>0){
            const responseData=searchedData.data.slice(0,10);
            setResponseData([...responseData]);
        }
        else{
            setResponseData([]);
        }
    
        setTotalElements(searchedData.data.length);
    }

    useEffect(() => {
        if(props.searchValue==""){
           getResposeData({ pageNumber: page });
           setSearchValue(props.searchValue);
        }
        else if(props.searchValue!=searchValue){
            getSearchResponse();
        }

    }, [page,currentOrder,debouncedSearchCategory,debouncedSearchPrice,debouncedSearchVendorLink,props.searchValue]);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: '800px' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>

                        <TableRow>
                            <TableCell width="100px"></TableCell>
                            {columns.map((column) => (
                                <TableCell
                                    id={column.id}
                                    onClick={handleHeaderClick}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, fontSize: '15px'  }}
                                >
                                    {column.label}
                                    {column.id==currentOrder.fieldName && currentOrder.ascOrder?
                                    <ArrowDownwardIcon fontSize="small"/>:""
                                    }
                                
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {responseData.map((column) => {
                            const isItemSelected = selected.length == column.length || isSelected(column.id);
                            return (

                                <TableRow hover role="checkbox" tabIndex={-1} key={column.id.toString()}>
                                    <TableCell><Checkbox
                                        id={column.id.toString()}
                                        onChange={(event) => handleClick(event, column.id)}
                                        checked={isItemSelected}
                                        disabled={selected.length > 0 && !isItemSelected}
                                    />
                                    </TableCell>
                                    <TableCell width='170px'>{column.id}</TableCell>
                                    <TableCell width='100px'>{column.productName}</TableCell>
                                    <TableCell align='right' width='170px'>{column.category}</TableCell>
                                    <TableCell align='right' width='170px'>{column.shelfNumber}</TableCell>
                                    <TableCell align='right' width='170px'>{column.pricePerUnit}</TableCell>
                                    {isBalanceAvailable(column.avlSpaceForShelf) && <TableCell align="right" style={{width: '12px'}}>{column.quantity}</TableCell>}
                                    {!isBalanceAvailable(column.avlSpaceForShelf) && <TableCell align="right" style={{color:isEmpty(column.avlSpaceForShelf)?"red":"rgb(216 157 24)", width: '12px'}}>{column.quantity}</TableCell>}
                                    {/* <TableCell align="right"  width='170px'>{column.quantity}</TableCell> */}
                                    <TableCell align='right' width='170px'>{column.vendorLink}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={totalElement}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={10}
            />
        </Paper>
    );
}
