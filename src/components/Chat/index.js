import React from 'react';

import Chatroom from './chatroom';
import ChannelList from './channellist';

import { AuthUserContext, withAuthorization } from '../Session';

import axios from 'axios';
import io from 'socket.io-client';

class ChatPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isSidebarOpen: true,
      timestamp: 'N/A',
      incoming: [],
      outgoing: '',
      currentRoom: '1',
      intervalIsSet: null,
      currentChatLog: []
    };

    this.socket = io('localhost:8000');

    //Event Listener for receiving a new message
    this.socket.on('RECEIVE_MSG', function(msg) {
      console.log(msg)
      addMessage(msg);
    });

    //RECEIVE_MSG calls this function
    const addMessage = msg => {
      this.setState({ incoming: [...this.state.incoming, msg] });
    };

    //Event Listener for user joining new room
    this.socket.on('NEW_ROOM', function(data) {
      newRoom(data);
    });

    //NEW_ROOM calls this funciton
    const newRoom = data => {
      document.getElementById('incomingUser').innerHTML = data;
    };
  }

  getChatLogs = () => {
    axios
      .get('http://localhost:8000/chicagoChat/getChatLogs', {
        params: {
          room: this.state.currentRoom
        }
      })
      .then(response => {
        return response.data.data;
      })
      .then(res => {
        this.setState({
          currentChatLog: res
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  //toggle sidebar to show or not
  toggleSidebar = () => {
    this.setState(prevState => ({ isSidebarOpen: !prevState.isSidebarOpen }));
  };

  //emit message and set outgoing state to a blank string
  submitMessage = e => {
    e.preventDefault();

    const chatLog = {
      text: this.state.outgoing,
      room: this.state.currentRoom
    };

    axios
      .post('http://localhost:8000/chicagoChat/chatLogs', chatLog)
      .then(res => console.log(res.data));

    this.socket.emit('SEND_MSG', {
      text: this.state.outgoing,
    });
    this.setState({
      outgoing: ''
    });
  };

  //change outgoing state on every change for MessageBox Input
  handleChange = e => {
    this.setState({
      outgoing: e.target.value
    });
  };

  changeRoom = e => {
    this.setState(
      {
        currentRoom: e.target.getAttribute('room')
      },
      () => {
        this.socket.emit('CHANGE_ROOM', {
          room: this.state.currentRoom,
        });
      }
    );
  };

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser=> (
          <section className="chatApp">
          <ChannelList
            isSidebarOpen={this.props.isSidebarOpen}
            currentRoom={this.props.currentRoom}
            changeRoom={this.props.changeRoom}
          />
          <Chatroom 
            isSidebarOpen={this.state.isSidebarOpen}
            currentRoom={this.state.currentRoom}
            changeRoom={this.changeRoom}
            currentChatLog={this.state.currentChatLog}
            incoming={this.state.incoming}
            outgoing={this.state.outgoing}
            submitMessage={this.submitMessage}
            handleChange={this.handleChange}
            onToggleSidebar={this.toggleSidebar}
            getChatLogs={this.getChatLogs}
          />
        </section>
        )}
      </AuthUserContext.Consumer>
    )
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ChatPage)