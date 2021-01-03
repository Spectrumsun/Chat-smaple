import React from 'react';
import { createStore, Store } from "redux"
import { Provider } from "react-redux"
import ChatComponent from './Chat';
import reducer from './store/reducer';
import { ChatState, UpdateChatAction, DispatchType } from '../types/types'


const store: Store<ChatState, UpdateChatAction> & { dispatch: DispatchType } = createStore(reducer)

const App = ()  => {
  return (
    <Provider store={store}>
    <div>
      <ChatComponent />
    </div>
    </Provider>
  );
}

export default App;
