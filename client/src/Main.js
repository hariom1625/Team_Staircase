import logo from './logo.svg';
import bars from './img/bars.svg'
import search from './img/search.svg'
import './App.css';
import GridTable from "@nadavshaar/react-grid-table";
import { useState,useEffect } from 'react';
import getColumns from "./getColumns.js";

const data = [
  {
    id: 1,
    caseId: "1289",
    domain: "Violence",
    sections: "301,302",
    accusedStatus: "on Bail",
    // chargesheetDate: "12/08/2019",
    lastHearingDate: "12/08/2019",
    proposedDate: "12/08/2019",
    acceptedDate: "06/10/2019",
  },
  {
    id: 2,
    caseId: "3242",
    domain: "Robbery",
    sections: "102,101",
    accusedStatus: "In Jail",
    // chargesheetDate: "12/01/2018",
    lastHearingDate: "02/01/2018",
    proposedDate: "12/08/2019",
    acceptedDate: "12/08/2019",
  },
  {
    id: 3,
    caseId: "4219",
    domain: "Mischief",
    sections: "426",
    accusedStatus: "on Run",
    // chargesheetDate: "12/08/2019",
    lastHearingDate: "12/08/2019",
    proposedDate: "12/08/2019",
    acceptedDate: "12/08/2019",
  },
  {
    id: 4,
    caseId: "3219",
    domain: "Tresspass",
    sections: "447,448",
    accusedStatus: "on Bail",
    // chargesheetDate: "12/08/2019",
    lastHearingDate: "12/08/2019",
    proposedDate: "12/08/2019",
    acceptedDate: "12/08/2019",
  },
  {
    id: 5,
    caseId: "3001",
    domain: "Violence",
    sections: "301,302",
    accusedStatus: "on Bail",
    // chargesheetDate: "12/08/2019",
    lastHearingDate: "12/08/2019",
    proposedDate: "12/08/2019",
    acceptedDate: "12/08/2019",
  },
  {
    id: 6,
    caseId: "109",
    domain: "Forgery",
    sections: "465,466,468",
    accusedStatus: "In Jail",
    // chargesheetDate: "12/08/2019",
    lastHearingDate: "12/08/2019",
    proposedDate: "2/01/2022",
    acceptedDate: "2/01/2022",
  },
]

function Main() {
    const [clicked,setClicked] = useState(false); 
    const [redClicked,setRedClicked] = useState(false);
    const [greenClicked,setGreenClicked] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setRowsData(data);
        setLoading(false);
      }, 1500);
    }, []);
    

    
  return (
    <div className="Main">
      <div className="search-bar">
          <div className="d-flex search-bar-box">
              <div><img src={bars} style={{width:"25px",margin:"5px 10px"}}></img></div>
              <input style={{width:"95%"}} className="search-text" value="Type Case ID here"></input>
              <div><img src={search} style={{width:"25px",margin:"5px 10px"}}></img></div>
          </div>
      </div>
      <div className="widget-container"> 
      <div className="d-flex widget-box">
              <div className="widget" style={{marginRight:"180px",marginLeft:"15px", border: "3px solid #FFA004",backgroundColor:clicked?"#FFA004":"white",color:clicked?"white":"black",cursor:"pointer"}} onClick={() => setClicked(!clicked)}> 
              <p style={{textAlign:"center",margin:"10px 0px"}}><span style={{fontSize:"76px"}}>91</span><br></br><span>hearings today</span></p></div>
              <div className="widget" style={{marginRight:"180px", border: "3px solid #23CA34",backgroundColor:greenClicked?"#23CA34":"white",color:greenClicked?"white":"black",cursor:"pointer"}} onClick={() => setGreenClicked(!greenClicked)}>
              <p style={{textAlign:"center",margin:"10px 0px"}}><span style={{fontSize:"76px"}}>11</span><br></br><span>cases need validation</span></p>
              </div>
              <div className="widget" style={{border: "3px solid #EC2E2E",backgroundColor:redClicked?"#EC2E2E":"white",color:redClicked?"white":"black",cursor:"pointer"}} onClick={() => setRedClicked(!redClicked)}>
              <p style={{textAlign:"center",margin:"10px 0px"}}><span style={{fontSize:"76px"}}>1103</span><br></br><span>cases has priority high but next proposed hearing date {'>'} 1month</span></p>
              </div>
          </div>
      </div>
      <div className="react-table">
      <GridTable columns={getColumns({ setRowsData })} rows={rowsData} isPaginated={false} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default Main;
