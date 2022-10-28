import './Modal.css';
import { useState, createRef, useContext, useEffect } from 'react';
import { GlobalData } from '../../App';
import { Resizable } from 're-resizable';
import Draggable from 'react-draggable-fixed';
import closeImg from '../../inImage/close.svg';
import minimize from '../../inImage/minimize.svg';
import fullScreen from '../../inImage/fullScreen.svg';
function Modal(props) {
  let gData = useContext(GlobalData);
  let [cstate, setState] = useState(0);
  let modalContainer = createRef();

  useEffect(() => {
    gData['is' + props.data.innerData] = {
      ...gData['is' + props.data.innerData],
      windowModal: modalContainer,
    };
  });

  let [style, setStye] = useState({
    position: 'absolute',
    top: '5%',
    left: '15%',
    marginLeft: 'auto',
  });
  let [myPosition, setMyPosition] = useState({ width: '64%', height: '81%' });

  useEffect(() => {
    if (props.data.innerData === gData.currentApp[0]) {
      setStye((pre) => {
        return { ...pre, zIndex: 40000 };
      });
    }
  }, []);

  return (
    <>
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
          >
            <div className='modal-title cursor-pointer'>
              <div className='application-headline'>{props.data.innerData}</div>

              <div className='controls'>
                <span
                >
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
                        return { width: '64%', height: '81%' };
                      });
                    }
                  }}
                >
                  <img src={fullScreen} alt='fullScn' />
                </span>

                <span
                  className='closeSpan'
                  onClick={() => {
                    gData['set' + props.data.innerData]({
                      ...gData['is' + props.data.innerData],
                      appOpend: false,
                    });
                    let newArr = gData.currentApp.filter((ele) => {
                      return ele !== props.data.innerData;
                    });
                    gData.setCurrentApp([...newArr]);
                  }}
                >
                  <img src={closeImg} alt='none' />
                </span>
              </div>
            </div>

            <div className='modal-base'>{props.data.component}</div>
          </div>
        </Resizable>
      </Draggable>
    </>
  );
}

export default Modal;
