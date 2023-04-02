import { styled } from '@mui/material/styles';
import { InputLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';



const useStyles = makeStyles({
  optionDiv: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  selectDiv: {
    width: "120px",
    height: '40px',
    borderRadius: '6px',
    marginTop: '3px'
  },

})

export function SelectComponent(props) {
  const classes = useStyles()
  const label = props.label;

  return (
    <div style={{ marginTop: '5px' }}>
      <label>{props.label}</label>
      <input

        variant="outlined"
        type="text"
        name={props.label}
        id={props.label}
        className={classes.input}
      />
    </div>
  )
}