/* eslint-disable no-console,func-names,react/no-multi-comp */
import React, { useEffect, useState } from "react";
import Table from "rc-table";

interface SimpleTableProps {
  header: string[];
  body: string[][];
  scrollY?: boolean;
}
const SimpleTable = ({ header, body, scrollY }: SimpleTableProps) => {
  const columns = header.map((label: string, idx: number) => ({
    title: label,
    dataIndex: idx,
    key: idx,
    ellipsis: true
  }));
  const data = [];
  for (const row of body) {
    let result: any = {};
    for (let i = 0; i < row.length; i++) {
      result[i] = row[i];
    }
    data.push({ ...result });
  }
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
