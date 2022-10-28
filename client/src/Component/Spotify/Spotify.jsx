import React from 'react'

function Spotify() {
  return (
    <div className='h-full w-full'>
      
      <iframe
        src='https://open.spotify.com/embed/playlist/3QSmfNR2XtpoADu0QPGVJK?utm_source=generator'
        id='myIframe'
        className='w-full h-full flex justify-center items-center'
        frameborder='0'
        scrolling='no'
        title='browser'
        frameBorder='0'
        allowfullscreen=''
        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
        loading='lazy'
      ></iframe>
    </div>
  );
}

export default Spotify