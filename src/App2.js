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
import { InputLabel } from '@material-ui/core';

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

function createData(no, task, limit, status, iraimoto) {
  return { no, task, limit, status, iraimoto };
}

const titles = [
  createData('No', 'task', 'limit', 'status', 'iraimoto'),
];

const datas = [
  createData(1, 'ABC', '20210525', '進行中', 'master'),
  createData(2, 'aiueo', '20210625', '進行中', 'master'),
  createData(3, 'あいうえお', '20210527', '未着手', 'master'),
  createData(4, '１２３４５', '20211025', '未着手', 'master'),
  createData(5, 'ZZZZ', '20210525', '達成', 'master'),
  createData(6, '＠＠＠', '20210625', '達成', 'master'),
  createData(7, 'アイウ', '20210527', '未着手', 'master'),
  createData(8, '亜伊宇', '20211025', '失敗', 'master'),
];
const datas1 = [
  createData(1,),
  createData(2,),
  createData(3,),
  createData(4,),
  createData(5,),
  createData(6,),
  createData(7,),
  createData(8,),
];
const datas2 = [
  createData(1),
  createData(2),
  createData(3),
  createData(4),
  createData(5),
  createData(6),
  createData(7),
  createData(8),
];

let aaa

export default function TaskList() {
  const classes = useStyles();
  const [selected1, setSelected1] = React.useState(String);
  const [selected2, setSelected2] = React.useState(String);
  const [datas11, setdatas1] = React.useState(datas1);
  const [datas22, setdatas2] = React.useState(datas2);
  const [inputText, setinputText] = React.useState();
  console.log("aaa",datas11)
  console.log("aaa",datas22)

  const handleClick1 = (event, name) => {
    console.log(name)
    const selectedIndex = selected1.indexOf(name);
    let newSelected = [];
    newSelected = newSelected.concat(name);
    setSelected1(newSelected)
    console.log(newSelected)
    console.log(selected1)
  }
  const handleClick2 = (event, name) => {
    console.log(name)
    const selectedIndex = selected2.indexOf(name);
    let newSelected = [];
    newSelected = newSelected.concat(name);
    setSelected2(newSelected)
    console.log(newSelected)
    console.log(selected2)
  }
  const infolink = (event, aaa) => {
    console.log("b-0",datas11)
    console.log("c-0",datas22)
    let newDatas1 = datas1
    let newDatas2 = datas2
    for (let i = 0; i < newDatas1.length; i++) {
      if (newDatas1[i].no == selected1) {
        newDatas1[i].task = selected2
        break;
      }
    }
    for (let i = 0; i < newDatas2.length; i++) {
      if (newDatas2[i].no == selected2) {
        newDatas2.splice(i, 1);
        console.log("datas2:",datas2)
        break;
      }
    }
    console.log("b-1",datas11)
    console.log("c-1",datas22)
    setdatas1("")
    setdatas2("")
    setdatas1(newDatas1);
    setdatas2(newDatas2)
    console.log("b-2",datas11)
    console.log("c-2",datas22)
    handleClick1(selected1+1)
    handleClick2(selected2)
  }
  const infolinkRe= (event, aaa) => {
    console.log(aaa);
    let newDatas1 = datas1
    let newDatas2 = datas2
    for (let i = 0; i < newDatas1.length; i++) {
      if (newDatas1[i].no == selected1) {
        newDatas2.push(createData(parseInt(newDatas1[i].task)))
        newDatas1[i].task = 0
        break;
      }
    }
    newDatas2.sort(function(a, b) {
      if (a.no > b.no) {
        return 1;
      } else {
        return -1;
      }
    })
    console.log(newDatas2);
    setdatas1(newDatas1)
    setdatas2(newDatas2)
    handleClick1(selected1)
    handleClick2(selected2)

  }
  const infolinkAdd= (event, aaa) => {
  }  
  const infolinkCl= (event, aaa) => {
  }  
  const infolinkBi= (event, aaa) => {
  }  
  const printter1 = (name) => {
    let stPrint
    for (const elem1 of datas1) {
      if (elem1.no == name) {
        for (const elem2 of datas) {
          if (elem2.no == elem1.task) {
            stPrint = elem2.task;
            break;
          }
        }
        break;
      }
    }
    return stPrint;
  }
  const printter2 = (name) => {
    let stPrint
    for (const elem of datas) {
      if (elem.no == name) {
        stPrint = elem.task;
        break;
      }
    }
    return stPrint;
  }

  const handleOnChange = (aaa) => {
    setinputText(aaa);
    console.log(aaa)
    console.log(inputText)
  }
  return (
    <div>
      <div className={classes.box}>
        <div className={classes.box2}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table" className={classes.table}>
              <TableHead>
                {titles.map((row) => (
                  <TableRow key={titles.no}>
                    <TableCell component="th" scope="row">
                      {row.no}
                    </TableCell>
                    <TableCell align="left" className={classes.task} >{row.task}</TableCell>
                    {/* <TableCell align="left">{row.limit}</TableCell>
                    <TableCell align="left" className={classes.status}>{row.status}</TableCell>
                    <TableCell align="left">{row.iraimoto}</TableCell> */}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {datas1.map((row) => {
                  // const isItemSelected = isSelected(row.name);
                  return (
                    <TableRow key={row.no} onClick={(event) => handleClick1(event, row.no)} className={selected1 == row.no ? classes.TableRow : ""}>
                      <TableCell component="th" scope="row">{row.no}</TableCell>
                      <TableCell align="left" className={classes.task}>{printter1(row.no)}</TableCell>
                      {/* <TableCell align="left">{row.limit}</TableCell>
                      <TableCell align="left" className={classes.status}>{row.status}</TableCell>
                      <TableCell align="left">{row.iraimoto}</TableCell> */}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div  className={classes.box3}>
      <br />
      <br />

        <button onClick={(event) => infolink(event, "紐づけ")}>
          紐づけ
      </button>
      <br />
      <br />
        <button onClick={(event) => infolinkAdd(event, "追加紐づけ")}>
          追加紐づけ
      </button>
      <br />
      <br />
        <button onClick={(event) => infolinkRe(event, "戻す")}>
          戻す
      </button>
      <br />
      <br />
        <button onClick={(event) => infolinkBi(event, "固定値入力")}>
          固定値入力
      </button>
      <br />
      <br />
        <button onClick={(event) => infolinkCl(event, "クリア")}>
          クリア
      </button>
      </div>
        <div className={classes.box2}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table" className={classes.table}>
              <TableHead>
                {titles.map((row) => (
                  <TableRow key={titles.no}>
                    <TableCell component="th" scope="row">
                      {row.no}
                    </TableCell>
                    <TableCell align="left" className={classes.task} >{row.task}</TableCell>
                    {/* <TableCell align="left">{row.limit}</TableCell>
                  <TableCell align="left" className={classes.status}>{row.status}</TableCell>
                  <TableCell align="left">{row.iraimoto}</TableCell> */}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {datas2.map((row) => {
                  // const isItemSelected = isSelected(row.name);
                  return (
                    <TableRow key={row.no} onClick={(event) => handleClick2(event, row.no)} className={selected2 == row.no ? classes.TableRow : ""}>
                      <TableCell component="th" scope="row">{row.no}</TableCell>
                      <TableCell align="left" className={classes.task}>{printter2(row.no)}</TableCell>
                      {/* <TableCell align="left">{row.limit}</TableCell>
                    <TableCell align="left" className={classes.status}>{row.status}</TableCell>
                    <TableCell align="left">{row.iraimoto}</TableCell> */}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <br/>
      <br/>
      <p>ここに入力<input type="text" value={aaa} /></p>
      <br/>
      <br/>
    </div>
  );
}
