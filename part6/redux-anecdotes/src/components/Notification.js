/* import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log(notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 2
  }
  return (
    <div>
     {notification ? 
     <div style={style}>{notification}</div> 
     : null}
     </div>
  ) 
}

export default Notification */

//Using connect
import { connect } from "react-redux";
const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div>
     {props.notification ? 
     <div style={style}>{props.notification}</div> 
     : null}
     </div>
  )

}
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}
const mapDispatchToProps = null
const ConnectedMessages = connect(mapStateToProps, mapDispatchToProps)(Notification);
 export default ConnectedMessages