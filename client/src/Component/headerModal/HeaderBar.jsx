import './HeaderBar.css';
import { RiSignalWifi3Fill } from 'react-icons/ri';
import { FaBluetooth } from 'react-icons/fa';
import { AiFillSound } from 'react-icons/ai';
import { GiBattery50 } from 'react-icons/gi';
import { useEffect, useState } from 'react';
function HeaderBar() {

  let [time, setTime] = useState(`0 Jan 00:00 AM`);


  useEffect(() => {
    setInterval(function () {
      let date = new Date();
      let hrs = date.getHours();
      let min = date.getMinutes();
      let day = date.getDay() % 7;
      let daysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      let amOrPm = hrs < 12 ? 'AM' : 'PM';

      for (let i = 0; i < daysArray.length; i++) {
        if (day === i) {
          day = daysArray[i];
        }
      }
      setTime(`${day} ${hrs}:${min} ${amOrPm}`);
    }, 1000);
  },[])
 return (
  <div id='headerBar'>

   <div className='left-headerBar-container'>
    <div className='headerOptionBox'>
     <div className='headerOptionText'>
      Activites
      </div>
    </div>
   </div>

     <div className='timer-headerBar'>{time}</div>
   
   <div className='right-headerBar-container'>
    <RiSignalWifi3Fill/>
    <AiFillSound />
    <FaBluetooth/>
    <GiBattery50 />
   </div>
   
  </div>
  );
}

export default HeaderBar;