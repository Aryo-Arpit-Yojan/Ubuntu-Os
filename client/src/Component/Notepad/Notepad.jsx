import React from 'react'

function Notepad() {
  return (
    <div className='h-full w-full'>
      <iframe
        id='myIframe'
        className='w-full h-full flex justify-center items-center'
        frameborder='0'
        scrolling='no'
        title='browser'
        src='https://onlinenotepad.org/notepad'
      ></iframe>
    </div>
  );
}

export default Notepad