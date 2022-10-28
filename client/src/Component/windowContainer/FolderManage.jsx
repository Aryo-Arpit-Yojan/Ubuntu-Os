import React, { useContext, useEffect, useState } from 'react';
import { GlobalData } from '../../App';
import { Buffer } from 'buffer';
import axios from 'axios';
function FolderManage({
  data: p_data,
  currPage: currFolderRoot,
  modifyFolder,
}) {
  let { folderWindowStructure, setCurrFolderRoot, setFolderWindowStructure } =
    useContext(GlobalData);

  let [inputValue, setInputValue] = useState('NewFolder');
  let [checkIsEditNP, setCheckIsEditNp] = useState(() => {
    return p_data.fileName ? false : true;
  });
  let [isPop, setIsPop] = useState(false);
  useEffect(() => {
    if (p_data.fileName) {
      setInputValue(p_data.fileName);
    }
  }, []);
  let [deleteOption, setDeleteOption] = useState(false);
  let bufferToUri = () => {
    if (p_data.fileContent) {
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(p_data.fileContent.data))
      );

      return `data:image/png;base64,${base64String}`;
    } else {
      return 'none';
    }
  };
  return (
    <>
      <div
        className='folderContainer relative rounded-lg cursor-pointer '
        return='false'
        onContextMenu={(e) => {
          e.stopPropagation();
          setDeleteOption(true);
          e.preventDefault();
        }}
      >
        {deleteOption ? (
          <>
            <div
              className='rightClickMainContainer '
              style={{
                position: 'absolute',
                right: '-60px',
                width:'6rem'
              }}
            >
              <div
                className='rig-win-option'
                onClick={() => {
                  console.log(p_data);
                  setDeleteOption(false);
                  axios
                    .delete(`https://backend-ubuntu-25.herokuapp.com/`, {
                      params: {
                        _id: p_data._id,
                        parentName: p_data.parentName,
                      },
                    })
                    .then((result) => {
                      modifyFolder.setCurrentPageFolder((pre) => {
                        return result.data;
                      });
                    })
                    .catch(() => {});
                }}
              >
                Delete
              </div>
              <div className='rightClickDivideLine'></div>
              <div
                className='rig-win-option'
                onClick={() => {
                  setDeleteOption(false);
                }}
              >
                Cancel
              </div>
            </div>
          </>
        ) : (
          ''
        )}
        <img
          onDoubleClick={(e) => {
            if (p_data.fileType !== 'folder') {
              return;
            }
            e.stopPropagation();
            setFolderWindowStructure((pre) => {
              return { ...pre, [inputValue]: { isWindowOpend: true } };
            });
          }}
          src={
            p_data.fileType === 'folder' ? './images/folder.png' : bufferToUri()
          }
          className='h-12 w-12'
          alt='Ext-Img'
        />
        {checkIsEditNP ? (
          <>
            <input
              onBlur={async (e) => {
                setInputValue(e.currentTarget.value);

                if (p_data.fileType === 'folder') {
                  axios
                    .post(`https://backend-ubuntu-25.herokuapp.com/`, {
                      preData: p_data,
                      save: {
                        parentName: currFolderRoot,
                        fileType: `${p_data.fileType}`,
                        fileName: inputValue,
                        fileContent: p_data.fileContent,
                      },
                    })
                    .then((result_1) => {
                      if (result_1.data.err) {
                        if (!isPop) {
                          alert('Name Already Exist');
                          setIsPop(true);
                          setTimeout(() => {
                            setIsPop(false);
                          }, 1000);
                        }
                      } else {
                        setCheckIsEditNp(false);
                        modifyFolder.setCurrentPageFolder((pre) => {
                          return result_1.data;
                        });
                      }
                    })
                    .catch(() => {
                      if (!isPop) {
                        alert('Something Wrong Plese refresh page');
                        setIsPop(true);
                        setTimeout(() => {
                          setIsPop(false);
                        }, 1000);
                      }
                    });
                } else if (p_data.fileType === 'img') {
                  let form = new FormData();
                  form.append('image', p_data.fileContent);
                  form.append(
                    'reqBody',
                    JSON.stringify({
                      preData: p_data,
                      save: {
                        parentName: currFolderRoot,
                        fileType: `${p_data.fileType}`,
                        fileName: inputValue,
                        fileContent: {},
                      },
                    })
                  );
                  axios
                    .post(`https://backend-ubuntu-25.herokuapp.com/`, form)
                    .then((result_1) => {
                      if (result_1.data.err) {
                        alert('Name Already Exist');
                        setIsPop(true);
                        setTimeout(() => {
                          setIsPop(false);
                        }, 1000);
                      } else {
                        setCheckIsEditNp(false);
                        modifyFolder.setCurrentPageFolder((pre) => {
                          return result_1.data;
                        });
                      }
                    })
                    .catch(() => {
                      alert('Some thing went wrong please re-fresh page');
                      setIsPop(true);
                      setTimeout(() => {
                        setIsPop(false);
                      }, 1000);
                    });
                }
              }}
              className='folderTitle'
              autoFocus
              value={inputValue}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  if (p_data.fileType === 'folder') {
                    axios
                      .post(`https://backend-ubuntu-25.herokuapp.com/`, {
                        preData: p_data,
                        save: {
                          parentName: currFolderRoot,
                          fileType: `${p_data.fileType}`,
                          fileName: inputValue,
                          fileContent: p_data.fileContent,
                        },
                      })
                      .then((result_1) => {
                        if (result_1.data.err) {
                          if (!isPop) {
                            alert('Name Already Exist');
                            setIsPop(true);
                            setTimeout(() => {
                              setIsPop(false);
                            }, 1000);
                          }
                        } else {
                          setCheckIsEditNp(false);
                          modifyFolder.setCurrentPageFolder((pre) => {
                            return result_1.data;
                          });
                        }
                      })
                      .catch(() => {
                        if (!isPop) {
                          alert('Something Wrong Plese refresh page');
                          setIsPop(true);
                          setTimeout(() => {
                            setIsPop(false);
                          }, 1000);
                        }
                      });
                  } else if (p_data.fileType === 'img') {
                    let form = new FormData();
                    form.append('image', p_data.fileContent);
                    form.append(
                      'reqBody',
                      JSON.stringify({
                        preData: p_data,
                        save: {
                          parentName: currFolderRoot,
                          fileType: `${p_data.fileType}`,
                          fileName: inputValue,
                          fileContent: {},
                        },
                      })
                    );
                    axios
                      .post(`https://backend-ubuntu-25.herokuapp.com/`, form)
                      .then((result_1) => {
                        if (result_1.data.err) {
                          alert('Name Already Exist');
                          setIsPop(true);
                          setTimeout(() => {
                            setIsPop(false);
                          }, 1000);
                        } else {
                          setCheckIsEditNp(false);
                          modifyFolder.setCurrentPageFolder((pre) => {
                            return result_1.data;
                          });
                        }
                      })
                      .catch(() => {
                        alert('Some thing went wrong please re-fresh page');
                        setIsPop(true);
                        setTimeout(() => {
                          setIsPop(false);
                        }, 1000);
                      });
                  }
                }
              }}
              onChange={(e) => {
                setInputValue(e.currentTarget.value);
              }}
            />
          </>
        ) : (
          <div
            className='folderTitle'
            onDoubleClick={() => {
              setCheckIsEditNp(true);
            }}
          >
            {inputValue ? inputValue : 'EmptyAryo'}
          </div>
        )}
      </div>
    </>
  );
}

export default FolderManage;
