// import React from 'react';
// import { Message } from './Message';

// export class MessagesPanel extends React.Component {
//     state = { input_value: '' }
//     send = () => {
//         if (this.state.input_value && this.state.input_value != '') {
//             this.props.onSendMessage(this.props.channel.id, this.state.input_value);
//             this.setState({ input_value: '' });
//         }
//     }

//     handleInput = e => {
//         this.setState({ input_value: e.target.value });
//     }

//     render() {

//         let list = <div className="no-content-message">There is no messages to show</div>;
//         if (this.props.channel && this.props.channel.messages) {
//             list = this.props.channel.messages.map(m => <Message key={m.id} id={m.id} senderName={m.senderName} text={m.text} />);
//         }

//         return (
//             <div className='messages-panel w-6/12 mx-auto mt-5'>
//                 <div className="messages-list">{list}</div>
//                 {this.props.channel &&
//                     <div className="messages-input">
//                         <label className='text-sm font-medium text-grey'>
//                         Message
//                         </label><input 
//                         className='appearance-none bg-transparent 
//                             w-full 
//                             border border-1
//                             text-gray-700 mr-3 leading-tight focus:outline-none
//                             mb-3 px-2 py-1'
//                         type="text" onChange={this.handleInput} value={this.state.input_value} />
//                         <br></br>
//                         <button className="px-4 py-1 rounded-md shadow-lg 
//                         bg-gradient-to-r from-pink-600 
//                         to-red-600 text-gray-100"
//                                 onClick={this.send}
//                                 >
//                                 <span >Submit</span>
//                             </button>
//                     </div>
//                 }
//             </div>);
//     }

// }