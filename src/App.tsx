import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import Modal from 'react-modal';
import { TransactionsTable } from "./components/TransactionsTable";
import Notifications, {notify} from 'react-notify-toast';


Modal.setAppElement('#root');

export function App() {

 

  return (  
      <>
      <Notifications />
      <Header  />
      <TransactionsTable  />
      <GlobalStyle/>
      </>
  );
}

