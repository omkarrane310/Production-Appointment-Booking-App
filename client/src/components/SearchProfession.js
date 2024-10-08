import Layout from './Layout';
import { useState, useEffect } from 'react';
import { Row, Button } from "antd";
import DoctorList from "../components/DoctorList";
import axios from 'axios';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../styles/SearchProfession.css';  // Import the CSS file

const SearchProfession = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [specialization, setSpecialization] = useState(''); // Default specialization is empty to show all

    const getUserData = async () => {
        try {
            const res = await axios.get("/api/v1/user/getAllDoctors", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const filteredDoctors = doctors.filter(doctor => 
        (specialization === '' || (specialization === 'doctor' && doctor.specialization?.toLowerCase().includes('doctor')) || doctor.specialization?.toLowerCase() === specialization.toLowerCase()) && (
        doctor.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.feesPerCunsaltation?.toString().includes(searchTerm.toLowerCase()) ||
        doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.address?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <Layout>
            <div className="search-container">
                <Input
                    placeholder="Search..."
                    prefix={<SearchOutlined />}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="category-buttons">
                <Button onClick={() => setSpecialization('')}>All</Button>
                <Button onClick={() => setSpecialization('doctor')}>Doctor</Button>
                <Button onClick={() => setSpecialization('plumber')}>Plumber</Button>
                <Button onClick={() => setSpecialization('barber')}>Barber</Button>
                <Button onClick={() => setSpecialization('lawyer')}>Lawyer</Button>
                {/* Add more buttons for other categories as needed */}
            </div>
            <Row className='home-container'>
                {filteredDoctors && filteredDoctors.map((doctor) => (
                    <DoctorList key={doctor._id} doctor={doctor} />
                ))}
            </Row>
        </Layout>
    )
}

export default SearchProfession;
