import { userService } from "../services/user-service.js"

export function UserDetails(){
return(
    <div>
    <h1>Hi {userService.getLoggedinUser().username}</h1>
    <h4>your details:  </h4>
      <p>User name: {userService.getLoggedinUser().username}</p> 
  <p>Full name:{userService.getLoggedinUser().fullname}</p>
  <p>Id:{userService.getLoggedinUser()._id}</p>
    </div>
)
}