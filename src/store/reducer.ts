import * as actionTypes from "./actionTypes"
import { ChatState, UpdateChatAction, IChatData } from '../../types/types';
import data from '../../src/utils/data';

const initialState: ChatState = {
  chats: data,
}

const reducer = ( state: ChatState = initialState,  action: UpdateChatAction ): ChatState => {
  switch (action.type) {
    case actionTypes.ADD_CHAT:
      const chatCopy: IChatData[] = [...state.chats];
      const currentChat = chatCopy.filter((chat: IChatData) => chat.id === action.currentId);
      const existingChat = chatCopy.filter((chat: IChatData) => chat.id !== action.currentId);
      currentChat[0].chat.push(action.typeMessage);
      existingChat.unshift(currentChat[0]);
      return { 
        ...state,
        chats: existingChat,
        
      }
  }
  return state
}

export default reducer