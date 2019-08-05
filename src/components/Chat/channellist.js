import React, { Component } from 'react';
import './channellist.css';

//make into functional component
class ChannelList extends Component {
    render(){
        return(
            <aside className={this.props.isSidebarOpen === true ? 'channel-wrapper' : 'closed'}>
                <ul>
                    <li room='1' onClick={this.props.changeRoom}>Room 1</li>
                    <li room='2' onClick={this.props.changeRoom}>Room 2</li>
                    <li room='3' onClick={this.props.changeRoom}>Room 3</li>
                    <li room='4' onClick={this.props.changeRoom}>Room 4</li>
                    <li room='5' onClick={this.props.changeRoom}>Room 5</li>
                </ul>
            </aside>
        )
    }
}

export default ChannelList