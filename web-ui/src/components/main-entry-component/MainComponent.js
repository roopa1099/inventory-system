import HeaderComponent from "../header-component/HeaderComponent";
import RenderTableComponent from "../render-table-component/RenderTableComponent";
import { SelectComponent } from "../select-component/SelectComponent"
import { useState } from "react";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { display } from "@mui/system";


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
        marginLeft:'25px',
        width: '90px'
    }
})

export default function MainComponent() {

    const styles = useStyles()

    const [selectedData, setSelectedData] = useState([]);


    const getSelectedRecord = (data) => {
        setSelectedData(data);
    }


    return (
        <div>
            <HeaderComponent />
            <div style={{ marginTop: '120px' }}>
                <div className={styles.optionDiv}>
                    <div style={{marginLeft:"5px", display:"flex"}}>
                        <div className={styles.selectComp}>
                        <SelectComponent label={'Category'}/>
                        </div>
                        <div className={styles.selectComp}>
                        <SelectComponent label={'Shelf Number'}/>
                        </div>
                        <div className={styles.selectComp}>
                        <SelectComponent label={'Vendor Link'}/>
                        </div>
                    </div>
                    <div className={styles.buttonDiv}>
                        <Button  className={styles.addButton}   variant="contained">Add &nbsp;
                        <AddIcon fontSize="small" /></Button>
                        <Button   className={styles.editButton} variant="contained" disabled={selectedData.length !== 1}>Edit &nbsp;
                        <EditIcon fontSize="small" /></Button>
                        <Button className={styles.removeButton}  variant="contained" disabled={selectedData.length !== 1}>Delete &nbsp;
                        <RemoveIcon fontSize="small" /></Button>
                    </div>
                </div>
                <hr />
                <RenderTableComponent getSelectedRecord={getSelectedRecord} />
            </div>
        </div>)

}