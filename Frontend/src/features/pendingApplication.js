import React from 'react'
import {
    useGetPendingApplicationsQuery,
    useApproveApplicationMutation,
    useRejectApplicationMutation,
} from '../service/userApi';
import { useNavigate } from 'react-router-dom';

function PendingApplication() {

    const navigate=useNavigate();

    
     const {
        data: applications = [],
        isLoading,
        isError,
        error,
    } = useGetPendingApplicationsQuery();

    const [approveApplication] =
        useApproveApplicationMutation();

    const [rejectApplication] =
        useRejectApplicationMutation();

    const handleApprove = async (id) => {
        try {
            await approveApplication(id).unwrap();
            alert('Application approved successfully!');
            navigate('/user-list');
        } catch (err) {
            alert(
                err?.data?.message || 'Approval failed!'
            );
        }
    };

    const handleReject = async (id) => {
        try {
            await rejectApplication(id).unwrap();
            alert('Application rejected successfully!');
            navigate('/user-list');
        } catch (err) {
            alert(
                err?.data?.message || 'Rejection failed!'
            );
        }
    };
    
  return (
    <div  className="container mt-5" >
        <h1>Pending Application</h1>

        {isLoading && <p>Loading applications...</p>}

            {isError && (
                <div className="alert alert-danger">
                    {error?.data?.message ||
                        'Applications load karanna bari una.'}
                </div>
            )}
        <div className="card shadow-sm border-0">
            <div className="card-body">
                <div className="table-responsive">
                    
                    
                        <table className="table table-hover table-bordered align-middle mb-0">
                            <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {applications.length === 0 && !isLoading ? (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No pending applications available.
                            </td>
                        </tr>
                    ) : (
                        applications.map((application) => (
                            <tr key={application.id}>
                                <td>{application.id}</td>
                                <td>{application.name}</td>
                                <td>{application.email}</td>
                                <td>{application.requestedRole}</td>

                                <td className="text-center">
                                    <button className="btn btn-success btn-sm me-2" onClick={()=>handleApprove(application.id)}>
                                        Approve
                                    </button>

                                    <button className="btn btn-danger btn-sm" onClick={()=>handleReject(application.id)}>
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
                                
                    </table>
                   
                </div>
            </div>
        </div>
    </div>
  )
}

export default PendingApplication