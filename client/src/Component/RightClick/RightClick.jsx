import React, { useContext } from 'react';
import { GlobalData } from '../../App';

function RightClick({ x, y, z }) {
  let { closeRightClick, specialCaseHome, setSpecialCaseHome } =
    useContext(GlobalData);
  let gData = useContext(GlobalData);
  return (
    <div
      className='w-44 rounded  cursor-pointer   rightClickMainContainer h-auto'
      style={{ left: x - 40, top: y - 10, zIndex: z }}
    >
      <div
        className='rig-win-option'
        onClick={(e) => {
          e.stopPropagation();
          closeRightClick();

          setSpecialCaseHome((pre) => {
            return [...pre, { fileType: 'folder' }];
          });
        }}
      >
        New Folder
      </div>
      <div
        className='rig-win-option'
        onClick={(e) => {
          e.stopPropagation();
          closeRightClick();
          let input = e.currentTarget.childNodes.item(1);
          input.click();
          input.addEventListener('change', () => {
            const files = e.target.files[0];
            setSpecialCaseHome((pre) => {
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
          closeRightClick();
          window.location.reload();
        }}
      >
        Refresh
      </div>
      <div className='rightClickDivideLine'></div>
      <div
        className='rig-win-option'
        onClick={(e) => {
          e.stopPropagation();
          closeRightClick();
          gData.handleDockApp('Settings', gData);
        }}
      >
        Setting's
      </div>
      <div
        className='rig-win-option'
        onClick={(e) => {
          e.stopPropagation();
          closeRightClick();
          gData.handleDockApp('Appstore', gData);
        }}
      >
        Appstore
      </div>
    </div>
  );
}

export default RightClick;
