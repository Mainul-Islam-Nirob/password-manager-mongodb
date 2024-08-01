import React from 'react'
import {toast} from 'react-toastify'

function CopyIcon({text}) {
  const copyText = (copiedText) => { 
    navigator.clipboard.writeText(copiedText)
    toast('Copied to Clipboard...', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
   }
  return (
    <div onClick={() => {copyText(text)}} className='lordiconcopy size-7 cursor-pointer'>
        <lord-icon
        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
        src="https://cdn.lordicon.com/iykgtsbt.json"
        trigger="hover" >
        </lord-icon>
    </div>
  )
}

export default CopyIcon
