import React from 'react'

function PendingApplication() {
  return (
    <div  className="container mt-5" >
        <h1>Pending Application</h1>
        <div className="card shadow-sm border-0">
            <div className="card-body">
                <div className="table-responsive">
                    
                    
                        <table className="table table-hover table-bordered align-middle mb-0">
                            <thead className="table-light">
                                    <tr>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Nirasha</td>
                                    <td>User</td>
                                    <td className="text-center">
                                        <button className="btn btn-success btn-sm me-2">Approve</button>
                                        <button button className="btn btn-danger btn-sm">Reject</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Hiru</td>
                                    <td>Manager</td>
                                    <td className="text-center">
                                        <button className="btn btn-success btn-sm me-2">Approve</button>
                                        <button className="btn btn-danger btn-sm">Reject</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Saduni</td>
                                    <td>User</td>
                                    <td className="text-center">
                                        <button className="btn btn-success btn-sm me-2">Approve</button>
                                        <button button className="btn btn-danger btn-sm">Reject</button>
                                    </td>
                                </tr>
                            </tbody>
                                
                        </table>
                   
                </div>
            </div>
        </div>
    </div>
  )
}

export default PendingApplication