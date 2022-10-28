import './Modal.css';
import { useState, createRef, useContext, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { MdFullscreen } from 'react-icons/md';
import { BsDash } from 'react-icons/bs';
import { GlobalData } from '../../App';
import axios from 'axios';

import closeImg from '../../inImage/close.svg'
import minimize from '../../inImage/minimize.svg'
import star from '../../inImage/starred-symbolic.svg'
import fullScreen from '../../inImage/fullScreen.svg'
import download from '../../inImage/download.svg'
import docs from '../../inImage/document.svg'
import music from '../../inImage/music.svg'
import add from '../../inImage/add.svg'
import imgSvg from '../../inImage/imgSvg.svg'
import back from '../../inImage/back.svg'
import next from '../../inImage/next.svg'

import home from '../../inImage/home.svg'
import search from '../../inImage/search.svg'


import FolderManage from '../windowContainer/FolderManage';
import { Resizable } from 're-resizable';
import Draggable from 'react-draggable-fixed';
function InnerRightClick({ x, y, z, allData }) {
  let currPageFolder = allData.currPageFolder;
  let setCurrentPageFolder = allData.setCurrentPageFolder;
  let setFolderRightClick = allData.setFolderRightClick;
let gData = useContext(GlobalData)
  let { innerSpecialCaseHome, setInnerSpecialCaseHome } = useState([]);

  return (
    <>
      <div
        className='w-44 rounded  cursor-pointer   rightClickMainContainer h-auto'
        style={{ left: x - 40, top: y - 10, zIndex: z }}
      >
        <div
          className='rig-win-option'
          onClick={(e) => {
            e.stopPropagation();
            allData.setFolderRightClick(false);
            setCurrentPageFolder((pre) => {
              return [...pre, { fileType: 'folder' }];
            });
          }}
        >
          New Folder
        </div>
        <div
          className='overflow-hidden rig-win-option'
          onClick={(e) => {
            let input = e.currentTarget.childNodes.item(1);
            allData.setFolderRightClick(false);
            input.click();
            input.addEventListener('change', () => {
              const files = e.target.files[0];
              setCurrentPageFolder((pre) => {
                return [
                  ...pre,
                  {
                    fileType: 'img',
                    fileContent: files,
                  },
                ];
              });
            });
          }}
        >
          Save Image
          <input className='hidden bg-transparent  border-none' type={'file'} />
        </div>
        <div className='rightClickDivideLine'></div>
        <div
          className='rig-win-option'
          onClick={(e) => {
            e.stopPropagation();
            allData.setFolderRightClick(false);
            window.location.reload();
          }}
        >
          Refresh
        </div>
        <div className='rightClickDivideLine'></div>
        <div
          className='rig-win-option '
          onClick={(e) => {
            e.stopPropagation();
            allData.setFolderRightClick(false);
            gData.handleDockApp('Settings', gData);
          }}
        >
          Setting's
        </div>

        <div
          className='rig-win-option '
          onClick={(e) => {
            e.stopPropagation();
            allData.setFolderRightClick(false);
            gData.handleDockApp('Appstore', gData);
          }}
        >
          Appstore
        </div>
      </div>
    </>
  );
}
function FolderModal({ folderName: currParentFolderName }) {
  let { folderWindowStructure, setFolderWindowStructure } =
    useContext(GlobalData);
  let [cstate, setState] = useState(0);
  let modalContainer = createRef();
  let [currPageFolder, setCurrentPageFolder] = useState([]);
  let [folderRightClick, setFolderRightClick] = useState({
    isOpend: false,
    x: 0,
    y: 0,
  });
  let [style, setStye] = useState({
    position: 'absolute',
    top: '5%',
    left: '15%',
    marginLeft: 'auto',
  });
  let [myPosition, setMyPosition] = useState({ width: '53%', height: '70%' });

  useEffect(() => {
    axios
      .get(`https://backend-ubuntu-25.herokuapp.com/`, {
        params: { myCurrFolder: currParentFolderName },
      })
      .then((result) => {
        setCurrentPageFolder((pre) => {
          return result.data;
        });
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {folderRightClick.isOpend ? (
        <InnerRightClick
          allData={{
            currPageFolder,
            setFolderRightClick,
            setCurrentPageFolder,
          }}
          x={folderRightClick.x}
          y={folderRightClick.y}
          z={500001}
        />
      ) : (
        ''
      )}
      <Draggable handle='.modal-title'>
        <Resizable
          size={{ width: myPosition.width, height: myPosition.height }}
          minConstraints={[500, 500]}
          maxConstraints={[900, 900]}
          onResize={(e, __, _, size) => {
            setMyPosition((pre) => {
              return {
                width: pre.width + size.width,
                height: pre.height + size.height,
              };
            });
          }}
          style={style}
        >
          <div
            className='modal-container'
            ref={modalContainer}
            onMouseEnter={(e) => {
              setStye((pre) => {
                return { ...pre, zIndex: 40000 };
              });
            }}
            onMouseLeave={() => {
              setStye((pre) => {
                return { ...pre, zIndex: 200 };
              });
            }}
            style={{ zIndex: '150', position: 'absolute' }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setFolderRightClick((pre) => {
                return { ...pre, isOpend: false, x: e.pageX, y: e.pageY };
              });
            }}
            onContextMenu={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setFolderRightClick((pre) => {
                return { ...pre, isOpend: true, x: e.pageX, y: e.pageY };
              });
            }}
          >
            <div className='modal-title'>
              <div className='application-headline-folderModal'>
                <div className='ap-hl-fm-np'>
                  <div>
                    <img src={back} alt='back' />
                  </div>
                  <div>
                    <img src={next} alt='back' />
                  </div>
                </div>
                <div className='ap-hl-fm-addressBar'>
                  <img src={home} alt='homeIcon' />
                  Folder / {currParentFolderName}

                </div>
              
              </div>

              <div className='controls'>
                <span>
                  <img src={minimize} alt='minimize' />
                </span>

                <span
                  className='fullscreenSpan'
                  onClick={() => {
                    if (cstate === 0) {
                      setState(2);
                      setStye((pre) => {
                        return { ...pre, top: '0', left: '0' };
                      });
                      setMyPosition((pre) => {
                        return { width: '100%', height: '100%' };
                      });
                    } else if (cstate === 2) {
                      setState(0);
                      setStye((pre) => {
                        return { ...pre, top: '5%', left: '15%' };
                      });
                      setMyPosition((pre) => {
                        return { width: '53%', height: '70%' };
                      });
                    }
                  }}
                >
                  <img src={fullScreen} alt='fullScn' />
                </span>

                <span
                  className='closeSpan'
                  onClick={(e) => {
                    e.stopPropagation();
                    setFolderWindowStructure((pre) => {
                      return {
                        ...pre,
                        [currParentFolderName]: { isWindowOpend: false },
                      };
                    });
                  }}
                >
                  {/* <IoCloseOutline /> */}
                  <img src={closeImg} alt='none' />
                </span>
              </div>
            </div>

            <div className='modal-base'>
              {
                <div className='w-full h-full  flex'>
                  <div className='folderModalSidebar '>
                    <div className='folderModalSidebar-option'>
                      <img src={star} alt='star' />
                      <p>Yojan.G</p>
                    </div>
                    <div className='folderModalSidebar-option'>
                      <img src={star} alt='star' />
                      <p>Arpit.M</p>
                    </div>
                    <div className='folderModalSidebar-option folderModalOptionOpened'>
                      <img src={docs} alt='star' />
                      <p>Documents</p>
                    </div>
                    <div className='folderModalSidebar-option'>
                      <img src={download} alt='star' />
                      <p>Download</p>
                    </div>
                    <div className='folderModalSidebar-option'>
                      <img src={music} alt='star' />
                      <p>Music</p>
                    </div>

                    <div className='folderModalSidebar-option'>
                      <img src={imgSvg} alt='star' />
                      <p>Image</p>
                    </div>
                    <div className='rightClickDivideLine'></div>
                    <div className='folderModalSidebar-option'>
                      <img src={add} alt='star' />
                      <p>Other Locations</p>
                    </div>
                  </div>
                  <div className='folderModalContnet p-3'>
                    {currPageFolder.map((innerData) => {
                      return (
                        <FolderManage
                          data={innerData}
                          currPage={currParentFolderName}
                          modifyFolder={{
                            currPageFolder,
                            setCurrentPageFolder,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              }
            </div>
          </div>
        </Resizable>
      </Draggable>
    </>
  );
}

export default FolderModal;
