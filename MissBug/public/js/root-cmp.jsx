const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

import { Home } from "./pages/home.jsx";
import { BugDetails } from "./pages/bug-details.jsx";
import { UserDetails } from "./pages/user-details.jsx";

export function App() {
  return(
<Router>
        <Switch>
          <Route path="/user/:userId" component={UserDetails} />
          <Route path="/bug/:bugId" component={BugDetails} />
          <Route path="/" component={Home} />
        </Switch>
    </Router>

  )  

}
