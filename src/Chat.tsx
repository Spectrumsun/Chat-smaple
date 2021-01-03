import React, { useState, useRef } from 'react';
import { Dispatch } from "redux"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { IChatData, ChatState } from '../types/types';
import { updateChatList } from './store/actionCreators';

import  {
  Wrapper,
  Title,
  ToggleList,
  SelectMessage,
  ChatWrapper,
  NameListContainer,
  NameList,
  Chat,
  Message,
  TextInput,
  Button
} from './styled'

const ChatComponent: React.FC = () => {
  const chatList: IChatData[] = useSelector(
    (state: ChatState) => state.chats,
    shallowEqual
  )

  const [findChat, setFindChat] = useState<string[]>([]);
  const [currentId, setCurrentId] = useState<number>(0);
  const [currentName, setCurrentName] = useState<string>('');
  const [typeMessage, setTypeMessage] = useState<string>('');
  const autoScroll = useRef<HTMLDivElement | null>(null);
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  
  const dispatch: Dispatch<any> = useDispatch();

  const openChat = (
    e: React.MouseEvent<HTMLLIElement>, 
    chat: any[],
    id: number,
    name: string,
  ) => {
    setFindChat(chat);
    setCurrentId(id)
    showSelected(e)
    setToggleSidebar(!toggleSidebar);
    setCurrentName(name)
    updateListUi();
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
        onClick={(e) => openChat(e, chatList.chat, chatList.id, chatList.name)}
      >
        {chatList.name}
      </li>
      )
    )
    }
  </NameList>
  )

  const scrollSelf = () => {
    if(autoScroll.current === null ) return;
    const scroll = autoScroll.current.scrollHeight - autoScroll.current.clientHeight;
    autoScroll.current.scrollTo(0, scroll);
  };


  const messageList = () => (
    <Message ref={autoScroll}>
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
    scrollSelf();

    // const saveArticle = React.useCallback(
    //   (article: IArticle) => dispatch(addArticle(article)),
    //   [dispatch]
    // );
  };


  const handleKeyEvent = (e:  React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === 'Enter' && !e.shiftKey && typeMessage !== ''){
      e.preventDefault();
      handleSend();
    }

    if(e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.value += '\r\n';
    }
  }

  const openList = (e: React.MouseEvent<HTMLDivElement>) => {
    setToggleSidebar(!toggleSidebar);
    updateListUi();
  }

  const updateListUi = () => {
    const fineList = document.querySelector('.name-list') as HTMLSelectElement;
    if (window.screen.width <= 700) {
      fineList.style.display = toggleSidebar ? 'block' : 'none';
    }else {
      fineList.style.display =  'block';
    }
  }


  return (
    <div style={{ marginTop: '50px' }}>
      <Wrapper>
      <Title>
      <h3>Welcome to Sun</h3>
      {
        currentName !== '' && 
        (<h4>Chatting with {currentName}</h4> )
      }
      </Title>
      <ToggleList onClick={openList}>
        <h1>☰</h1>
      </ToggleList>
  
      <ChatWrapper>
        <NameListContainer className='name-list'>
          {nameList(chatList)}
        </NameListContainer>

      {
        currentId === 0
        ? handleSelectMessage()
        : (
          <Chat>
            {messageList()}
            <div style={{ width: '95%' }}>
              <TextInput 
                value={typeMessage} 
                onChange={handleOnChange}
                onKeyPress={handleKeyEvent}
              />
            </div>
            <Button onClick={handleSend} disabled={typeMessage === ''}>
              Send ⬆︎
            </Button>
          </Chat>
        )
      }
      </ChatWrapper>
      </Wrapper>
    </div>
  );
}

export default ChatComponent;
