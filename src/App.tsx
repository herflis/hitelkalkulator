import * as React from 'react';
import { connect } from 'react-redux';
import './App.css';
import LTPForm from './LTPForm';
import Grid from 'material-ui/Grid';
import HomeLoanForm from './HomeLoanForm';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import lightBlue from 'material-ui/colors/lightBlue';
import pink from 'material-ui/colors/pink';

const muiTheme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: pink
  }
});

export interface AppProps {
}

export interface AppState {
}

class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MuiThemeProvider theme={muiTheme}>
        <div className="App">
          <Grid container={true} spacing={24}>
            <Grid item={true} xs={12} sm={3}>
              <LTPForm />
            </Grid>
            <Grid item={true} xs={12} sm={9}>
              <HomeLoanForm />
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state, match) => {
  return {
  };
};

export default connect(mapStateToProps, {
})(App);