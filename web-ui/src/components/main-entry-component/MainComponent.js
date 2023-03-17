import HeaderComponent from "../header-component/HeaderComponent";
import RenderTableComponent from "../render-table-component/RenderTableComponent";
import { SelectComponent } from "../select-component/SelectComponent"
import { useState } from "react";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import  AddProductComponent from '../add-dialog-component/AddProductComponent';
import EditProductComponent from "../edit-dialog-component/EditProductComponent";
import DeleteProductComponent from "../delete-dialog-component/DeleteProduct";
import { display } from "@mui/system";
import Input from '@material-ui/core/Input';
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from '@mui/material/InputAdornment';


const useStyles = makeStyles({
    optionDiv: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    buttonDiv: {
        marginTop:'35px',
        marginRight: '5px'
    },
    addButton:{
        marginLeft:'10px',
        color:"white",
        backgroundColor:"#64b483",
    },
    editButton:{
        marginLeft:'10px',
        color:"white",
        backgroundColor:"#2979ff",
        ":disabled": {
            backgroundColor: 'white'
          }
    },
    removeButton:{
        marginLeft:'10px',
        color:'white',
        backgroundColor:"#ba000d",
        ":disabled": {
            backgroundColor: 'white'
          }
    },
    selectComp:{
        marginLeft:'33px',
        width: '135px',
        marginTop:'37px'
    },
    input:{
        height: '26px',
        width:'153px'
    }
})

export default function MainComponent() {

    const styles = useStyles()
    const [openAdd, setAddOpen] = useState(false);
    const [openEdit, setEditOpen] = useState(false);
    const [openDelete, setDeleteOpen] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [category, setCategory]=useState("");
    const [price, setPrice]=useState(0);
    const [vendorLink, setVendorLink]=useState("");
    
    


    const getSelectedRecord = (data) => {
        setSelectedData(data);
    }


    const addProductRecord = () => {
        setAddOpen (true);
    }

    const editProductRecord = () => {
        setEditOpen (true);
    }

    const deleteProductRecord = () => {
        setDeleteOpen (true);
    }

    const handleClose = () => {
        setAddOpen(false);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const onFilterCategoryChange=(event)=>{
        setCategory(event.target.value);
    };

    const onFilterPriceChange=(event)=>{
        setPrice(event.target.value);
    }


    const onFilterVendorChange=(event)=>{
        setVendorLink(event.target.value);
    }


    return (
        <div>
            <HeaderComponent />
            <div style={{ marginTop: '120px' }}>
                <div className={styles.optionDiv}>
                    <div style={{ display:"flex"}}>
                        <div className={styles.selectComp}>
                        {/* <label>{'Category'}</label> */}
                        <input
                        placeholder="Enter to filter Category"
                        onChange={onFilterCategoryChange}
                            variant="outlined"
                            type="text"
                            name={'Category'}
                            id={'Category'}                   
                            className={styles.input}/>
                      
                        </div>
                        <div className={styles.selectComp}>
                        <input
                            placeholder="Enter to filter Price."
                            onChange={onFilterPriceChange}
                            variant="outlined"
                            type="text"
                            name={'Price'}
                            id={'Price'}
                            className={styles.input}
                        />
                        </div>
                        <div className={styles.selectComp}>
                        <input
                            placeholder="Enter to filter Vendor Link"
                            onChange={onFilterVendorChange}
                            variant="outlined"
                            type="text"
                            name={'Vendor Link'}
                            id={'Vendor Link'}
                            className={styles.input}
                        />
                        </div>
                    </div>
                    <div className={styles.buttonDiv}>
                        <Button  className={styles.addButton}  onClick={addProductRecord} variant="contained">Add &nbsp;
                        <AddIcon fontSize="small" /></Button>
                        <Button   className={styles.editButton} onClick={editProductRecord}  variant="contained" disabled={selectedData.length !== 1}>Edit &nbsp;
                        <EditIcon fontSize="small" /></Button>
                        <Button className={styles.removeButton} onClick={deleteProductRecord} variant="contained" disabled={selectedData.length !== 1}>Delete &nbsp;
                        <RemoveIcon fontSize="small" /></Button>
                    </div>
                </div>
                <hr />
                <RenderTableComponent searchCategory={category} searchVendorLink={vendorLink} searchPrice={price} getSelectedRecord={getSelectedRecord} />
            </div>
            {openAdd == true && (<AddProductComponent handleCloseProp={handleClose} />)}
            {openEdit == true && (<EditProductComponent selectedData={selectedData}  handleEditClose={handleEditClose} />)}
            {openDelete == true && (<DeleteProductComponent selectedData={selectedData}  handleDeleteClose={handleDeleteClose} />)}
        </div>)
}