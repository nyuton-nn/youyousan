import React from 'react';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  table: {
    width: "600px",
  },
  TableRow: {
    backgroundColor: '#CCFFCC',
    hover: "#11FFDD"
  },
  task: {
    width: "300px"
  },
  status: {
    width: "50px"
  },
  container: {
    maxHeight: "400px",
  },
  box: {
    display: "flex",
    padding: "50",
  },
  box2: {
    width: "650px",
    padding: "100",
  },
  box3: {
    align: "center",
    width: "100px",
    padding: "30",
  },
});

let titles = new Map();
titles.set("key1", "No");
titles.set("key2", "task")

let rawData = ['ABC', '20210525', '1', 'あいうえお', 0, '20210527', , '＠＠＠', '', '20210625']

let leftData11 = []
let leftData12 = []
let leftData13 = []
let leftData14 = []
let leftData15 = []
let leftData16 = []
let leftData17 = []

export default function TaskList() {
  const classes = useStyles();
  const [selected1, setSelected1] = React.useState(String);
  const [selected2, setSelected2] = React.useState(String);
  const [leftData, setleftData] = React.useState([
    {'NO':1, 'len':[]},
    {'NO':2, 'len':[]},
    {'NO':3, 'len':[]},
    {'NO':4, 'len':[]},
    {'NO':5, 'len':[]},
    {'NO':6, 'len':[]},
    {'NO':7, 'len':[]},
  ]);
 const [rightData, setrightData] = React.useState([]);
 const [printData, setprintData] = React.useState([]);
 console.log(rightData)

  const rightInit = () => {
    let inputRight1 = []
    for(let i=0;i<rawData.length;i++){
      printData.push({'NO':i+1,'len':rawData[i]})
      inputRight1.push({'NO':i+1})
    }
    setprintData(printData)
    setrightData(inputRight1)
    setleftData([
      {'NO':1, 'len':[]},
      {'NO':2, 'len':[]},
      {'NO':3, 'len':[]},
      {'NO':4, 'len':[]},
      {'NO':5, 'len':[]},
      {'NO':6, 'len':[]},
      {'NO':7, 'len':[]},
    ]);
  }

  const handleClick1 = (event, name) => {
    let newSelected = [];
    newSelected = newSelected.concat(name);
    setSelected1(newSelected)
  }
  const handleClick2 = (event, name) => {
    let newSelected = [];
    newSelected = newSelected.concat(name);
    setSelected2(newSelected)
  }
  const infolink = (event, aaa) => {
    let newDatas1 = leftData
    let newDatas2 = rightData
    for (let i = 0; i < newDatas1.length; i++) {
      if (newDatas1[i].NO == selected1) {
        newDatas1[i].len.push(selected2)
        break;
      }
    }
    let delnum =[]
    for (const elem1 of newDatas2) {
      if (elem1.NO == selected2) {
      }else{
        delnum.push({'NO':elem1.NO})
      }
    }
    setleftData(newDatas1);
    setrightData(delnum)
    let newSelected=parseInt(selected2)+1
    handleClick2(event,newSelected)
  }
  const infolinkRe = (event, aaa) => {
    let newDatas1 = leftData
    let newDatas2 = rightData
    let num1 = selected2
    for (let i = 0; i < newDatas1.length; i++) {
      if (newDatas1[i].NO == selected1) {
        for(let j=newDatas1[i].len.length-1;0<=j;j--){
          newDatas2.push({'NO':parseInt(newDatas1[i].len[j])})
          newDatas1[i].len.pop()
          break;
        }
        break;
      }
    }
    newDatas2.sort(function(a, b) {
      if (a.NO > b.NO) {
        return 1;
      } else {
        return -1;
      }
    })
    setleftData(newDatas1)
    setrightData(newDatas2)
    handleClick2(event,num1-1)
  }

  const printter1 = (name) => {
    let stPrint =""
    console.log("右表示処理" )
    for (const elem1 of leftData) {
      if (elem1.NO == name) {
        for (let i =0;i<elem1.len.length;i++) {
          for (const elem2 of printData) {
            console.log(elem1.len[i] )
            console.log(elem2.NO)
            if (elem1.len[i] == elem2.NO) {
              console.log(elem2.len)
              stPrint = stPrint + elem2.len
              console.log(stPrint)
              break;
            }
          }
        }
        break;
      }
    }
    return stPrint;
  }
  const printter2 = (name) => {
    let stPrint
    for (const elem1 of printData) {
      if (elem1.NO == name) {
        stPrint = elem1.len
        break;
      }
    }
    return stPrint;
  }

  let fileReader = new FileReader();
  const onFileInputChange = (e) => {
    console.log(e.target.files);
    fileReader.readAsText(e.target.files);
  };
  fileReader.onload = () =>{
    console.log(fileReader.result);
  }

  return (
    <div>
      <input type='file' onChange={onFileInputChange}/>
      <div className={classes.box}>
        <div className={classes.box2}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table" className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell component="th" scope="row">{titles.get("key1")}</TableCell>
                  <TableCell align="left" className={classes.task} >{titles.get("key2")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leftData.map((row) => {
                  return (
                    <TableRow key={row.NO} onClick={(event) => handleClick1(event, row.NO)} className={selected1 == row.NO ? classes.TableRow : ""}>
                      <TableCell component="th" scope="row">{row.NO}</TableCell>
                      <TableCell align="left" className={classes.task}>{printter1(row.NO)}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={classes.box3}>
          <br />
          <br />
          <button onClick={(event) => rightInit(event, "init")}>
            init
          </button>
          <br />
          <br />
          <button onClick={(event) => infolink(event, "紐づけ")}>
            紐づけ
          </button>
          <br />
          <br />
          <button onClick={(event) => infolinkRe(event, "戻す")}>
            戻す
          </button>
        </div>
        <div className={classes.box2}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table" className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell component="th" scope="row">{titles.get("key1")}</TableCell>
                  <TableCell align="left" className={classes.task} >{titles.get("key2")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rightData.map((row) => {
                  return (
                    <TableRow key={row.NO} onClick={(event) => handleClick2(event,row.NO)} className={selected2 == row.NO ? classes.TableRow : ""}>
                      <TableCell component="th" scope="row">{row.NO}</TableCell>
                      <TableCell align="left" className={classes.task}>{printter2(row.NO)}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
