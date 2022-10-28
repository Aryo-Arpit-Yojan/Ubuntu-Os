import './Meet.css';
import React, { useEffect, useState} from 'react';

function Meet() {

    // let [api,setApi] = useState(null);


    return (
      <div className='h-full w-full'>
        <iframe
          id='myIframe'
          className='w-full h-full flex justify-center items-center'
          frameborder='0'
          scrolling='no'
          title='browser'
          src='https://meet.jit.si/arpit-yojan-ubuntu'
        ></iframe>
      </div>
    );
}

export default Meet;