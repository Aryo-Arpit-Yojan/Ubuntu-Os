import React from 'react'

function Browser() {
  return (
    <div className='h-full w-full'>
      <iframe
        id='myIframe'
       className='w-full h-full flex justify-center items-center'
        frameborder='0'
        title='browser'
        src='https://www.bing.com/'
        
      ></iframe>
    </div>
  );
}

export default Browser