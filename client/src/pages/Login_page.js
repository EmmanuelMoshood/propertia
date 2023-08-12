
export default function Login() {
    return (
      <div>
        
        <form className="container col-6 mt-5">
          <fieldset>
            <legend className="text-center">LOGIN FORM</legend>
            
            <div className="form-group">
              <label for="exampleInputEmail1" className="form-label mt-4">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" fdprocessedid="cz21oq" />
              
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1" className="form-label mt-4">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" autocomplete="off" fdprocessedid="o2rlil" />
              <small id="passwordHelp" className="form-text text-muted">If you can't seem to remember your password, click <a>forgot password</a></small>
            </div>
      
 
            <button type="submit" className="btn btn-primary mt-4" fdprocessedid="hnwth">Submit</button>
          </fieldset>
        </form>
      </div>
    );
  }