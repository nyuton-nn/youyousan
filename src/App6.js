import React, { useRef, useState } from 'react'
import Papa from 'papaparse'
import { CSVLink, CSVDownload } from "react-csv";
import 'whatwg-fetch';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs'
import { withTheme } from '@material-ui/core';
import { ImportantDevices } from '@material-ui/icons';

const ExcelJS = require('exceljs');

let csvData=[];
const awaitImportFunc = (useList) => {
    let data =useList
    console.log(JSON.stringify({
        test:"aaa",
        datalist:data
    }))
    fetch('http://localhost:8081/users/db_insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            mode: 'no-cors'
        },
        body: JSON.stringify({
            test:"aaa",
            datalist:data
        })
    }
    ).then(response => {
        console.log(response);
        response.json().then(resolve => {
            console.log(resolve.result);
        });
    }).catch(err => {
        console.log(err);
    });
}

const awaitExportFunc = () => {
    fetch('http://localhost:8081/users/db_select', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            mode: 'no-cors'
        },
        body: JSON.stringify({
            test:"export",
        })
    }
    ).then(response => {
        console.log(response);
        response.json().then(resolve => {
            console.log(resolve);
            csvData=resolve.result
        });
    }).catch(err => {
        console.log(err);
    });
}

const clickButtonAsync = async (e) => {
    e.preventDefault();
    
    // Workbookの作成
    const workbook = new ExcelJS.Workbook();
    // Workbookに新しいWorksheetを追加
    workbook.addWorksheet('My Sheet');
    // ↑で追加したWorksheetを参照し変数に代入
    const worksheet = workbook.getWorksheet('My Sheet');
  
    // 列を定義
    worksheet.columns = [
      { header: 'ID', key: 'id' },
      { header: '氏名', key: 'name' },
      { header: '氏名（かな）', key: 'nameKana' },
      { header: '職業', key: 'job' },
      { header: 'パスワード', key: 'pass' },
      { header: 'メール', key: 'mail' },
      { header: '権限', key: 'permission' },
      { header: '登録日付', key: 'createdate' },
      { header: '更新日付', key: 'updatedate' },
      { header: '無効フラグ', key: 'validflag' },
    ];


    for(const len of csvData){
        // 行を定義
        worksheet.addRow({
            id: len.id,
            name: len.name,
            nameKana:len.nameKana,
            job:len.job,
            pass:len.pass,
            mail:len.mail,
            permission:len.permission,
            createdate:len.createdate,
            updatedate:len.updatedate,
            validflag:len.validflag,
        });
    }    
    // UInt8Arrayを生成
    const uint8Array = await workbook.xlsx.writeBuffer();
    // Blobを生成
    const blob = new Blob([uint8Array], {type: 'application/octet-binary'});
    // DL用URLを生成し、aタグからダウンロードを実行
    const url = window.URL.createObjectURL(blob);
    // aタグを生成
    const a = document.createElement('a');
    // aタグのURLを設定
    a.href = url;
    // aタグにdownload属性を付け、URLがダウンロード対象になるようにします
    a.download = `list.xlsx`;
    // aタグをクリックさせます
    a.click();
    // ダウンロード後は不要なのでaタグを除去
    a.remove();  
  }
let formatDay =''
let calenderStatus2 = false
var divwi = {
    width:"100px",
    // position: "absolute",
  };
var thtd = {
    width:"100px",
    // position: "relative",
    overflow: "hidden",
  };
  var tdbody = {
    overflow: "hidden",
    height: "100px",
    position: "fixed",
    // display:"block",
  };
  var theader = {
    width:"200px",
  };
  var tdstyle = {
    overflow: "auto",
    width:"200px",
  };
class FileReader extends React.Component {
    constructor() {
        super();
        this.state = {
            csvfile: undefined,
            responseData:[],
            calenderStatus:false,
        };
        this.updateData = this.updateData.bind(this);
    }

    handleChange = event => {
        this.setState({
            csvfile: event.target.files[0]
        });
    };

    importCSV = () => {
        const { csvfile } = this.state;
        Papa.parse(csvfile, {
            complete: this.updateData,
            header: true
        });
    };

    updateData(result) {
        var data = result.data;
        console.log(data);
        awaitImportFunc(data);
    }

    exportCSV = () => {
        awaitExportFunc();
        this.setState({ responseData: csvData });

    };
    

    render() {
        return (
            <div className="App">
                <h2>Import CSV File!</h2>
                <input
                    className="csv-input"
                    type="file"
                    ref={input => {
                        this.filesInput = input;
                    }}
                    name="file"
                    placeholder={null}
                    onChange={this.handleChange}
                />
                <p />
                <button onClick={this.importCSV}> Upload now!</button>
                <button onClick={this.exportCSV}> export data!</button>
                <CSVLink 
                    data={csvData}
                    asyncOnClick={true}
                    onClick={(event,done) => {
                        console.log("csvData",csvData)
                    }
                    }>
                    Download me
                </CSVLink>
                <div>
                    <button onClick={(e) => clickButtonAsync(e)}>エクセル生成！</button>
                </div>
                <button onClick={()=>{
                    this.setState({ calenderStatus: true })
                    if(calenderStatus2){
                        calenderStatus2 = false
                    }else{
                        calenderStatus2 = true
                    }
                    console.log(calenderStatus2)
                    }}> calender print</button>
                <div>
                    {calenderStatus2 ? (
                    <Calendar locale="ja-JP" calendarType="US"
                        onClickDay={(value, event) => {
                            this.setState({ calenderStatus: false })
                            calenderStatus2 = false
                            //https://qiita.com/yagi_suke/items/2848c8981ea6d9f26587
                            formatDay = dayjs(value).format('YYYY/MM/DD')
                            console.log('Clicked day: ',value)
                            console.log('Clicked day: ',formatDay)
                            // this.setState({ formatDate: formatDay })
                     }}                    
                    />
                    ):(
                        <div>
                        <p>日付:{formatDay}</p>
                        </div>
                    )}
                </div>
                <div style={divwi}>
                    <table style={tdstyle}>
                        <thead style={theader}>
                            <tr>
                                <th style={thtd}>AAA</th>
                                <th style={thtd}>BBB</th>
                            </tr>
                        </thead>
                        <tbody style={tdbody}>
                            <tr>
                                <td style={thtd}>1</td>
                                <td style={thtd}>1aaaaaaaaaaaaaaaaaaabbbbfweafafwefaeaa</td>
                            </tr>
                            <tr>
                                <td style={thtd}>2</td>
                                <td style={thtd}>1aaaaaaaaaaaaaaaaaaabbbbfweafafwefaeaa</td>
                            </tr>
                            <tr>
                                <td style={thtd}>3</td>
                                <td style={thtd}>1aaaaaaaaaaaaaasssssssssssssssssssssssssssssssaaaaabbbbfweafafwefaeaa</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default FileReader;
  //refrenceURL

  //https://www.it-swarm-ja.com/ja/javascript/papa-parse%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%A6csv%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%8B%E3%82%89react%E7%8A%B6%E6%85%8B%E3%81%AB%E3%83%87%E3%83%BC%E3%82%BF%E3%82%92%E6%8A%BD%E5%87%BA%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95%E3%81%AF%EF%BC%9F/835619745/