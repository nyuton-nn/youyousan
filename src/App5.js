import React, { useRef, useState } from 'react'
import FileInputComponent from 'react-file-input-previews-base64'

//refrenceURL
//https://hatolabo.com/programming/react-file-dialog
export default function TaskList() {
return(
<div>
<FileInputComponent
  parentStyle={{}} //スタイル
  imagePreview={true} //ファイルのプレビュー
  multiple={false} //複数ファイル選択
  callbackFunction={file => { //選択後のコールバック関数
    console.log(file)
  }}
  buttonComponent={ //クリック時に選択ダイアログを開くコンポーネント
    <button/>
  }
  accept="image/*" //許可するファイルのtype
/>
</div>
);
}