import * as actionTypes from "./actionTypes"
import { ChatState, UpdateChatAction, IChatData } from '../../types/types';
import data from '../../src/utils/data';

const getDataFromStorage = () => {
  const findData = localStorage.getItem('data');
  if(findData === null) {
    localStorage.setItem('data', JSON.stringify(data));
    const getData = localStorage.getItem('data')!;
    return JSON.parse(getData);
  }else {
    return JSON.parse(findData);
  }
}

const initialState: ChatState = {
  chats: getDataFromStorage(),
}

const reducer = ( state: ChatState = initialState,  action: UpdateChatAction ): ChatState => {
  switch (action.type) {
    case actionTypes.ADD_CHAT:
      const chatCopy: IChatData[] = [...state.chats];
      const currentChat = chatCopy.filter((chat: IChatData) => chat.id === action.currentId);
      const existingChat = chatCopy.filter((chat: IChatData) => chat.id !== action.currentId);
      currentChat[0].chat.push(action.typeMessage);
      existingChat.unshift(currentChat[0]);
      localStorage.setItem('data', JSON.stringify(existingChat));
      return { 
        ...state,
        chats: existingChat,
      }
  }
  return state
}

export default reducer