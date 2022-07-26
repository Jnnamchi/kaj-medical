/* eslint-disable no-console,func-names,react/no-multi-comp */
import React, { useEffect, useState } from "react";
import Table from "rc-table";

const columns1 = [
  {
    title: "title1",
    dataIndex: "a",
    key: "a",
    width: 100
  },
  { title: "title2", dataIndex: "b", key: "b", width: 100 },
  { title: "title3", dataIndex: "c", key: "c", width: 100 },
  { title: "title4", dataIndex: "b", key: "d", width: 100 },
  { title: "title5", dataIndex: "b", key: "e", width: 100 },
  { title: "title6", dataIndex: "b", key: "f", width: 100 },
  { title: "title7", dataIndex: "b", key: "g", width: 100 }
];

const data1 = [
  { a: "123", b: "xxxxxxxx xxxxxxxx", d: 3, key: "1" },
  { a: "cdd", b: "edd12221 edd12221", d: 3, key: "2" },
  { a: "133", c: "edd12221 edd12221", d: 2, key: "3" },
  { a: "133", c: "edd12221 edd12221", d: 2, key: "4" }
];

const columns = [
  {
    title: "title1",
    dataIndex: "a",
    className: "a",
    key: "a",
    width: 100
  },
  {
    id: "123",
    title: "title2",
    dataIndex: "b",
    className: "b",
    key: "b",
    width: 100
  },
  {
    title: "title3",
    dataIndex: "c",
    className: "c",
    key: "c",
    width: 200
  },
  {
    title: "Operations",
    dataIndex: "",
    className: "d",
    key: "d",
    render() {
      return <a href="#">Operations</a>;
    }
  }
];

const data = [
  { a: "123", key: "1" },
  { a: "cdd", b: "edd", key: "2" },
  { a: "1333", c: "eee", d: 2, key: "3" }
];

interface SimpleTableProps {
  header?: string[];
  body?: string[][];
  scrollY?: boolean;
}
const SimpleTable = ({ header, body, scrollY }: SimpleTableProps) => {
  // const columns = header.map((label: string, idx: number) => ({
  //   title: label,
  //   dataIndex: idx,
  //   key: idx
  // }));
  // const data = [];
  // for (const row of body) {
  //   let result: any = {};
  //   for (let i = 0; i < row.length; i++) {
  //     result[i] = row[i];
  //   }
  //   data.push({ ...result });
  // }
  const [scroll, setScroll] = useState({});
  useEffect(() => {
    if (scrollY) {
      setScroll({ x: 800, y: 500 });
    } else {
      setScroll({ x: 800 });
    }
  }, [scrollY]);

  return <Table style={{ width: "100%" }} scroll={scroll} columns={columns} data={data} sticky />;
};
export default SimpleTable;
