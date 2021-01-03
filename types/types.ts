
export interface IChatData {
    id: number;
    name: string;
    chat: string[];
}

export type ChatState = {
    chats: IChatData[]
}

export type UpdateChatAction = {
    type: string
    typeMessage: string,
    currentId: number,
}

export type DispatchType = (args: UpdateChatAction) => UpdateChatAction