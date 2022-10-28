import { useContext } from 'react';
import { GlobalData } from '../../App';
import './BodyContainer.css';
import Modal from '../windowModal/Modal';
import Menu from '../menu/Menu';
import Map from '../map/Map';
import Account from '../Account_Component/Account';
import AppStore from '../AppStore/AppStore';
import Meet from '../meet/Meet';
import Weather from '../weather/Weather';
import Terminal from '../Terminal/Terminal';
import Vscode from '../vscode/Vscode';
import Browser from '../Browser/Browser';
import Spotify from '../Spotify/Spotify';
import Notepad from '../Notepad/Notepad';
import Clock from '../Clock/Clock';
import UnderConstruction from '../UnderConstruction/UnderConstruction';
import RightClick from '../RightClick/RightClick';
import FolderManage from './FolderManage';
import FolderModal from '../windowModal/FolderModal';

function BodyContainer() {
  let gData = useContext(GlobalData);
  let { rightClick, setRightClick, specialCaseHome,folderWindowStructure, setFolderWindowStructure, setSpecialCaseHome } =
    useContext(GlobalData);
  return (
    <div
      className='BodyContainer'
      onContextMenu={(e) => {
        setRightClick((pre) => {
          return {
            ...pre,
            isOpend: true,
            position: { x: e.pageX, y: e.pageY },
          };
        });
      }}
    >
      <div className=' w-full  bodyInnerdiv h-full px-8 py-4 '>
        {specialCaseHome.map((data) => {
          
          return (
            <FolderManage
              data={data}
              currPage={'root'}
              modifyFolder={{
                currPageFolder: specialCaseHome,
                setCurrentPageFolder: setSpecialCaseHome,
              }}
            />
          );
        })}
      </div>

      {/* DOCK ICONS MODAL */}
      {Object.keys(folderWindowStructure)
        .filter((innerdata) => {
          return folderWindowStructure[innerdata].isWindowOpend;
        })
        .map((res) => {
          return (
            <FolderModal
              folderName={res}
            />
          );
        })}
      {rightClick.isOpend ? (
        <RightClick
          x={rightClick.position.x}
          y={rightClick.position.y}
          z={51}
        />
      ) : (
        ''
      )}
      {gData.isBrowser.appOpend ? (
        <Modal data={{ innerData: 'Browser', component: <Browser /> }} />
      ) : (
        ''
      )}
      {gData.isTerminal.appOpend ? (
        <Modal data={{ innerData: 'Terminal', component: <Terminal /> }} />
      ) : (
        ''
      )}
      {gData.isAccount.appOpend ? (
        <Modal data={{ innerData: 'Account', component: <Account /> }} />
      ) : (
        ''
      )}
      {gData.isAppstore.appOpend ? (
        <Modal data={{ innerData: 'Appstore', component: <AppStore /> }} />
      ) : (
        ''
      )}
      {gData.isHelp.appOpend ? (
        <Modal data={{ innerData: 'Help', component: <UnderConstruction /> }} />
      ) : (
        ''
      )}
      {gData.isTrash.appOpend ? (
        <Modal
          data={{ innerData: 'Trash', component: <UnderConstruction /> }}
        />
      ) : (
        ''
      )}
      {/* MENU ICONS MODAL */}
      {gData.isClock.appOpend ? (
        <Modal data={{ innerData: 'Clock', component: <Clock /> }} />
      ) : (
        ''
      )}
      {gData.isGallery.appOpend ? (
        <Modal
          data={{ innerData: 'Gallery', component: <UnderConstruction /> }}
        />
      ) : (
        ''
      )}
      {gData.isCamera.appOpend ? (
        <Modal
          data={{ innerData: 'Camera', component: <UnderConstruction /> }}
        />
      ) : (
        ''
      )}
      {gData.isSettings.appOpend ? (
        <Modal
          data={{ innerData: 'Settings', component: <UnderConstruction /> }}
        />
      ) : (
        ''
      )}
      {gData.isMeet.appOpend ? (
        <Modal data={{ innerData: 'Meet', component: <Meet /> }} />
      ) : (
        ''
      )}
      {gData.isNotepad.appOpend ? (
        <Modal data={{ innerData: 'Notepad', component: <Notepad /> }} />
      ) : (
        ''
      )}
      {gData.isChess.appOpend ? (
        <Modal
          data={{ innerData: 'Chess', component: <UnderConstruction /> }}
        />
      ) : (
        ''
      )}
      {gData.isVscode.appOpend ? (
        <Modal data={{ innerData: 'Vscode', component: <Vscode /> }} />
      ) : (
        ''
      )}
      {gData.isCalender.appOpend ? (
        <Modal
          data={{ innerData: 'Calender', component: <UnderConstruction /> }}
        />
      ) : (
        ''
      )}
      {gData.isMaps.appOpend ? (
        <Modal data={{ innerData: 'Maps', component: <Map /> }} />
      ) : (
        ''
      )}
      {gData.isHillclimb.appOpend ? (
        <Modal
          data={{ innerData: 'Hillclimb', component: <UnderConstruction /> }}
        />
      ) : (
        ''
      )}
      {gData.isWeather.appOpend ? (
        <Modal data={{ innerData: 'Weather', component: <Weather /> }} />
      ) : (
        ''
      )}
      {gData.isMusic.appOpend ? (
        <Modal data={{ innerData: 'Music', component: <Spotify /> }} />
      ) : (
        ''
      )}
      {gData.isMessage.appOpend ? (
        <Modal
          data={{ innerData: 'Message', component: <UnderConstruction /> }}
        />
      ) : (
        ''
      )}
      {/* MENU BAR */}
      {gData.isMenu ? <Menu /> : ''}
    </div>
  );
}

export default BodyContainer;
