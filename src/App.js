import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Components/pages/Home';
import Company from './Components/pages/Company';
import Contact from './Components/pages/Contact';
import NewProject from './Components/pages/NewProject';
import Projects from './Components/pages/Projects';

import Container from './Components/layout/Container';
import Navbar from './Components/layout/Navbar';
import Footer from './Components/layout/Footer'



function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Container customClass='min-height'>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/projects'>
            <Projects />
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
      <Footer />
    </Router>
  );
}

export default App;
