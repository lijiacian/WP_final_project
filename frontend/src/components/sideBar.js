import React from 'react'
import { useState } from "react";
import '../css/sideBar.css';
import { CaretDownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const SideBar = () => {
	const menus = [["Equipment List", "equipmentList"], ["Equipments Record", "equipmentRecord"], ["Activities Record", "activitiesRecord"]];
	const items = [
	{
		key: '1',
		label: (
			<a href='/borrow'> Borrow </a>
		),
	},
	{
		key: '2',
		label: (
		    <a href='/return'> Return </a>
		),
	}];

	return (
		<div className='sideBarContainer'>
		    <Dropdown menu={{items,}} className='sideBarRow'>
		        <a onClick={(e) => e.preventDefault()} >
		            Borrow/Return
		            <CaretDownOutlined/>
		        </a>
		      </Dropdown>
		    {
		    	menus.map((item, index) => {
		    		return (
		    			<a href={`/${item[1]}`} id={`row_${index}`} key={`row_${index}`}>
		    				<div className='sideBarRow'> {item[0]} </div>
		    			</a>
		    		)
		    	})
		    }
		</div>
	)
}
export default SideBar;