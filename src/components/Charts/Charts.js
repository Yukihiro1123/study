import React, { useEffect } from "react";
import {
  // Avatar,
  // Button,
  // ButtonGroup,
  Box,
  Card,
  // CardActions,
  CardContent,
  // Divider,
  // Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  // Container,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

import moment from "moment";

import Chart from "react-apexcharts";
import { getRecords } from "../../actions/records";
import { getProjects } from "../../actions/projects";

// import useStyles from "./styles";

const week = [
  moment().subtract(7, "days").format("YYYY-MM-DD"),
  moment().subtract(6, "days").format("YYYY-MM-DD"),
  moment().subtract(5, "days").format("YYYY-MM-DD"),
  moment().subtract(4, "days").format("YYYY-MM-DD"),
  moment().subtract(3, "days").format("YYYY-MM-DD"),
  moment().subtract(2, "days").format("YYYY-MM-DD"),
  moment().subtract(1, "days").format("YYYY-MM-DD"),
  moment().format("YYYY-MM-DD"),
];
//メモリ・ラベル・凡例
const Charts = ({ darkState }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecords());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);
  const { records } = useSelector((state) => state.records.records);
  const projects = useSelector((state) => state.projects.projects);
  //records.filter((r) => projects.map((p) => p.title === r.name));
  ///momentjsのカレンダー表示が「今日」から始まる今日のレコード
  const records_today = records?.filter((d) =>
    moment(d.createdAt).calendar().startsWith("Today")
  );
  //recordの日付が上で定義したweekに含まれている今週のレコード
  const records_week = records?.filter((d) =>
    week.includes(moment(d.createdAt).format("YYYY-MM-DD"))
  );
  //今日のタスクの作業時間の合計
  const total_today = records_today.reduce((acc, val) => acc + val.duration, 0);
  //今週のタスクの作業時間の合計
  const total_week = records_week.reduce((acc, val) => acc + val.duration, 0);
  //全てのタスクの作業時間
  const total = records.reduce((acc, val) => acc + val.duration, 0);

  //今週行ったタスクのプロジェクト名を抽出
  const uniqueName = [...new Set(records_week.map((item) => item.project))];

  uniqueName.map((n) => {
    //今週行ったタスクを対象にして、プロジェクトごとに、作業履歴が存在する日付を抽出
    const uniqueDay = [
      ...new Set(
        records_week
          .filter((d) => d.project === n)
          .map((item) => moment(item.createdAt).format("YYYY-MM-DD"))
      ),
    ];
    //uniquedayの中に、weekに含まれている日付が見つからなかった場合、weekの日付（⇨タスクを行なっていない日付）を返す
    const zeroDay = week.filter((i) => uniqueDay.indexOf(i) === -1);
    //プロジェクトごとに、タスクを行なっていない日付の作業時間を0で埋め、日付順にソート
    zeroDay.map((z) => {
      records.push({ project: n, duration: 0, createdAt: z, color: "" });
      records.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      return records;
    });
    return records;
  });

  //日付ごとに同じ名前のタスクを集計
  //ぜろで埋められた後に今週の日付を再集計
  const group = records
    .filter((d) => week.includes(moment(d.createdAt).format("YYYY-MM-DD")))
    .reduce((result, current) => {
      //プロジェクト名と日付が同じレコードを見つける
      const element = result.find(
        (p) =>
          p.project === current.project &&
          moment(p.createdAt).format("YYYY-MM-DD") ===
            moment(current.createdAt).format("YYYY-MM-DD")
      );
      //見つかればdurationをたす
      //見つからなければresult内に新たにレコードのデータを作成
      if (element) {
        element.duration += current.duration; // sum
        element.color = current.color;
      } else {
        result.push({
          createdAt: current.createdAt,
          project: current.project,
          duration: current.duration,
          color: current.color,
        });
      }
      return result;
    }, []);

  group
    .filter((item) => item.color !== "")
    .map((g) =>
      projects.map((p) => p.title === g.project && (g.color = p.color))
    );
  console.log(group.filter((item) => item.color !== "").map((g) => g.color));
  //色完全版
  //プロジェクトのデータが残っていない場合は、record内のcolorを使う そうでない場合はprojectからcolorを持ってくる
  //フォーマット: [color, color, color]
  const barColor = group
    .filter((item) => item.color !== "")
    .map((g) => g.color);

  const options = {
    colors: barColor, //色
    chart: {
      foreColor: darkState ? "#fff" : "#000", //dark mode
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      type: "date",
      categories: week,
      labels: {
        style: {
          format: "YYYY-MM-DD",
          colors: darkState ? "#ffffff" : "#000", //dark mode
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: darkState ? "#ffffff" : "#000", //dark mode
        },
      },
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: darkState ? "dark" : "light", //dark mode
    },
  };

  //data value完全版
  //今週行ったタスクのプロジェクト名
  //集計済みレコードのプロジェクト名と今週行ったタスクのプロジェクト名が一致する場合、レコードを抽出 作業時間をmap関数で返す
  //フォーマット
  //{name: "", data: [duration, duration,duration,duration,duration,duration, duration, duration]}
  const series = uniqueName.map(function (el, i) {
    return {
      name: uniqueName[i],
      data: group
        .filter((g) => g.project === uniqueName[i])
        .map(function (el) {
          return el.duration;
        }),
    };
  });
  // 円グラフの変数
  //本日付のデータ
  const data_today = group.filter(
    (d) =>
      moment(d.createdAt).calendar().startsWith("Today") && d.duration !== 0
  );

  const nameArray = data_today.map(function (el) {
    return el.project;
  });
  const durationArray = data_today.map(function (el) {
    return el.duration;
  });

  const colorArray = data_today.map(function (el) {
    return el.color;
  });

  const options2 = {
    chart: {
      foreColor: darkState ? "#fff" : "#000", //dark mode
      type: "bar",
    },
    labels: nameArray,
    colors: colorArray, //色
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: true,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  };
  const series2 = durationArray; //our data

  //table

  return (
    <Grid container spacing={3} sx={{ marginTop: "100px" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent style={{ textAlign: "center" }}>
                <Typography color="primary" gutterBottom>
                  今日
                </Typography>
                <Typography variant="h5">
                  {total_today > 60
                    ? Math.floor(total_today / 60) +
                      "時間" +
                      Math.floor(total_today % 60) +
                      "分"
                    : Math.floor(total_today) + "分"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent style={{ textAlign: "center" }}>
                <Typography color="primary" gutterBottom>
                  今週
                </Typography>
                <Typography variant="h5">
                  {total_week > 60
                    ? Math.floor(total_week / 60) +
                      "時間" +
                      Math.floor(total_week % 60) +
                      "分"
                    : Math.floor(total_week) + "分"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent style={{ textAlign: "center" }}>
                <Typography color="primary" gutterBottom>
                  累計
                </Typography>
                <Typography variant="h5">
                  {total > 60
                    ? Math.floor(total / 60) +
                      "時間" +
                      Math.floor(total % 60) +
                      "分"
                    : Math.floor(total) + "分"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
        <Grid container spacing={2}>
          {/* データデーブル */}
          <Grid item xs={12} md={12} lg={12}>
            <Card sx={{ padding: 2, minWidth: "420px" }}>
              <Typography color="primary" variant="h5">
                作業履歴
              </Typography>
              <Card sx={{ margin: 2, padding: 2 }}>
                <TableContainer sx={{ maxHeight: 700 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>日時</TableCell>
                        <TableCell>タスク名</TableCell>
                        <TableCell>プロジェクト</TableCell>
                        <TableCell>作業時間（分）</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {records
                        .filter((d) => d.duration !== 0)
                        .map((row) => (
                          <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                              {moment(row.createdAt).format(
                                "YYYY-MM-DD HH:MM:SS"
                              )}
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.project}</TableCell>
                            <TableCell>{row.duration}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Card>
          </Grid>
          {/* 円グラフ */}
          <Grid item xs={12} md={12} lg={12}>
            <Card sx={{ padding: 2 }}>
              <Typography color="primary" variant="h5">
                プロジェクトの時間分布
              </Typography>
              <Card
                sx={{
                  margin: 1,
                  marginBottom: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid item>
                  {series2.some((item) => item !== 0) ? (
                    <Chart
                      options={options2}
                      series={series2}
                      type="donut"
                      width="500"
                    />
                  ) : (
                    <Card style={{ width: "690px", height: "370px" }}>
                      <Typography>No data</Typography>
                    </Card>
                  )}
                </Grid>
              </Card>
            </Card>
          </Grid>
          {/* 棒グラフ */}
          <Grid item xs={12} md={12}>
            <Card sx={{ padding: 2, paddingBottom: 0 }}>
              <Typography color="primary" variant="h5">
                作業時間(プロジェクト別)
              </Typography>
              <Card sx={{ margin: 2, padding: 2 }}>
                <Chart
                  options={options}
                  series={series}
                  type="bar"
                  height={300}
                  width="100%"
                />
              </Card>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Charts;
