import React, {useState, useEffect} from 'react';
import ReactDOMServer from 'react-dom/server';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { InputBase,InputLabel, TextField, OutlinedInput, Button, makeStyles,Grid,Paper } from '@material-ui/core';
import axios from 'axios';
import RenderViewTable from './RenderViewTable';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import  jsPDF  from "jspdf";
import Menu from '@material-ui/core/Menu';

export default function ViewCorrespondanceTemplate(props) {

    const source = {
        id: 1,
        docIds: "\"" + props.selectedData + "\""
    }
    const [responseData, setData] = useState([])
    const [listOfUser,setListOfUser] = useState([])
    const [payload, setPayload] = useState(source);
    const [template,setTemplate] = useState(1);
     
    
  
    // const toSend = JSON.stringify(source);

    useEffect(() => {console.log("i am stuck")
axios.post('http://localhost:8080/1805456/templateServlet', JSON.stringify(payload))
            .then(response => {
                setTimeout(function () {
                    setData(response.data)
                    setListOfUser(response.data.listOfUser)
                    console.log(listOfUser)
                    // setisDataLoaded(5);
                }
                    , 100
                )
            }); 
        },[payload,template])

    const handleChange = (event) =>
    {
        console.log("here 1");
        setTemplate(event.target.value);
        console.log("here 2");
        setTimeout(function () {
            setPayload({ ...payload, id: event.target.value});
        }
            , 100
        )
    }

    const downloadPdf = () =>
    {
        
        console.log(document.getElementById('headerHtml').innerHTML)
        let doc = new jsPDF('p','pt','a4')
        doc.setFontSize("11");
        // doc.setFontStyle("italic");
        // doc.text('This text is normally\raligned.', 140, 50);
        doc.html(document.getElementById('wow').innerHTML);
        setTimeout(function () {
            doc.save('test');
        }, 2000);
    }
    const handleClose = () => {
        props.handleViewClose();

    }
    const classes = useStyles();
    return (
        <div>
            <Dialog PaperProps={{
                classes: {
                    root: classes.paper
                }
            }} open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
            <Grid container direction = "row" alignItems = "center" justify = "flex-end" >
            <Grid item xs = {6}>
                <DialogTitle id="form-dialog-title">View Correspondence <span> ( {props.selectedData.length} )</span>
                </DialogTitle>
             </Grid>
                    <Grid  xs = {6}  >
                        <Grid  container direction="row" alignItems = "center" justify = "flex-end" >
                            <Grid item xs={2}>
                                <InputLabel>View : </InputLabel>
                               
                            </Grid>
                            <Grid item xs = {4}>
                                {/* <InputLabel id="demo-simple-select-filled-label">Template 1</InputLabel> */}
                                    <Select
                                        className = {classes.root}
                                        id="demo-simple-select-outlined"

                                        defaultValue = {1}
                                        value={template}
                                        onChange={handleChange}
                                        label="Template"
                                    >
                                        <MenuItem selected value={1}>Template 1</MenuItem>
                                        <MenuItem value={2}>Template 2</MenuItem>
                                    </Select>
                            </Grid>
                            </Grid>
                        </Grid>
                </Grid>         
                <DialogContent>

                    <DialogContentText style={{ color: '#C0C6CA' }}>
                       
                       <div  id = "wow">
                        <div id = "headerHtml" dangerouslySetInnerHTML={{ __html: responseData["header"] }}></div>
                       
                        <RenderViewTable responseDatas={listOfUser} />

                        <div  dangerouslySetInnerHTML={{ __html: responseData["footer"]}}></div>
                        </div>

                </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick = {downloadPdf} className={classes.submitButton} color="primary">
                        Download
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
            color: 'white',
            borderRadius: '4px',
            opacity: '1',
            minWidth: '80vw',
            minHeight: '25vh',

            
        },
        submitButton:
        {
            backgroundColor: '#14AFF1',
            background: 'transparent 0% 0 % no - repeat padding- box',
            borderRadius: '10px',
            opacity: '1'
        },
       root:
       {
           backgroundColor: "#283A46", // updated backgroundColor
           background: '#283A46 0% 0% no-repeat padding-box',
           border: '1px solid #14AFF1',
           width:'160px',
           borderRadius:'10px',
           opacity: '1',
           color:'white',
          paddingLeft : '2px'
       }
     
    }

);


