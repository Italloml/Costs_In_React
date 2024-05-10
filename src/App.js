import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './Components/pages/Home';
import Company from './Components/pages/Company';
import Contact from './Components/pages/Contact';
import NewProject from './Components/pages/NewProject';

import Container from './Components/layout/Container';


function App() {
  return (
    <Router>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/company'>Empresa</Link>
        <Link to='/contact'>Contato</Link>
        <Link to='/newproject'>Novo Projeto</Link>
      </div>
      <Switch>
        <Container customClass='min-height'>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/company'>
            <Company />
          </Route>
          <Route exact path='/contact'>
            <Contact />
          </Route>
          <Route exact path='/newproject'>
            <NewProject /> 
          </Route>
        </Container>
      </Switch>
      <p>Footer</p>
    </Router>
  );
}

export default App;
