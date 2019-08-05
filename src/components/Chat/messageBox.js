import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './messageBox.css'

const UploadFileButton = ({props}) => (
    <button className='message-box-button'><FontAwesomeIcon icon='plus'/></button>
)

//Add Giphy Button Here Later

//make into functional component
function InputField (props){
    return(
        <form
            className = {'submit-message-form'}
            onSubmit = {props.submitMessage}
        >
        <input type='text' value={props.outgoing} onChange={props.handleChange}/>
        </form>
    )
}

class MessageBox extends Component{
    render(){
        return(
            <div className='message-wrapper'>
                <InputField 
                    submitMessage = {this.props.submitMessage}
                    handleChange = {this.props.handleChange}
                    outgoing = {this.props.outgoing}
                />
                <UploadFileButton/>
            </div>
        )
    }
}

export default MessageBox;
