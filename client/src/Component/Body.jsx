import './Body.css'
import BodyContainer from './windowContainer/BodyContainer';
import Dock from './dock/Dock';
import HeaderBar from './headerModal/HeaderBar';
import { useContext } from 'react';
import { GlobalData } from '../App';

function Body() {
  let { rightClick, setRightClick,} =
    useContext(GlobalData);
 return (
   <div id='Body' onClick={(e) => {
     e.stopPropagation()
     setRightClick(pre => {
       return {...pre,isOpend:false}
     })
   }} >
     <HeaderBar />
     <div className='gridContainer'>
       <Dock />
       <BodyContainer />
     </div>
   </div>
 );
}

export default Body;