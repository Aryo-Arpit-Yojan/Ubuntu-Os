import './App.css';
import * as React from 'react';
import { createContext, useState } from 'react';
import Body from './Component/Body';
import axios from 'axios';
export let GlobalData = createContext();

function App() {
  let [dockIconArray, setDockIconArray] = useState([
    'Browser',
    'Terminal',
    'Account',
    'Appstore',
    'Help',
  ]);
  let [applicationsArray, setApplicationsArray] = useState([
    'Browser',
    'Gallery',
    'Clock',
    'Terminal',
    'Account',
    'Camera',
    'Appstore',
    'Help',
    'Settings',
    // 'Meet',
    'Notepad',
    'Chess',
    'Vscode',
    // 'Calender',
    'Maps',
    'Hillclimb',
    'Trash',
    // 'Weather',
    // 'Music',
    'Message',
  ]);
  let [applicationsAppStoreArray, setApplicationsAppStoreArray] = useState([
    'Vscode',
    'Browser',
    'Meet',
    'Camera',
    'Chess',
    'Clock',
    'Terminal',
    'Account',
    'Gallery',
    'Appstore',
    'Help',
    'Settings',
    'Notepad',
    'Calender',
    'Maps',
    'Hillclimb',
    'Trash',
    'Weather',
    'Music',
    'Message',
  ]);

  let [currentApp, setCurrentApp] = useState([]);

  let [accountData, setAccountData] = useState({
    isNewAccount: false,
    editOpened: false,
    passView: false,
    userName: 'Arpit - Yojan',
  });

  let [isBrowser, setBrowser] = useState({
    appOpend: false,
    minimize: false,
    isPermanent: true,
    windowModal: '',
  });

  let [isClock, setClock] = useState({
    appOpend: false,
    minimize: false,
    windowModal: '',
  });

  let [isTerminal, setTerminal] = useState({
    appOpend: false,
    minimize: false,
    isPermanent: true,
    windowModal: '',
  });

  let [isAccount, setAccount] = useState({
    appOpend: false,
    minimize: false,
    isPermanent: true,
    windowModal: '',
  });

  let [isAppstore, setAppstore] = useState({
    appOpend: false,
    minimize: false,
    isPermanent: true,
    windowModal: '',
  });

  let [isHelp, setHelp] = useState({
    appOpend: false,
    minimize: false,
    isPermanent: true,
    windowModal: '',
  });

  let [isTrash, setTrash] = useState({
    appOpend: false,
    minimize: false,
    windowModal: '',
  });

  let [isMessage, setMessage] = useState({
    appOpend: false,
    minimize: false,
    windowModal: '',
  });

  let [isMusic, setMusic] = useState({
    appOpend: false,
    minimize: false,
    windowModal: '',
  });

  let [isWeather, setWeather] = useState({
    appOpend: false,
    minimize: false,
    windowModal: '',
  });

  let [isHillclimb, setHillclimb] = useState({
    appOpend: false,
    minimize: false,
    windowModal: '',
  });

  let [isMaps, setMaps] = useState({
    appOpend: false,
    minimize: false,
    windowModal: '',
  });

  let [isCalender, setCalender] = useState({
    appOpend: false,
    minimize: false,
    windowModal: '',
  });

  let [isVscode, setVscode] = useState({
    appOpend: false,
    minimize: false,
    windowModal: '',
  });

  let [isChess, setChess] = useState({
    appOpend: false,
    minimize: false,
    windowModal: '',
  });

  let [isNotepad, setNotepad] = useState({
    appOpend: false,
    minimize: false,
    windowModal: '',
  });

  let [isMeet, setMeet] = useState({
    appOpend: false,
    minimize: false,
    windowModal: '',
  });

  let [isSettings, setSettings] = useState({
    appOpend: false,
    minimize: false,
    windowModal: '',
  });

  let [isCamera, setCamera] = useState({
    appOpend: false,
    minimize: false,
    windowModal: '',
  });

  let [isGallery, setGallery] = useState({
    appOpend: false,
    minimize: false,
    windowModal: '',
  });

  React.useEffect(() => {
    document.addEventListener(
      'contextmenu',
      function (e) {
        e.preventDefault();
      },
      false
    );
  });
  let [isMenu, setMenu] = useState(false);

  let handleDockApp = (currentClikedApp, gData) => {
    gData.setMenu(false);
    if (gData.currentApp[0] !== currentClikedApp) {
      let newArr = gData.currentApp.filter((ele) => {
        return ele !== currentClikedApp;
      });
      gData.setCurrentApp([currentClikedApp, ...newArr]);
    }

    if (!gData['is' + currentClikedApp].appOpend) {
      gData['set' + currentClikedApp]({
        ...gData['is' + currentClikedApp],
        appOpend: true,
      });
    }

    if (
      gData['is' + currentClikedApp].appOpend &&
      gData.currentApp[0] === currentClikedApp &&
      gData['is' + currentClikedApp].windowModal.current
    ) {
      gData['is' + currentClikedApp].windowModal.current.style.display = 'none';
      gData['set' + currentClikedApp]({
        ...gData['is' + currentClikedApp],
        minimize: true,
      });
      let newArr = gData.currentApp.filter((ele) => {
        return ele !== currentClikedApp;
      });
      gData.setCurrentApp([...newArr]);
    }

    if (
      gData['is' + currentClikedApp].minimize &&
      gData['is' + currentClikedApp].windowModal.current
    ) {
      gData['is' + currentClikedApp].windowModal.current.style.display = 'flex';
      gData['set' + currentClikedApp]({
        ...gData['is' + currentClikedApp],
        minimize: false,
      });
    }
    if (
      !gData.dockIconArray.includes(currentClikedApp) &&
      currentClikedApp !== 'Trash'
    )
      gData.dockIconArray = [...gData.dockIconArray, currentClikedApp];
    gData.setDockIconArray(gData.dockIconArray);
  };

  let [rightClick, setRightClick] = useState({
    position: { x: 0, y: 0 },
    isOpend: false,
  });

  function closeRightClick() {
    setRightClick((pre) => {
      return { ...pre, isOpend: false };
    });
  }

  let [folderWindowStructure, setFolderWindowStructure] = useState({});
  let [specialCaseHome, setSpecialCaseHome] = useState([]);
  let [currFolderRoot, setCurrFolderRoot] = useState('root');

  React.useEffect(() => {
    axios
      .get(`https://backend-ubuntu-25.herokuapp.com/`, {
        params: { myCurrFolder: 'root' },
      })
      .then((result) => {
        setSpecialCaseHome((pre) => {
          return result.data;
        });
      })
      .catch(() => {});
  }, []);
  return (
    <GlobalData.Provider
      value={{
        currFolderRoot,
        setCurrFolderRoot,
        folderWindowStructure,
        setFolderWindowStructure,

        specialCaseHome,
        setSpecialCaseHome,
        closeRightClick,
        rightClick,
        setRightClick,

        dockIconArray,
        setDockIconArray,

        currentApp,
        setCurrentApp,

        isBrowser,
        setBrowser,

        isClock,
        setClock,

        isTerminal,
        setTerminal,

        isAccount,
        setAccount,

        isAppstore,
        setAppstore,

        isHelp,
        setHelp,

        isTrash,
        setTrash,

        isMenu,
        setMenu,

        isGallery,
        setGallery,

        isCamera,
        setCamera,

        isSettings,
        setSettings,

        isMeet,
        setMeet,

        isNotepad,
        setNotepad,

        isChess,
        setChess,

        isVscode,
        setVscode,

        isCalender,
        setCalender,

        isMaps,
        setMaps,

        isHillclimb,
        setHillclimb,

        isWeather,
        setWeather,

        isMusic,
        setMusic,

        isMessage,
        setMessage,

        handleDockApp,

        accountData,
        setAccountData,

        applicationsArray,
        setApplicationsArray,

        applicationsAppStoreArray,
        setApplicationsAppStoreArray,
      }}
    >
      <div className='App'>
        <Body />
      </div>
    </GlobalData.Provider>
  );
}

export default App;
