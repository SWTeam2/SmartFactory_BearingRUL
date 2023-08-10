import React, {useEffect, useState} from 'react';
import '../App.css';
import EmployeeRow from './EmployeeRow.js';

const Employee = () => {
    const logout = () => {
        // 로그아웃 기능을 여기에 추가합니다.
    };

    const [employeeData, setEmployeeData] = useState([]);

    const getEmployees = async () => {
        try {
            const employees = await fetch('/api/employees', {
                method: 'GET'
            });

            if (employees.ok) {
                const employeesData = await employees.json();
                setEmployeeData(employeesData);
            } else {
                console.log('사원 목록 불러오기 실패');
            }
        } catch (error) {
            console.error('사원 목록 불러오기 에러 - ', error);
        }
    };

    useEffect(() => {
        getEmployees();
    }, []);

    return (
        <div style={{display: 'flex', backgroundColor: '#F2F4F8', height: '100vh'}}>
            {/* 사이드바 */}
            <div style={{background: 'white', width: '18vw', height: '100%'}}>
                <div style={{padding: '15%'}}>
                    <img src="images/logo_X.png" width="100%" alt="로고"/>
                </div>

                <div className="sidebar-row drag-prevent">
                    <div className="sidebar-icon">
                        <img src="images/label.png" width="100%" alt="아이콘"/>
                    </div>
                    <div className="sidebar-text">사원코드</div>
                </div>
                <div className="sidebar-row drag-prevent">
                    <div className="sidebar-icon">
                        <img src="images/folders.png" width="100%" alt="아이콘"/>
                    </div>
                    <div className="sidebar-text">부서</div>
                </div>
                <div className="sidebar-row drag-prevent">
                    <div className="sidebar-icon">
                        <img src="images/user.png" width="100%" alt="아이콘"/>
                    </div>
                    <div className="sidebar-text">이름</div>
                </div>

                <div style={{height: '1px', margin: '10% 10%', background: 'black'}}></div>

                <div
                    className="sidebar-row drag-prevent cursor-pointer hover-bg-grey"
                    onClick={() => {
                        window.location.href = '/dashboard';
                    }}
                >
                    <div className="sidebar-icon">
                        <img src="images/chart.png" width="100%" alt="아이콘"/>
                    </div>
                    <div className="sidebar-text">Dashboard</div>
                </div>
                <div
                    className="sidebar-row drag-prevent cursor-pointer hover-bg-grey"
                    onClick={() => {
                        window.location.href = '/notification';
                    }}
                >
                    <div className="sidebar-icon">
                        <img src="images/bell.png" width="100%" alt="아이콘"/>
                    </div>
                    <div className="sidebar-text">Notification</div>
                </div>

                <div
                    style={{position: 'fixed', bottom: '2vh', left: '3.8vw', width: '18vw'}}
                    onClick={logout}
                    className="cursor-pointer"
                >
                    <div className="sidebar-row drag-prevent cursor-pointer">
                        <div className="sidebar-icon">
                            <img src="images/logout.png" width="100%" alt="아이콘"/>
                        </div>
                        <div style={{paddingLeft: '5%', fontSize: '1.1rem'}}>LOGOUT</div>
                    </div>
                </div>
            </div>

            {/* main */}
            <div style={{width: '82vw', height: '100vh'}}>
                <div className="row" style={{margin: '3% 4%'}}>
                    <div className="layout-title">Employee Management</div>
                    <div className="row cursor-pointer" style={{marginRight: '10%'}}>
                        <button className="employee-btn" type="button"
                                onClick={() => (window.location.href = '/employee/create')}>
                            NEW
                        </button>
                        <button className="employee-btn" type="button"
                                onClick={() => (window.location.href = '/employee/update')}>
                            EDIT
                        </button>
                        <button className="employee-btn" type="button"
                                onClick={() => (window.location.href = '/employee/delete')}>
                            DELETE
                        </button>
                    </div>
                </div>

                <div style={{height: '84vh', overflow: 'auto'}}>
                    <div className="main-title-row drag-prevent">
                        <div style={{width: '3%'}}></div>
                        <div style={{width: '15%'}}>Employee ID</div>
                        <div style={{width: '12%'}}>Name</div>
                        <div style={{width: '15%'}}>Department</div>
                        <div style={{width: '10%'}}>Position</div>
                        <div style={{width: '10%'}}>In Charge</div>
                        <div style={{width: '20%'}}>Email</div>
                        <div style={{width: '15%'}}>Phone</div>
                    </div>
                    {employeeData.map((employee) => (
                        <EmployeeRow key={employee.employeeId} employee={employee}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Employee;