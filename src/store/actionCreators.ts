import * as actionTypes from "./actionTypes"
import { UpdateChatAction } from '../../types/types';

export const updateChatList = (typeMessage: string, currentId: number)  => {
  const action: UpdateChatAction = {
    type: actionTypes.ADD_CHAT,
    typeMessage,
    currentId
  }
  return action;
}

