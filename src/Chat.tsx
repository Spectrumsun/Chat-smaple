import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Dispatch } from "redux"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { IChatData, ChatState } from '../types/types';
import { updateChatList } from './store/actionCreators';

const ChatComponent  = () => {
  const chatList: IChatData[] = useSelector(
    (state: ChatState) => state.chats,
    shallowEqual
  )

  const [findChat, setFindChat] = useState<string[]>([]);
  const [currentId, setCurrentId] = useState<number>(0);
  const [typeMessage, setTypeMessage] = useState<string>('');

  
  const dispatch: Dispatch<any> = useDispatch();

  const openChat = (
    e: React.MouseEvent<HTMLLIElement>, 
    chat: any[],
    id: number
  ) => {
    setFindChat(chat);
    setCurrentId(id)
    showSelected(e)
  }

  const showSelected = (e: React.MouseEvent<HTMLLIElement>) => {
    const li = Array.from(document.querySelectorAll('.list'));
    li.forEach(element => {
      if(element.id === e.currentTarget.id) {
        element.classList.add('add-background');
      }else {
        element.classList.remove('add-background');
      }
    });
  }

  const nameList = (list: IChatData[]) => (
    <NameList id="list">
    {
      list.map((chatList) => (
      <li
        className="list"
        key={chatList.id}
        id={`id-${chatList.id}`}
        onClick={(e) => openChat(e, chatList.chat, chatList.id)}
      >
        {chatList.name}
      </li>
      )
    )
    }
  </NameList>
  )

  const messageList = () => (
    <Message>
      <div>
        {findChat.map((chat, key) => <p key={key}>{chat}</p>)}
      </div>
    </Message>
  )

  const handleSelectMessage = () => (
    <SelectMessage> 
      Select a user from the list to view and send messages 
    </SelectMessage>
  ) 

  const handleOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
    ) => setTypeMessage(e.target.value)

  const handleSend = () => {
    dispatch(updateChatList(typeMessage, currentId))
    setTypeMessage('');
  };


  const handleKeyEvent = (e:  React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === 'Enter' && !e.shiftKey && typeMessage !== ''){
      handleSend();
    }

    if(e.shiftKey && e.key === 'Enter') {
      e.currentTarget.value += '\r\n';
    }
  }

  return (
    <div style={{ marginTop: '50px' }}>
      <Wrapper>
      <h3>Welcome to Sun</h3>
      <ChatWrapper>
        <div style={{ overflowY: 'scroll', height: '500px' }}>
          {nameList(chatList)}
        </div>

      {
        findChat.length === 0
        ? handleSelectMessage()
        : (
          <Chat>
            {messageList()}
            <TextInput 
              value={typeMessage} 
              onChange={handleOnChange}
              onKeyPress={handleKeyEvent}
            />
            <Button onClick={handleSend} disabled={typeMessage === ''}>
              Send 
            </Button>
          </Chat>
        )
      }
      </ChatWrapper>
      </Wrapper>
    </div>
  );
}


const Wrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  padding: 50px;
  box-shadow: 0 0 6px 3px #999;
`

const SelectMessage = styled.p`
  text-align: center;
  display: flex;
  align-items: center;
`;


const ChatWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 6px 3px #F6F6F6;
`;

const NameList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .add-background {
    background: #42A5F5;
  }

  .remove-background {
    background: #F6F6F6;
  }
  
  li {
    list-style-type: none;
    background: #F6F6F6;
    padding: 10px 30px;
    margin-bottom: 10px;
    font-size: 20px;
    cursor: pointer;
    text-align: center;
  }

  li:hover {
    background: #42A5F5;
  }
`

const Chat = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  justify-content: space-around;
  align-items: flex-end;
  padding: 10px;
  box-shadow: 0 0 6px 3px #F6F6F6;
`;

const Message = styled.div`
  text-align: right;
  width: 80%;
  overflow: auto;
  height: 250px;
  display: flex;
  flex-direction: column-reverse;
  p {
    padding: 10px;
    border: 1px solid #191919;
    background: #F6F6F6;
    border-radius: 5px;
  }
`;

const TextInput = styled.textarea`
  resize:none;
  height: 110px;
  width: 550px;
  border: 1px solid #191919;
  border-radius: 5px;
  padding: 10px;
`;


const Button = styled.button`
  padding: 10px 33px 10px 10px;
  border: 0px;
  background: #42A5F5;
  color: white;
  font-size: 30px;
  cursor: pointer;
`;

export default ChatComponent;
