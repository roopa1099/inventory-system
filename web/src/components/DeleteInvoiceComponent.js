import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import { InputBase, TextField, OutlinedInput, Button, makeStyles } from '@material-ui/core';
// import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import axios from 'axios';
export default function DeleteInvoiceComponent(props)
{  

    const handleClose = () =>
    {
        props.handleDeleteClose();

    }
    
    const deleteRecords = () =>
    {
        const id=props.selectedData[0];
        
        axios.delete(`http://localhost:8190/product/${id}`)
            .then((response) => {
                console.log(response);
                alert("Record Succesfully Deleted");
                window.location.reload(true);
                handleClose();
            }, (error) => {
                console.log(error);
            });

            
    }
     const classes = useStyles();
    return(

        <div>
            <Dialog PaperProps={{
                classes: {
                    root: classes.paper
                }
            }} open = {true} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete record(s) ?</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ color: '#C0C6CA'}}>
                       You will lose your record(s) after this action. We cant recover them once you delete.

                    <br>

                    </br>
                    Are you sure you want to <span style = {{color:'red' }}> permanently delete</span> them ?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick = {deleteRecords}className = {classes.submitButton} color="primary">
                       Delete
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const useStyles = makeStyles (
    {
        paper:
        {
            backgroundColor: '#2A3E4C',
            background: 'transparent 0% 0 % no - repeat padding- box',
            boxShadow: '0px 8px 24px #00000029',
            color : 'white',
            borderRadius: '4px',
            opacity: '1',
            minWidth: '25vw',
            minHeight: '25vh'
        },

        submitButton:
        {
            backgroundColor: '#14AFF1',
            background: 'transparent 0% 0 % no - repeat padding- box',
            borderRadius: '10px',
            opacity: '1'
        }
    },
    
);