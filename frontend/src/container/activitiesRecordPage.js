import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import axios from '../api';
import { Input, Select, Col, Row, Button, Space, Tag, InputNumber, Popconfirm, message, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../css/equipmentPage.css'

const ActivitiesRecordPage = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const [ Data, setData ] = useState([]);

    const attrColor = (attr) => {
        const attrList = ['Wire', 'Stand', 'Instrument', 'Speaker', 'Mixer', 'Microphone', 'Other'];
        const colorList = ['blue', 'green', 'yellow', 'red', 'orange', 'purple', 'pink'];
        for (let i = 0; i < attrList.length; i++)
            if (attr === attrList[i])
                return colorList[i];
    }

    const stateColor = (state) => {
        const stateList = ['borrow', 'return']
        const colorList = ['green', 'red'];
        for (let i = 0; i < stateList.length; i++)
            if (state === stateList[i])
                return colorList[i];
    }

    const search = async () => {
        const { data } = await axios.get('/reqHandle', { params: {
            Equipment:(id) ? id : null,
        }});
        let newData = [];
        const map = new Map();
        for (let item of data) {
            if (!map.has(item.BorrowDate)) {
                map.set(item.BorrowDate, true);
                newData.push(item);
            }
        }
        newData = rearrangeTime(newData);
        setData(newData);
    }

    const rearrangeTime = (data) => {
        for (let item of data) {
            let newTime = parseTime(item.BorrowDate);
            let timeStr = `${newTime.Y}-${newTime.M}-${newTime.D} ${newTime.h}:${newTime.m}:${newTime.s}`;
            item.BorrowDate = timeStr;
            if (item.StartDate) {
                newTime = parseTime(item.StartDate);
                timeStr = `${newTime.Y}-${newTime.M}-${newTime.D} ${newTime.h}:${newTime.m}:${newTime.s}`;
                item.StartDate = timeStr;
            }
            if (item.EndDate) {
                newTime = parseTime(item.EndDate);
                timeStr = `${newTime.Y}-${newTime.M}-${newTime.D} ${newTime.h}:${newTime.m}:${newTime.s}`;
                item.EndDate = timeStr;
            }
        }
        return data;
    }

    const parseTime = (data) => {
        let Y = '', M = '', D = '', h = '', m = '', s = '';
        for (let i = 0; i < 4; i++) 
            Y += data[i];
        for (let i = 5; i < 7; i++)
            M += data[i];
        for (let i = 8; i < 10; i++)
            D += data[i];
        for (let i = 11; i < 13; i++) 
            h += data[i];
        for (let i = 14; i < 16; i++)
            m += data[i];
        for (let i = 17; i < 19; i++)
            s += data[i];
        const time = {Y: Y, M: M, D: D, h: h, m: m, s: s};
        return time;
    }

    useEffect(() => {
        search();
    }, []);

    const navigate = useNavigate(); 
    const ToActivity = (activity) => {
        navigate('/activity/' + activity);
    }

    const columns = [
    {
        title: 'State',
        dataIndex: 'State',
        key: 'State',
        render: (text) => <Tag color={stateColor(text)}>{text.toUpperCase()}</Tag>,

    },
    {
        title: 'Activity',
        dataIndex: 'Activity',
        key: 'Activity',
        render: (text) => <a onClick={() => ToActivity(text)}>{text}</a>,
    },
    {
        title: 'Name',
        dataIndex: 'Name',
        key: 'Name',
    },
    {
        title: 'Incharger',
        dataIndex: 'Incharger',
        key: 'Incharger',
    },
    {
        title: 'Date',
        dataIndex: 'BorrowDate',
        key: 'BorrowDate',
    },
    {
        title: 'Start Date',
        dataIndex: 'StartDate',
        key: 'StartDate',
    },
    {
        title: 'End Date',
        dataIndex: 'EndDate',
        key: 'EndDate',
    }];
    return (
        <Table columns={columns} dataSource={Data} pagination={{pageSize: 50}} scroll={{y: 450}}/>
    )
}
export default ActivitiesRecordPage