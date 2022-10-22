const { Route, Link } = ReactRouterDOM;

import { bugService } from "../services/missbug.service.js";
import { userService } from "../services/user-service.js";
import { BugList } from "../cmps/BugList.jsx";
import { LoginSignup } from "../cmps/login-signup.jsx";
import { UserDetails } from "./user-details.jsx";
import { BugDetails } from "../pages/bug-details.jsx";

export class Home extends React.Component {
  state = {
    bugs: [],
    user: null,
    isAddBug: false,
    bug: null,
  };

  componentDidMount() {
    const user = userService.getLoggedinUser();
    this.setState({ user });

    bugService.query().then((bugs) => {
      console.log("bugs from server:", bugs);
      this.setState({ bugs });
    });
  }

  handleChange = (ev) => {
    ev.preventDefault()
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState({ bug: { ...this.state.bug, [field]: value } });
    console.log(this.state.bug);
  };

  onRemoveBug = (bugId) => {
    bugService.remove(bugId).then(() => {
      console.log("Deleted Succesfully!");
      let { bugs } = this.state;
      bugs = bugs.filter((bug) => bug._id !== bugId);
      this.setState({ bugs });
    });
  };

  onEditBug = (bug) => {
    const bugToSave = { ...bug };
    bugService.update(bugToSave).then((savedBug) => {
      console.log("Updated bug:", savedBug);
      const bugs = this.state.bugs.map((currBug) =>
        currBug._id === savedBug._id ? savedBug : currBug
      );
      this.setState({ bugs });
    });
  };
  onLogin = (credentials) => {
    userService.login(credentials).then((user) => this.setState({ user }));
  };
  onSignup = (credentials) => {
    userService.signup(credentials).then((user) => this.setState({ user }));
  };
  onLogout = () => {
    userService.logout().then(() => this.setState({ user: null }));
  };

  onBtnAddbug = () => {
    this.setState({ isAddBug: true });
  };
  onSubmit = (ev) => {
    ev.preventDefault();
    console.log('check');
  }
  onAddbug = (ev = null) => {
    ev.preventDefault();

    console.log('add bug func');
    console.log(this.state.bug.bug);
    bugService
      .add({
        description: this.state.bug.bug,
        severity: 2,
        name: "there is a problem here!",
       
      })
      .then((savedbug) => {
        // this.setState({ bugs: [savedBug, ...this.state.bugs] });
        console.log("Added bug", savedbug);
      });
  };

  render() {
    const { bugs, user } = this.state;
    console.log(bugs);

    return (
      <section>
        <div>
          <header>
            {user && (
              <Link onClick={this.getCurrUser} to={`/user/${user._id}`}>
                profile
              </Link>
            )}
            <h1>Miss Bug</h1>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg"
              alt=""
            />
            {user && (
              <section className="user-info">
                <pre>{JSON.stringify(user)}</pre>
                <button onClick={this.onLogout}>Logout</button>
              </section>
            )}
            {!user && (
              <section className="user-info">
                <LoginSignup onLogin={this.onLogin} onSignup={this.onSignup} />
              </section>
            )}
          </header>

          <section className="add">
            {this.state.isAddBug &&
              <form onSubmit={this.onAddbug}>
                <input
                  onChange={(event) => this.handleChange(event)}
                  type="text"
                  name="bug"
                  id="txt"
                  placeholder="bug"
                />
                <button>send</button>
              </form>}

            <BugList
              key="bugs"
              bugs={bugs}
              onRemoveBug={this.onRemoveBug}
              onEditBug={this.onEditBug}
            />
            <button onClick={this.onBtnAddbug}>Add Bug</button>
          </section>
        </div>

        <Route path="/user/:userId" component={UserDetails} />
        <Route path="/bug/:bugId" component={BugDetails} />
      </section>
    );
  }
}
