import React from "react";
import DatePicker from "react-datepicker";

const EDIT_SVG = ( 
  <svg
    height="16"
    viewBox="0 0 20 20"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="#fff" stroke="#1856bf" transform="translate(2 2)">
      <path
        d="m8.24920737-.79402796c1.17157287 0 2.12132033.94974747 2.12132033 2.12132034v13.43502882l-2.12132033 3.5355339-2.08147546-3.495689-.03442539-13.47488064c-.00298547-1.16857977.94191541-2.11832105 2.11049518-2.12130651.00180188-.00000461.00360378-.00000691.00540567-.00000691z"
        transform="matrix(.70710678 .70710678 -.70710678 .70710678 8.605553 -3.271644)"
      />
      <path d="m13.5 4.5 1 1" />
    </g>
  </svg>
);
const CANCEL_SVG = (
  <svg
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" stroke="#dc1e1e" transform="translate(5 5)">
      <path d="m.5 10.5 10-10" />
      <path d="m10.5 10.5-10-10z" />
    </g>
  </svg>
);
const SAVE_SVG = (
  <svg
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m.5 5.5 3 3 8.028-8"
      fill="none"
      stroke="#4caf50"
      transform="translate(5 6)"
    />
  </svg>
);

const styles = {
  select: { margin: "0 20px" },
  buttonsCellContainer: {
    padding: "0 20px",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  editButton: {
    background: "#f3f3f3",
    outline: "none",
    cursor: "pointer",
    padding: 4,
    display: "inline-flex",
    border: "none",
    borderRadius: "50%",
    boxShadow: "1px 1px 2px 0px rgb(0 0 0 / .3)"
  },
  buttonsCellEditorContainer: {
    height: "100%",
    width: "100%",
    display: "inline-flex",
    padding: "0 20px",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  cancelButton: {
    background: "#f3f3f3",
    outline: "none",
    cursor: "pointer",
    marginRight: 10,
    padding: 2,
    display: "inline-flex",
    border: "none",
    borderRadius: "50%",
    boxShadow: "1px 1px 2px 0px rgb(0 0 0 / .3)"
  },
  saveButton: {
    background: "#f3f3f3",
    outline: "none",
    cursor: "pointer",
    padding: 2,
    display: "inline-flex",
    border: "none",
    borderRadius: "50%",
    boxShadow: "1px 1px 2px 0px rgb(0 0 0 / .3)"
  }
};

const getColumns = ({ setRowsData },startDate,setStartDate,setCaseId) => {
  return [
    {
        id: 1,
        field: "caseId",
        label: "Case ID",
        pinned: true,
        width:"100px",
        className:"bold-columns",
        editable:false,
        cellRenderer: ({
          tableManager,
          value,
          data,
          column,
          colIndex,
          rowIndex
        }) => (
          <div >
           <p style={{marginLeft:"45px",cursor:"pointer"}} data-bs-toggle="modal" data-bs-target="#caseModal" onClick={() => setCaseId(value)}>{value}</p>
           
          </div>
        ),
        },
      {
        id: 2,
        field: "domain",
        label: "Domain",
        className:"bold-columns",
        editable:false
        },
      {
        id: 3,
        field: "sections",
        label: "Sections Involved",
        className:"bold-columns",
        editable:false
        },
      {
        id: 4,
        field: "accusedStatus",
        label: "Accused Status",
        className:"bold-columns",
        editable:false
        },
      
    //   {
    //     id: 5,
    //     field: "chargesheetDate",
    //     label: "Chargesheet Date",
    //     className:"bold-columns",
    // editable:false
    //     },
      {
        id: 6,
        field: "lastHearingDate",
        label: "Last Hearing Date",
        className:"bold-columns",
        editable:false
        },
      {
            id: 7,
            field: "proposedDate",
            label: "System Proposed Date",
            className:"bold-columns",
            editable:false
        },
      {
        id: 8,
        field: "acceptedDate",
        label: "Next Hearing Date",
        className:"bold-columns",
        editable:true
        },
    {
      id: 9,
      width: "max-content",
      pinned: true,
      sortable: false,
      resizable: false,
      cellRenderer: ({
        tableManager,
        value,
        data,
        column,
        colIndex,
        rowIndex
      }) => (
        <div style={styles.buttonsCellContainer}>
          <button
            title="Edit"
            style={styles.editButton}
            onClick={(e) => {
              e.stopPropagation();
              tableManager.rowEditApi.setEditRowId(data.id);
            }}
          >
            {EDIT_SVG}
          </button>
        </div>
      ),
      editorCellRenderer: ({
        tableManager,
        value,
        data,
        column,
        colIndex,
        rowIndex,
        onChange
      }) => (
       <React.Fragment>
         {/* <label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </label> */}
      
        <div style={styles.buttonsCellEditorContainer}>
          <button
            title="Cancel"
            style={styles.cancelButton}
            onClick={(e) => {
              e.stopPropagation();
              tableManager.rowEditApi.setEditRowId(null);
            }}
          >
            {CANCEL_SVG}
          </button>
          <button
            title="Save"
            style={styles.saveButton}
            onClick={(e) => {
              e.stopPropagation();
              let rowsClone = [...tableManager.rowsApi.rows];
              let updatedRowIndex = rowsClone.findIndex(
                (r) => r.id === data.id
              );
              rowsClone[updatedRowIndex] = data;
              setRowsData(rowsClone);
              tableManager.rowEditApi.setEditRowId(null);
            }}
          >
            {SAVE_SVG}
          </button>
        </div>
        </React.Fragment>
      )
    },
    // {
    //     id: 9,
    //     width: "max-content",
    //     pinned: true,
    //     sortable: false,
    //     resizable: false,
    //     cellRenderer: ({
    //       tableManager,
    //       value,
    //       data,
    //       column,
    //       colIndex,
    //       rowIndex
    //     }) => (
    //       <div style={styles.buttonsCellContainer}>
    //         <button
    //           title="Edit"
    //           style={styles.editButton}
    //           onClick={(e) => {
    //             e.stopPropagation();
    //             tableManager.rowEditApi.setEditRowId(data.id);
    //           }}
    //         >
    //           {EDIT_SVG}
    //         </button>
    //       </div>
    //     ),
    //   }
  ];
};

export default getColumns;
