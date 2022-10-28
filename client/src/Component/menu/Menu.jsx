import { useContext } from 'react';
import { GlobalData } from '../../App';
import './Menu.css';
// import { Input } from '@nextui-org/react';
import search from '../../inImage/search.svg'

function Menu() {
  let gData = useContext(GlobalData);

  return (
    <div className='menu-main-container'>
      <div className='menu-search-bar '>
        <div className='inputContainerMenu'>
          <img src={search} alt='searchSvg'/>
          <input placeholder='Type To Search' type='text' />
        </div>
      </div>
      <div className='menuWindowContainer flex justify-center items-center'>
        <div className='menu-winCon-1'>
          <img  />
        </div>
        <div className='menu-winCon-2'>
          <img />

        </div>
      </div>
      <div className='menu-app-container'>
        {gData.applicationsArray.map((appName) => {
          return (
            <div
              className='app-container-card'
              onClick={() => {
                gData.handleDockApp(appName, gData);
              }}
            >
              <img src={`./images/${appName}.png`} alt={appName} />
              <div className='app-text'>{appName}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
