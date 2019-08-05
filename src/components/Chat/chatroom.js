import React, { Component } from 'react';
import './chatroom.css';
import MessageBox from './messageBox.js';

//make into functional component
class ToggleSidebarButton extends Component {
  render() {
    return (
      <button type='button' onClick={this.props.onToggleSidebar}>
        Click
      </button>
    );
  }
}

//make into functional component
class IncomingMessage extends Component {
  componentDidMount() {
    this.props.getChatLogs();
  }

  render() {
    return (
      <section className='incoming-messages-wrapper'>
        <ul id='incomingWrapper'>
          {this.props.currentChatLog.map(message => {
            return (
              <li>
                <strong>{message.from}</strong>: {message.text}
              </li>
            );
          })}
          {this.props.incoming.map(incoming => {
            return (
              <li>
                <strong>{incoming.from}</strong>: {incoming.text}
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

//make into functional component
class ChatroomHeader extends Component {
  render() {
    return (
      <header className='chatroom-header'>
        <ToggleSidebarButton onToggleSidebar={this.props.onToggleSidebar} />
      </header>
    );
  }
}

//make into functional component
class Chatroom extends Component {
  render() {
    return (
      <section className='chatroom-wrapper'>
        <ChatroomHeader onToggleSidebar={this.props.onToggleSidebar} />
        <IncomingMessage
          incoming={this.props.incoming}
          currentChatLog={this.props.currentChatLog}
          getChatLogs={this.props.getChatLogs}
        />
        <span id='incomingUser' className='incomingUser' />
        <MessageBox
          outgoing={this.props.outgoing}
          submitMessage={this.props.submitMessage}
          handleChange={this.props.handleChange}
        />
      </section>
    );
  }
}

export default Chatroom;
