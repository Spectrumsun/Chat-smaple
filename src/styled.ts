import styled from 'styled-components';


export const Wrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  padding: 50px;
  box-shadow: 0 0 6px 3px #999;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 700px) {
    flex-direction: column;
  } 
`;

export const ToggleList = styled.div`
  display: block;
  @media screen and (min-width: 700px) {
    display: none;
  }
`

export const SelectMessage = styled.p`
  text-align: center;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;

`;


export const ChatWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 6px 3px #F6F6F6;
  position: relative;
  height: 500px;
`;

export const NameListContainer = styled.div`
  overflow-Y: scroll; 
  height: 500px;

  @media screen and (min-width: 700px) {
    display: block;
  } 

  @media screen and (max-width: 700px) {
    display: none;
    position: absolute;
    z-index: 1;
    right: 0px;
    left: 0px;
    background: #ffffff;
  } 
`

export const NameList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 10px;
  .add-background {
    background: #42A5F5;
    font-weight: bold;
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
    font-weight: bold;
  }

  li:active { 
    transform: scale(0.99); 
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24); 

  } 
}
`

export const Chat = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
  align-items: flex-end;
  padding: 10px;
  box-shadow: 0 0 6px 3px #F6F6F6;

  @media screen and (max-width: 700px) {
    width: 100%;
  } 
`;

export const Message = styled.div`
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
    display: block;
    overflow-wrap: anywhere;
  }
`;

export const TextInput = styled.textarea`
  resize:none;
  height: 110px;
  border: 1px solid #191919;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;	
  width: 100%;
`;


export const Button = styled.button`
  padding: 10px;
  border: 0px;
  background: #42A5F5;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;


