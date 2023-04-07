import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom'
import axios from '../api';
import { Input, Select, Col, Row, Button, Space, Tag, InputNumber, Popconfirm, message, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../css/equipmentPage.css'

const Activity = () => {
	const { id } = useParams();
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
	        Activity:(id) ? id : null,
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

	const computeTime = (data) => {
		let Y = 0, M = 0, D = 0, h = 0, m = 0, s = 0;
		for (let i = 0; i < 4; i++) 
			Y = Y * 10 + Number(data.BorrowDate[i]);
		for (let i = 5; i < 7; i++)
			M = M * 10 + Number(data.BorrowDate[i]);
		for (let i = 8; i < 10; i++)
			D = D * 10 + Number(data.BorrowDate[i]);
		for (let i = 11; i < 13; i++) 
			h = h * 10 + Number(data.BorrowDate[i]);
		for (let i = 14; i < 16; i++)
			m = m * 10 + Number(data.BorrowDate[i]);
		for (let i = 17; i < 19; i++)
			s = s * 10 + Number(data.BorrowDate[i]);
		const time = {Y: Y, M: M, D: D, h: h, m: m, s: s};
		console.log(time)
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
		title: 'State',
		dataIndex: 'State',
		key: 'State',
		filters: [
		   {
		     text: 'Borrow',
		     value: 'borrow',
		   },
		   {
		     text: 'Return',
		     value: 'return',
		   },
		],
		onFilter: (value, record) => record.State.indexOf(value) === 0,
		render: (text) => <Tag color={stateColor(text)}>{text.toUpperCase()}</Tag>,
	},
	{
		title: 'Equipment',
		dataIndex: 'Equipment',
		key: 'Equipment',
	},
	{
		title: 'Attr',
		dataIndex: 'attr',
		key: 'attr',
		filters: [
		   {
		     text: 'Wire',
		     value: 'Wire',
		   },
		   {
		     text: 'Stand',
		     value: 'Stand',
		   },
		   {
		     text: 'Instrument',
		     value: 'Instrument',
		   },
		   {
		     text: 'Speaker',
		     value: 'Speaker',
		   },
		   {
		     text: 'Mixer',
		     value: 'Mixer',
		   },
		   {
		     text: 'Microphone',
		     value: 'Microphone',
		   },
		   {
		     text: 'Other',
		     value: 'Other',
		   },
		],
		onFilter: (value, record) => record.attr.indexOf(value) === 0,
		render: (text) => <Tag color={attrColor(text)}>{text}</Tag>,
	},
	{
		title: 'Num',
		dataIndex: 'EquipNum',
		key: 'EquipNum',
		sorter: (a, b) => {
			return a.EquipNum - b.EquipNum;
		}
	},
	{
		title: 'Date',
		dataIndex: 'BorrowDate',
		key: 'BorrowDate',
		sorter: (a, b) => {
			const timeA = computeTime(a), timeB = computeTime(b);
			if (timeA.Y !== timeB.Y) 
				return timeA.Y - timeB.Y;
			if (timeA.M !== timeB.M) 
				return timeA.M - timeB.M;
			if (timeA.D !== timeB.D) 
				return timeA.D - timeB.D;
			if (timeA.h !== timeB.h)
				return timeA.h - timeB.h;
			if (timeA.m !== timeB.m)
				return timeA.m - timeB.m;
			return timeA.s - timeB.s;
		},
	}];

	return (
		<>
			<div className='equipmentPageRow'>
			    <div className='title'>{id}</div>
			</div>
			<div className='infoContainer'>
			    <Table columns={columns} dataSource={Data} pagination={{pageSize: 50}} scroll={{y: 350}}/>
			</div>
		</>
	)
}
export default Activity;