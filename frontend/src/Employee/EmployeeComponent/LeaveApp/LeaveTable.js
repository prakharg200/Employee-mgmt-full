import React, { useState, useEffect } from 'react'
import { MdDelete } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function LeaveTable() {
    const navigate = useNavigate()
    const [tableData, setTableData] = useState([]);
    const [showNewComponent, setShowNewComponent] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [leaveType, setLeaveType] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reasonforleave, setReason] = useState('');
    const [status, setStatus] = useState('');



    //initial data loading from the databse
    useEffect(()=>{
        const fetchData = async () =>{
        const response = await fetch("http://localhost:4000/api/employee/leave/")
        const data = await response.json()

        if(response.ok){
            setTableData(data)
        }
        }
        fetchData()
    },[tableData])

    //add new entry
    function handleAdd(){
        setTimeout(()=>{
            setShowNewComponent(false)
        },100)
    }


     //edit an entry
     const editTableRow = (id,index) => {
        setEditIndex(id);
        setShowNewComponent(true);
        setLeaveType(tableData[index].leaveType);
        setFromDate(tableData[index].fromDate);
        setToDate(tableData[index].toDate);
        setReason(tableData[index].reasonforleave);
        setStatus(tableData[index].status);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        let id = Math.random().toString(16).slice(2);
        const newData = { id, leaveType, fromDate, toDate, reasonforleave, status };
        
        if (editIndex === null) {
            const response = await fetch("http://localhost:4000/api/employee/leave/",{
                method: "POST",
                body: JSON.stringify(newData),
                headers: {
                    "content-type": "application/json"
                }
            })

            const data = await response.json()

            if(response.ok){
            console.log("New entry added")
            }else{
            console.log(response.error)
            }
        } else {
            const response = await fetch("http://localhost:4000/api/employee/leave/"+editIndex,{
            method: "PATCH",
            body: JSON.stringify(newData),
            headers: {
                "content-type": "application/json"
            }
            })
            const data = await response.json()

            if(response.ok){
            console.log("Entry edited")
            }else{
            console.log(response.error)
            }
            setEditIndex(null)
        }
    };


  //delete an entry
  const deleteTableRow = async (id) =>{
    const response = await fetch("http://localhost:4000/api/employee/leave/"+id,{
      method:"DELETE"
    })

    if(response.ok){
      console.log("Entry deleted successfully")
    }else{
        console.log(response.error)
    }
  }



    // useEffect(() => {
    //     const storedData = JSON.parse(localStorage.getItem('leaveApplicationData')) || [];
    //     setTableData(storedData);
    // }, []);



    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     let id = Math.random().toString(16).slice(2);
    //     const newData = { id, leaveType, fromDate, toDate, reasonforleave, status };
    //     if (editIndex === null) {
    //         setTableData([...tableData, newData]);
    //     } else {
    //         const updatedData = [...tableData];
    //         updatedData[editIndex] = newData;
    //         setTableData(updatedData);
    //         setEditIndex(null);
    //     }
    //     const storedData = JSON.parse(localStorage.getItem('leaveApplicationData')) || [];
    //     const updatedStoredData = editIndex === null
    //         ? [...storedData, newData]
    //         : storedData.map((d, i) => i === editIndex ? newData : d);
    //     localStorage.setItem('leaveApplicationData', JSON.stringify(updatedStoredData));
    //     setLeaveType('');
    //     setFromDate('');
    //     setToDate('');
    //     setReason('');
    //     setStatus('');
    // };

    // const editTableRow = (index) => {
    //     setEditIndex(index);
    //     setShowNewComponent(true);
    //     setLeaveType(tableData[index].leaveType);
    //     setFromDate(tableData[index].fromDate);
    //     setToDate(tableData[index].toDate);
    //     setReason(tableData[index].reasonforleave);
    //     setStatus(tableData[index].status);
    // };

    // const deleteTableRow = (id) => {
    //     // 10
    //     const updatedData = tableData.filter(d => d.id !== id);
    //     setTableData(updatedData);
    //     localStorage.setItem('LeaveApplication', JSON.stringify(updatedData));
    // };

    return (
        <div className='component'>
            {!showNewComponent && (
                <div className='header wrk-exp'>
                    <button onClick={() => navigate(-1)} className="back-button1">Back</button>
                    <h2 className="text">Leave Application</h2>
                    <button className="add-button bg-dark text-white text" onClick={() => setShowNewComponent(true)}>+ Add</button>
                </div>

            )}
            {!showNewComponent && (
                <table className='wrk-exp-table'>
                    <thead>
                        <tr>
                            <th>Leave type</th>
                            <th>FromDate</th>
                            <th>ToDate</th>
                            <th>Reasonforleave</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((record, index) => {
                            return (
                                <tr className='box' key={record.id}>
                                    <td> {record.leaveType}</td>
                                    <td>  {record.fromDate}</td>
                                    <td> {record.toDate}</td>
                                    <td>{record.reasonforleave}</td>
                                    <td>{record.status}</td>
                                    <td>
                                        <nav>
                                            <BiEdit onClick={() => editTableRow(record._id,index)} style={{ paddingRight: "0.5rem" }} />
                                            <MdDelete onClick={() => deleteTableRow(record._id)} />
                                        </nav>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
            {showNewComponent && (
                <div>
                    <div className='form-header'>
                        <h2>{editIndex === null ? 'Add LeaveApplicationEmp Details' : 'Edit LeaveApplicationEmp Details'}</h2>
                    </div>
                    <div className='form-detail'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label htmlFor="leavetype">Leave Type</label>
                                <select id="leaveType" name="leaveType" value={leaveType} placeholder='LeaveType' onChange={(e) => setLeaveType(e.target.value)} required>
                                    <option value="d">Select Option</option>
                                    <option value="sick leave">Sick Leave</option>
                                    <option value="casusal leave">Casual Leave</option>
                                    <option value="privilege leave">Privilege Leave</option>
                                </select>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='fromDate'>FromDate</label>
                                <input type='date' id='fromDate' name='fromDate' value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='toDate'>ToDate</label>
                                <input type='date' id='toDate' name='toDate' value={toDate} onChange={(e) => setToDate(e.target.value)} required />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="lname">ReasonForLeave</label>
                                <input type="text" id="lname" name="lastname" value={reasonforleave} placeholder="Reason.." onChange={(e) => setReason(e.target.value)} />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="country">Status</label>
                                <select id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                                    <option value="d">Select Option</option>
                                    <option value="approved">Approved</option>
                                    <option value="pending">Pending</option>
                                    <option value="notapproved">NotApproved</option>

                                </select>
                            </div>

                            <div className='form-group'>
                                <button type='submit'onClick={handleAdd}>{editIndex === null ? 'Add' : 'Update'}</button>
                                <button onClick={() => setShowNewComponent(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div >
            )
            }

        </div >
    )
}




