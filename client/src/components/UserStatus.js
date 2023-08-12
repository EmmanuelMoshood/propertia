import React, {Component} from "react";


//class component
 class UserStatus extends Component{
    //initial state
    constructor(props) {
        super(props);
        this.state = {
          subscribed: false
        };
      }
    
      toggleSubscription = () => {
        this.setState(prevState => ({
          subscribed: !prevState.subscribed
        }), console.log("isSubscrided status:", this.state.subscribed));
      };
    
    
    
    render(){
        const { subscribed } = this.state;

        return (
          <div>
            <button onClick={this.toggleSubscription}>
              {subscribed ? 'Unsubscribe' : 'Subscribe'}
            </button>
            <p>You are {subscribed ? 'subscribed' : 'not subscribed'}.</p>
          </div>
        );
    }
    
}


export default UserStatus