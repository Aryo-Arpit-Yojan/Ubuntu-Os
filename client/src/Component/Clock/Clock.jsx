import React from 'react'

function Clock() {
  return (
    <div className='h-full w-full'>
      <iframe
        id='myIframe'
        className='w-full h-full flex justify-center items-center'
        frameborder='0'
        scrolling='no'
        title='browser'
        src='https://dayspedia.com/time/online/'
      ></iframe>
    </div>
  );
}

export default Clock