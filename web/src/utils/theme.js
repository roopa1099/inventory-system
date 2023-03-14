import { createMuiTheme } from '@material-ui/core/styles';


export const pxToRem = px => `${px / 22.5}rem`;
export const pxToVw = px =>
  `${(100 / document.documentElement.clientWidth) * px}vw`;

export const pxToVh = px =>
  `${px / (document.documentElement.clientHeight * 0.01)}vh`;

export default createMuiTheme({
  palette: {
    primary: {
      main: '#58687E',
      light: '#273D49CC',
      dark: '#283A46'
    }
  },

  overrides: {
    MuiTableCell: {
      head:
      {
        margin: 0,
        paddingLeft:'0.2px',
        color : 'white',
        borderBottom: '1px solid #283A46',
        background: "#283A46",
        fontWeight: 'bolder',
        color: "#97A1A9",
        fontSize: '0.72rem',
      },
      body: {
       color : 'white',
        fontSize: '0.80rem',
        borderBottom: 'none',
        // padding:'2px'
      }
    },
   
    MuiMenu: { // For ListItem, change this to MuiListItem
      
      list: {
              // this is to refer to the prop provided by M-UI
        backgroundColor: "#283A46", // updated backgroundColor
        background: 'transparent 0% 0 % no - repeat padding- box',
        border: '1px solid #14AFF1',
        opacity: '1',
        color:'white'
        },
      },
    
  },
  

});
