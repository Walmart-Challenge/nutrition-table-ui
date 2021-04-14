import { memo } from 'react';
import { NavBar, NutritionTable, AddDesert } from './components';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { DessertProvider } from './context/contextProvider'

import 'tachyons';

const browserHistory = createBrowserHistory();


const App = memo((): JSX.Element => (
  <Router history={browserHistory}>
    <DessertProvider>
      <NavBar  />
      <Switch>
        <Route exact path='/' render={() => <Redirect to="/nutrition" />} />
        <Route exact path='/nutrition' component={NutritionTable} />
        <Route exact path='/addDessert' component={AddDesert} />
        <Route render={() => <h1 style={{ position: 'fixed', left: '35%', top: '50%' }}>ERROR 404 Page Not Found</h1>} />
      </Switch>
    </DessertProvider>
  </Router>
));


export default App;
