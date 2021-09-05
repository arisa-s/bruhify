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
  return (
    <div className="App">
        <FormControlLabel
        control={<PurpleSwitch checked={isBruh} onChange={() => setIsBruh(!isBruh)} name="bruhSwitch" />}
        label="Bruhify contents"
      />
    </div>
  );
}

export default App;

