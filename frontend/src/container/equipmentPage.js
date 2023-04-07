import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom'
import axios from '../api';
import { Input, Select, Col, Row, Button, Space, Tag, InputNumber, Popconfirm, message, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../css/equipmentPage.css'

const Equipment = () => {
	const { id } = useParams();
	const { state } = useLocation();
	const [ Data, setData ] = useState([]);
	console.log(state)

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
	    const newData = rearrangeTime(data);
	    setData(data);
	}

	const rearrangeTime = (data) => {
		for (let item of data) {
			const newTime = parseTime(item);
			const timeStr = `${newTime.Y}-${newTime.M}-${newTime.D} ${newTime.h}:${newTime.m}:${newTime.s}`;
			item.BorrowDate = timeStr;
			console.log(timeStr)
		}
		return data;
	}

	const parseTime = (data) => {
		let Y = '', M = '', D = '', h = '', m = '', s = '';
		for (let i = 0; i < 4; i++) 
			Y += data.BorrowDate[i];
		for (let i = 5; i < 7; i++)
			M += data.BorrowDate[i];
		for (let i = 8; i < 10; i++)
			D += data.BorrowDate[i];
		for (let i = 11; i < 13; i++) 
			h += data.BorrowDate[i];
		for (let i = 14; i < 16; i++)
			m += data.BorrowDate[i];
		for (let i = 17; i < 19; i++)
			s += data.BorrowDate[i];
		const time = {Y: Y, M: M, D: D, h: h, m: m, s: s};
		return time;
	}

	useEffect(() => {
		search();
	}, []);

	const columns = [
	{
		title: 'Name',
		dataIndex: 'Name',
		key: 'Name',
	},
	{
		title: 'Activity',
		dataIndex: 'Activity',
		key: 'Activity',
	},
	{
		title: 'State',
		dataIndex: 'State',
		key: 'State',
		render: (text) => <Tag color={stateColor(text)}>{text.toUpperCase()}</Tag>,
	},
	{
		title: 'Num',
		dataIndex: 'EquipNum',
		key: 'EquipNum',
	},
	{
		title: 'Date',
		dataIndex: 'BorrowDate',
		key: 'BorrowDate',
	}];

	return (
		<>
			<div className='equipmentPageRow'>
			    <div className='title'>{id}</div>
			    <Tag color={attrColor(state.attr)} className='equipmentPageTag'>{state.attr}</Tag>
			</div>
			<div className='imgContainer'>
			    <img src={state.path} className='equipmentPagePicture'/>
			</div>
			<div className='infoContainer'>
			    <Table columns={columns} dataSource={Data} pagination={{pageSize: 50}} scroll={{y: 180}}/>
			</div>
		</>
	)
}
export default Equipment;