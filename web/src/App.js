import React, {useEffect} from 'react';

import theme from '../src/utils/theme';
import './App.css';
import { makeStyles } from '@material-ui/core';
import CollectorDashboard from '../src/views/CollectorDashboard';
import MainComponent from '../src/components/MainComponent';
import Header from '../src/components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ROLL_NUMBER } from '../src/utils/constants';


const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
      height: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#6D718',
      outline: '1px solid slategrey',
    },
  },
  mainBackground: {
    // background: theme.palette.primary.main,
    backgroundColor: '#58687E',
    height: '2000vh',
    width: 'auto',
    overflow: 'hidden',
  },
  root: {
    flexGrow: 1,
  },
  // paper: {
  //   height: 140,
  //   width: 100,
  // },
}));
const App = () => {
  console.log('theme', theme);
  const classes = useStyles();
  return (
    <div>
      <Header />
      <Router basename={`/${ROLL_NUMBER}`}>
        <Route exact path="/" component={CollectorDashboard} /> 
      </Router>
    </div>
  );
};

export default App;
