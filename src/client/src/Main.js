import logo from "./logo.svg";
import bars from "./img/bars.svg";
import search from "./img/search.svg";
import "./App.css";
import GridTable from "@nadavshaar/react-grid-table";
import { useState, useEffect } from "react";
import getColumns from "./getColumns.js";
import axios from "axios";
import moment from "moment";
import code from "./code.txt";
import input from "./input.txt";

// const data = [
//   {
//     id: 1,
//     caseId: "1289",
//     domain: "Violence",
//     sections: "301,302",
//     accusedStatus: "on Bail",
//     // chargesheetDate: "12/08/2019",
//     lastHearingDate: "12/08/2019",
//     proposedDate: "12/08/2019",
//     acceptedDate: "06/10/2019",
//   },
//   {
//     id: 2,
//     caseId: "3242",
//     domain: "Robbery",
//     sections: "102,101",
//     accusedStatus: "In Jail",
//     // chargesheetDate: "12/01/2018",
//     lastHearingDate: "02/01/2018",
//     proposedDate: "12/08/2019",
//     acceptedDate: "12/08/2019",
//   },
//   {
//     id: 3,
//     caseId: "4219",
//     domain: "Mischief",
//     sections: "426",
//     accusedStatus: "on Run",
//     // chargesheetDate: "12/08/2019",
//     lastHearingDate: "12/08/2019",
//     proposedDate: "12/08/2019",
//     acceptedDate: "12/08/2019",
//   },
//   {
//     id: 4,
//     caseId: "3219",
//     domain: "Tresspass",
//     sections: "447,448",
//     accusedStatus: "on Bail",
//     // chargesheetDate: "12/08/2019",
//     lastHearingDate: "12/08/2019",
//     proposedDate: "12/08/2019",
//     acceptedDate: "12/08/2019",
//   },
//   {
//     id: 5,
//     caseId: "3001",
//     domain: "Violence",
//     sections: "301,302",
//     accusedStatus: "on Bail",
//     // chargesheetDate: "12/08/2019",
//     lastHearingDate: "12/08/2019",
//     proposedDate: "12/08/2019",
//     acceptedDate: "12/08/2019",
//   },
//   {
//     id: 6,
//     caseId: "109",
//     domain: "Forgery",
//     sections: "465,466,468",
//     accusedStatus: "In Jail",
//     // chargesheetDate: "12/08/2019",
//     lastHearingDate: "12/08/2019",
//     proposedDate: "2/01/2022",
//     acceptedDate: "2/01/2022",
//   },
// ]
let algo1 = "1";
let input1 = "1";
let data = [];
function Main() {
  const [clicked, setClicked] = useState(false);
  const [redClicked, setRedClicked] = useState(false);
  const [greenClicked, setGreenClicked] = useState(false);
  const [rowsData, setRowsData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log(code);
    // setRowsData(data);

    fetch(code)
      .then((r) => r.text())
      .then((text) => (algo1 = text));
    fetch(input)
      .then((r) => r.text())
      .then((text) => {
        input1 = text;
        submit();
      });

    axios
      .get("http://localhost:4000/api/cases/getcase")
      .then((res) => {
        // console.log(res.data)

        res.data.data.map((item, idx) => {
          let sections = "";
          item.section.map((temp) => {
            if (sections.length === 0) sections += temp.name;
            else sections = sections + "," + temp.name;
          });
          data.push({
            id: idx,
            caseId: item.case_id,
            domain: item.domain,
            sections,
            accusedStatus:
              item.accusedStatus === 0
                ? "On Bail"
                : item.accusedStatus === 1
                ? "On Run"
                : "In Jail",
            lastHearingDate: moment(item.lastDate).format("YYYY-MM-DD"),
            proposedDate: "2022-02-01",
            acceptedDate: item.nextHearingDate
              ? moment(item.nextHearingDate).format("YYYY-MM-DD")
              : "Select a Date",
          });
        });
        setRowsData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submit = async () => {
    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions",
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": process.env.REACT_APP_RAPID_HOST,
          "x-rapidapi-key": process.env.REACT_APP_RAPID_KEY,
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          source_code: algo1,
          stdin: input1,
          language_id: 54,
        }),
      }
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse + "jsonres");
    let jsonGetSolution = {
      status: {
        description: "Queue",
      },
      stderr: null,
      compile_output: null,
    };

    while (
      jsonGetSolution.status.description !== "Accepted" &&
      jsonGetSolution.stderr == null &&
      jsonGetSolution.compile_output == null
    ) {
      if (jsonResponse.token) {
        let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;

        const getSolution = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-key": process.env.REACT_APP_RAPID_KEY,
            "x-rapidapi-host": process.env.REACT_APP_RAPID_HOST,
            "content-type": "application/json",
          },
        });

        jsonGetSolution = await getSolution.json();
      }
    }

    if (jsonGetSolution.stdout) {
      const output = atob(jsonGetSolution.stdout);
      console.log(output);
    } else if (jsonGetSolution.stderr) {
      const error = atob(jsonGetSolution.stderr);
      console.log(error + "err");
    } else {
      const compilation_error = atob(jsonGetSolution.compile_output);
    }
  };

  return (
    <div className="Main">
      <div className="search-bar">
        <div className="d-flex search-bar-box">
          <div>
            <img src={bars} style={{ width: "25px", margin: "5px 10px" }}></img>
          </div>
          <input
            style={{ width: "95%" }}
            className="search-text"
            value="Type Case ID here"
          ></input>
          <div>
            <img
              src={search}
              style={{ width: "25px", margin: "5px 10px" }}
            ></img>
          </div>
        </div>
      </div>
      <div className="widget-container">
        <div className="d-flex widget-box">
          <div
            className="widget"
            style={{
              marginRight: "180px",
              marginLeft: "15px",
              border: "3px solid #FFA004",
              backgroundColor: clicked ? "#FFA004" : "white",
              color: clicked ? "white" : "black",
              cursor: "pointer",
            }}
            onClick={() => setClicked(!clicked)}
          >
            <p style={{ textAlign: "center", margin: "10px 0px" }}>
              <span style={{ fontSize: "76px" }}>91</span>
              <br></br>
              <span>hearings today</span>
            </p>
          </div>
          <div
            className="widget"
            style={{
              marginRight: "180px",
              border: "3px solid #23CA34",
              backgroundColor: greenClicked ? "#23CA34" : "white",
              color: greenClicked ? "white" : "black",
              cursor: "pointer",
            }}
            onClick={() => setGreenClicked(!greenClicked)}
          >
            <p style={{ textAlign: "center", margin: "10px 0px" }}>
              <span style={{ fontSize: "76px" }}>11</span>
              <br></br>
              <span>cases need validation</span>
            </p>
          </div>
          <div
            className="widget"
            style={{
              border: "3px solid #EC2E2E",
              backgroundColor: redClicked ? "#EC2E2E" : "white",
              color: redClicked ? "white" : "black",
              cursor: "pointer",
            }}
            onClick={() => setRedClicked(!redClicked)}
          >
            <p style={{ textAlign: "center", margin: "10px 0px" }}>
              <span style={{ fontSize: "76px" }}>1103</span>
              <br></br>
              <span>
                cases has priority high but next proposed hearing date {">"}{" "}
                1month
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="react-table">
        <GridTable
          columns={getColumns({ setRowsData })}
          rows={rowsData}
          isPaginated={false}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default Main;
