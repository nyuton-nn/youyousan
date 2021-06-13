import React, { useRef, useState } from 'react'
import Papa from 'papaparse/papaparse.min.js'
import { CSVLink, CSVDownload } from "react-csv";
import 'whatwg-fetch';

const awaitImportFunc = (useList) => {
    let data =useList
    let csvData;
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
            csvData=resolve.result
        });
    }).catch(err => {
        console.log(err);
    });
    return csvData
}

const awaitExportFunc = (useList) => {
    let data =useList
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
        });
    }).catch(err => {
        console.log(err);
    });
}



class FileReader extends React.Component {
    constructor() {
        super();
        this.state = {
            csvfile: undefined
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
        let reportData = awaitExportFunc();
        this.setState({ data: reportData });

    };

    headers = [
        { label: "First Name", key: "firstname" },
        { label: "Last Name", key: "lastname" },
        { label: "Email", key: "email" }
      ];

    render() {
        console.log(this.state.csvfile);
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
                {/* <CSVLink data={this.state.data} headers={this.headers}><button onClick={this.exportCSV}> export data!</button></CSVLink>; */}
                {/* <CSVLink>Download me</CSVLink>; */}
            </div>
        );
    }
}

export default FileReader;
  //refrenceURL
  //https://www.it-swarm-ja.com/ja/javascript/papa-parse%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%A6csv%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%8B%E3%82%89react%E7%8A%B6%E6%85%8B%E3%81%AB%E3%83%87%E3%83%BC%E3%82%BF%E3%82%92%E6%8A%BD%E5%87%BA%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95%E3%81%AF%EF%BC%9F/835619745/