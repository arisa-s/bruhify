/*global chrome*/
import './App.css';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[300],
    '&$checked': {
      color: purple[500],
    },
    '&$checked + $track': {
      backgroundColor: purple[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

function App() {
  const [isBruh, setIsBruh] = React.useState(false)

  const onBruh = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {isBruh: !isBruh}, () => null);
    });
    setIsBruh(!isBruh)
  }
  return (
    <div className="App">
        <FormControlLabel
        control={<PurpleSwitch checked={isBruh} onChange={onBruh} name="bruhSwitch" />}
        label="Bruhify contents"
      />
    </div>
  );
}

export default App;

