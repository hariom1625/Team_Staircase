import logo from "./logo.svg";
import bars from "./img/bars.svg";
import search from "./img/search.svg";
import "./App.css";
import GridTable from "@nadavshaar/react-grid-table";
import { useState, useEffect } from "react";
import getColumns from "./getColumns.js";
import axios from "axios";
import moment from "moment";
import code from "./MainAlgoToPrioritizeInCPP.cpp";
import input from "./SampleInput.txt";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [tempRowsData, setTempRowsData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [caseIdToSearch, setCaseIdToSearch] = useState("Type Case ID");
  const [selectedCaseId, setCaseId] = useState("");
  const [newCaseData, setNewCaseData] = useState({
    case_id: "",
    domain: "",
    section: "",
    lastDate: "",
    accusedStatus: "",
  });

  const [sortedCases, setSortedCases] = useState("");
  const reload = () => {
    axios
      .get("http://localhost:4000/api/cases/getcase")
      .then((res) => {
        // console.log(res.data)
        data = [];
        res.data.data.map((item, idx) => {
          let sections = "";
          item.section.map((temp) => {
            if (sections.length === 0) sections += temp.name;
            else sections = sections + "," + temp.name;
          });
          data.push({
            id: idx + 1,
            caseId: item.case_id,
            domain: item.domain,
            details: item.details,
            sections,
            accusedStatus:
              item.accusedStatus === 0
                ? "On Bail"
                : item.accusedStatus === 1
                ? "On Run"
                : "In Jail",
            lastHearingDate: moment(item.lastDate).format("YYYY-MM-DD"),
            proposedDate: "TBD",
            acceptedDate: "",
            // ? moment(item.nextHearingDate).format("YYYY-MM-DD")
            // : "Select a Date",
          });
        });
        setRowsData(data);
        setTempRowsData(data);
        generateSampleInput(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addNewCase = () => {
    newCaseData.chargesheetDate = moment(
      newCaseData.chargesheetDate,
      "YYYY-MM-DD"
    ).utc();
    newCaseData.lastDate = moment(newCaseData.lastDate, "YYYY-MM-DD").utc();
    newCaseData.details = {
      heading: newCaseData.heading,
      description: newCaseData.description,
    };
    axios
      .post("http://localhost:4000/api/cases/newCase", newCaseData)
      .then((res) => {
        console.log("Added");
        reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const prioritizeCases = (output, data) => {
    let currDate = new Date();
    let bandWidth = 5;
    let temp = [];
    output.split(/\r?\n/).forEach((item, idx) => {
      // if(item.length===0) return;
      console.log(typeof item, item.length, item, idx, data);
      if (item.length != 0 && data != 0) {
        if (idx != 0 && idx % bandWidth == 0)
          currDate.setDate(currDate.getDate() + 1);
        let tempCase = data.filter((item1) => item1.caseId === item)[0];

        if (!tempCase) console.log(tempCase, data, item);
        tempCase.proposedDate = moment(currDate).format("YYYY-MM-DD");
        tempCase.acceptedDate = moment(currDate).format("YYYY-MM-DD");
        temp.push(tempCase);
      }
    });
    console.log("hurray", temp, data, currDate);
    setTempRowsData(temp);
  };
  const generateSampleInput = (data) => {
    alert("processing,please wait!");
    axios
      .get("http://localhost:4000/api/cases/sampleInput")
      .then((res) => {
        console.log(res.data.data);
        // setSampleInput(res.data.data)
        fetch(code)
          .then((r) => r.text())
          .then((text) => {
            algo1 = text;
            input1 = res.data.data;
            submit(data);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setLoading(true);
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
            id: idx + 1,
            caseId: item.case_id,
            domain: item.domain,
            details: item.details,
            sections,
            accusedStatus:
              item.accusedStatus === 0
                ? "On Bail"
                : item.accusedStatus === 1
                ? "On Run"
                : "In Jail",
            lastHearingDate: moment(item.lastDate).format("YYYY-MM-DD"),
            proposedDate: "TBD",
            acceptedDate: "",
            // ? moment(item.nextHearingDate).format("YYYY-MM-DD")
            // : "Select a Date",
          });
        });
        setRowsData(data);
        setTempRowsData(data);
        // generateSampleInput(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submit = async (data) => {
    console.log(algo1 + input1);
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
      setSortedCases(output);
      prioritizeCases(output, data);
    } else if (jsonGetSolution.stderr) {
      const error = atob(jsonGetSolution.stderr);
      console.log(error + "err");
    } else {
      const compilation_error = atob(jsonGetSolution.compile_output);
    }
  };

  return (
    <div className="Main">
      <div className="d-flex" style={{ padding: "30px" }}>
        <div className="search-bar" style={{ width: "85vw" }}>
          <div className="d-flex search-bar-box">
            <div>
              <img
                src={bars}
                style={{ width: "25px", margin: "5px 10px" }}
              ></img>
            </div>
            <input
              style={{ width: "95%" }}
              className="search-text"
              value={caseIdToSearch}
              onChange={(event) => {
                setCaseIdToSearch(event.target.value);
              }}
            ></input>
            <div>
              <img
                src={search}
                style={{ width: "25px", margin: "5px 10px", cursor: "pointer" }}
                onClick={() => {
                  if (caseIdToSearch.trim().length === 0) {
                    setTempRowsData(rowsData);
                  } else {
                    let temp = rowsData.filter(
                      (item) => item.caseId == caseIdToSearch
                    );
                    console.log(
                      "clicked",
                      temp,
                      caseIdToSearch,
                      rowsData,
                      rowsData.filter((item) => item.caseId == "3")
                    );
                    setTempRowsData(temp);
                  }
                }}
              ></img>
            </div>
          </div>
        </div>
       
        <button
          style={{
            width: "10vw",
            height: "40px",
            marginTop: "30px",
            marginLeft: "20px",
          }}
          type="button"
          className="btn btn-primary custom-button"
          onClick={() => {
            localStorage.setItem("isLoggedIn", "false");
            window.location.replace("http://localhost:3000/");
          }}
        >
          Logout
        </button>
      </div>
      <div className="d-flex">
      <button
          style={{
            width: "35vw",
            height: "70px",
            marginTop: "30px",
            marginLeft: "6vw",
          }}
          type="button"
          className="btn btn-primary custom-button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Insert New Case
        </button>
        <button
          style={{
            width: "35vw",
            height: "70px",
            marginTop: "30px",
            marginLeft: "14vw",
          }}
          type="button"
          className="btn btn-primary custom-button"
          onClick={()=>{generateSampleInput(data)}}
        >
          Process Cases
        </button>
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
              <span style={{ fontSize: "76px" }}>9</span>
              <br></br>
              <span>Hearings today</span>
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
              <span style={{ fontSize: "76px" }}>6</span>
              <br></br>
              <span>Cases need validation</span>
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
              <span style={{ fontSize: "76px" }}>80</span>
              <br></br>
              <span>Cases which has last hearing date {">"} 6 Month</span>
            </p>
          </div>
        </div>
      </div>
      <p style={{marginLeft:"70px"}}> Click on the Case ID to see more details about the case</p>
      <div className="react-table">
        <GridTable
          columns={getColumns(
            { setRowsData },
            startDate,
            setStartDate,
            setCaseId
          )}
          rows={tempRowsData}
          isPaginated={false}
          // isLoading={isLoading}
        />
      </div>
      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add new case
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="case_id" class="form-label">
                    Case Id {newCaseData.case_id}
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="case_id"
                    aria-describedby="case_id"
                    value={newCaseData.case_id}
                    onChange={(event) => {
                      let temp = JSON.parse(JSON.stringify(newCaseData));
                      temp[event.target.id] = event.target.value;
                      setNewCaseData(temp);
                    }}
                  ></input>
                  {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div class="mb-3">
                  <label for="domain" class="form-label">
                    Domain
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="domain"
                    aria-describedby="domain"
                    value={newCaseData.domain}
                    onChange={(event) => {
                      let temp = JSON.parse(JSON.stringify(newCaseData));
                      temp[event.target.id] = event.target.value;
                      setNewCaseData(temp);
                    }}
                  ></input>
                  {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div class="mb-3">
                  <label for="section" class="form-label">
                    Sections
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="section"
                    aria-describedby="section"
                    value={newCaseData.section}
                    onChange={(event) => {
                      let temp = JSON.parse(JSON.stringify(newCaseData));
                      temp[event.target.id] = event.target.value;
                      setNewCaseData(temp);
                    }}
                  ></input>
                  {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div class="mb-3">
                  <label for="accusedStatus" class="form-label">
                    Accused Status
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="accusedStatus"
                    aria-describedby="accusedStatus"
                    value={newCaseData.accusedStatus}
                    onChange={(event) => {
                      let temp = JSON.parse(JSON.stringify(newCaseData));
                      temp[event.target.id] = event.target.value;
                      setNewCaseData(temp);
                    }}
                  ></input>
                  {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div class="mb-3">
                  <label for="chargesheetDate" class="form-label">
                    Chargesheet Date
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="chargesheetDate"
                    aria-describedby="chargesheetDate"
                    value={newCaseData.chargesheetDate}
                    onChange={(event) => {
                      let temp = JSON.parse(JSON.stringify(newCaseData));
                      temp[event.target.id] = event.target.value;
                      setNewCaseData(temp);
                    }}
                  ></input>
                  {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div class="mb-3">
                  <label for="lastDate" class="form-label">
                    Last Hearing Date
                  </label>
                  
                  <input
                    type="text"
                    class="form-control"
                    id="lastDate"
                    aria-describedby="lastDate"
                    value={newCaseData.lastDate}
                    onChange={(event) => {
                      let temp = JSON.parse(JSON.stringify(newCaseData));
                      temp[event.target.id] = event.target.value;
                      setNewCaseData(temp);
                    }}
                  ></input>
                  {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div class="mb-3">
                  <label for="heading" class="form-label">
                    Heading
                  </label>
                  <textarea
                    class="form-control"
                    id="heading"
                    aria-describedby="heading"
                    value={newCaseData.heading || ""}
                    onChange={(event) => {
                      let temp = JSON.parse(JSON.stringify(newCaseData));
                      temp[event.target.id] = event.target.value;
                      setNewCaseData(temp);
                    }}
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">
                    Description
                  </label>
                  <textarea
                    class="form-control"
                    id="description"
                    aria-describedby="description"
                    value={newCaseData.description || ""}
                    onChange={(event) => {
                      let temp = JSON.parse(JSON.stringify(newCaseData));
                      temp[event.target.id] = event.target.value;
                      setNewCaseData(temp);
                    }}
                  ></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={addNewCase}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="caseModal"
        tabindex="-1"
        aria-labelledby="caseModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="caseModalLabel">
                Case ID {selectedCaseId}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {/* <p>{JSON.stringify(rowsData.filter(item => item.caseId === selectedCaseId))}</p> */}

              <h3>
                {rowsData.filter((item) => item.caseId === selectedCaseId)[0]
                  ? rowsData.filter((item) => item.caseId === selectedCaseId)[0]
                      .details
                    ? rowsData.filter(
                        (item) => item.caseId === selectedCaseId
                      )[0].details[0]
                      ? rowsData.filter(
                          (item) => item.caseId === selectedCaseId
                        )[0].details[0].heading
                      : ""
                    : ""
                  : ""}
              </h3>
              <p>
                {rowsData.filter((item) => item.caseId === selectedCaseId)[0]
                  ? rowsData.filter((item) => item.caseId === selectedCaseId)[0]
                      .details
                    ? rowsData.filter(
                        (item) => item.caseId === selectedCaseId
                      )[0].details[0]
                      ? rowsData.filter(
                          (item) => item.caseId === selectedCaseId
                        )[0].details[0].description
                      : ""
                    : ""
                  : ""}
              </p>

              <h5 style={{ marginTop: "50px" }}>
                {" "}
                Sections Involved{" "}
                {rowsData.filter((item) => item.caseId === selectedCaseId)[0]
                  ? rowsData.filter((item) => item.caseId === selectedCaseId)[0]
                      .domain
                  : "Not Available"}
                :{" "}
                {rowsData.filter((item) => item.caseId === selectedCaseId)[0]
                  ? rowsData.filter((item) => item.caseId === selectedCaseId)[0]
                      .sections
                  : ""}
              </h5>
              <h5>
                {" "}
                Chargesheet Filing Date :{" "}
                {rowsData.filter((item) => item.caseId === selectedCaseId)[0]
                  ? rowsData.filter((item) => item.caseId === selectedCaseId)[0]
                      .chargesheetDate
                  : "Not Available"}
              </h5>
              <h5 style={{ marginBottom: "50px" }}>
                {" "}
                Last Hearing Date :{" "}
                {rowsData.filter((item) => item.caseId === selectedCaseId)[0]
                  ? rowsData.filter((item) => item.caseId === selectedCaseId)[0]
                      .lastDate
                  : "Not Available"}
              </h5>
              {/* <h5> Next Hearing Date Proposed By the System : {rowsData.filter(item => item.caseId===selectedCaseId)[0] ? rowsData.filter(item => item.caseId===selectedCaseId)[0].chargesheetDate : "Not Available" }</h5> */}

              <h5>
                {rowsData.filter((item) => item.caseId === selectedCaseId)[0]
                  ? rowsData.filter((item) => item.caseId === selectedCaseId)[0]
                      .details[1]
                    ? rowsData.filter(
                        (item) => item.caseId === selectedCaseId
                      )[0].details[1]
                      ? rowsData.filter(
                          (item) => item.caseId === selectedCaseId
                        )[0].details[1].heading
                      : ""
                    : ""
                  : ""}
              </h5>
              <p>
                {rowsData.filter((item) => item.caseId === selectedCaseId)[0]
                  ? rowsData.filter((item) => item.caseId === selectedCaseId)[0]
                      .details[1]
                    ? rowsData.filter(
                        (item) => item.caseId === selectedCaseId
                      )[0].details[1]
                      ? rowsData.filter(
                          (item) => item.caseId === selectedCaseId
                        )[0].details[1].description
                      : ""
                    : ""
                  : ""}
              </p>
              <h5>
                {rowsData.filter((item) => item.caseId === selectedCaseId)[0]
                  ? rowsData.filter((item) => item.caseId === selectedCaseId)[0]
                      .details[2]
                    ? rowsData.filter(
                        (item) => item.caseId === selectedCaseId
                      )[0].details[2]
                      ? rowsData.filter(
                          (item) => item.caseId === selectedCaseId
                        )[0].details[2].heading
                      : ""
                    : ""
                  : ""}
              </h5>
              <p>
                {rowsData.filter((item) => item.caseId === selectedCaseId)[0]
                  ? rowsData.filter((item) => item.caseId === selectedCaseId)[0]
                      .details[2]
                    ? rowsData.filter(
                        (item) => item.caseId === selectedCaseId
                      )[0].details[2]
                      ? rowsData.filter(
                          (item) => item.caseId === selectedCaseId
                        )[0].details[2].description
                      : ""
                    : ""
                  : ""}
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
