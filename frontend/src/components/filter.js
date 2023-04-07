import React from 'react';
import { useState, useEffect } from 'react';
import axios from '../api';
import { Input, Select, Col, Row, Button, Space, Tag, InputNumber, Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../css/filter.css'
import EquipBlock from '../container/equipBlock';

const Filter = ({type, props}) => {
    const [ Name, setName ] = useState('');
    const [ Equipment, setEquip ] = useState('');
    const [ EquipNum, setNum ] = useState(0);
    const [ Activity, setAct ] = useState('');
    const [ Attr, setAttr] = useState('');
    const [ Data, setData ] = useState([]);
    const [ flag, setFlag ] = useState(false);
    const [ initList, setInitList ] = useState([]);
    const [ list, setList] = useState([]);

    let options = [];

    const init = async() => {
        const dt = await axios.get('/init');
        setInitList(dt.data);
        setList(dt.data);
    }
    options[0] = {value: 'All', label: 'All'};
    initList.map((item, id) => {
        options[id + 1] = {value: item.equip, label: item.equip};
    })
    
    useEffect(()=>{
        init();  
    },[])

    const handleChange = (func) => (e) => {
        func(e.target.value);       
    }

    const handleSelect = (func) => (e) => {
        func(e);
    }

    const search = async () => {
        const { data } = await axios.get('/reqHandle', { params: {
            Name:(Name) ? Name : null,
            Equipment:(Equipment && Equipment !== 'All') ? Equipment : null,
            EquipNum:(EquipNum) ? EquipNum : null,
            Activity:(Activity) ? Activity : null,
            attr: (Attr && Attr !== 'All') ? Attr : null
        }});
        setData(data);
        setFlag(true);
    }

    const searchList = () => {
        console.log(initList)
        const newList = initList.filter(item => (Attr === 'All' || Attr === '' || item.attr === Attr) &&
            (Equipment === 'All' || Equipment === '' || item.equip === Equipment));
        setList(newList);
        console.log(Attr)
        console.log(Equipment)
    }

    const displayData = () => {
        Data.map((item, id) => {
        let path = '';
        for (let i of initList) {
            if (i.equip === item.Equipment) {
                path = i.img;
                break;
            }
        }
        return <EquipBlock type={type} props={props} item={item} path={path}/>
        })
    }

    const displayInitList = () => {
        initList.map((item, id) => {
        return <EquipBlock type={type} props={props} item={item} path={item.img}/>
        })
    }


    return (
        <div className='filterContainer'>
            <div className='filterRow'>
            { type === 'record' ? 
                <>
                    <Input size='large' placeholder="Activity" onChange={handleChange(setAct)} style={{ width: "40%" }}></Input>
                    <Input size='large' placeholder="Borrower" onChange={handleChange(setName)} style={{ width: "40%" }}></Input>
                    <Button size='large'type="primary" icon={<SearchOutlined />} onClick={search} style={{ background: "rgb(189, 159, 127)" }}> Search </Button> 
                </>
                :
                <>
                    <Select
                      defaultValue="All"
                      size="large"
                      style={{
                        width: 140,
                      }}
                      onChange={handleSelect(setAttr)}
                      options={[
                        {
                            value: 'All',
                            label: 'All',
                        },
                        {
                          value: 'Wire',
                          label: 'Wire',
                        },
                        {
                          value: 'Stand',
                          label: 'Stand',
                        },
                        {
                          value: 'Instrument',
                          label: 'Instrument',
                        },
                        {
                          value: 'Speaker',
                          label: 'Speaker',
                        },
                        {
                            value: 'Mixer',
                            label: 'Mixer',
                        },
                        {
                            value: 'Microphone',
                            label: 'Microphone',
                        },
                        {  
                            value: 'Other',
                            label: 'Other',
                        }
                      ]}
                    />
                    <Select
                        showSearch
                        size="large"
                        style={{
                          width: 200,
                        }}
                        placeholder="Equipment"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        onChange={handleSelect(setEquip)}
                        options={options}
                    />
                    { type === 'search' ? 
                    <>
                        <Input size='large' placeholder="Borrower" onChange={handleChange(setName)} className='filterName' style={{ width: "20%" }}></Input>
                        <Input size='large' placeholder="Activity" onChange={handleChange(setAct)} className='filterActivity' style={{ width: "20%" }}></Input>
                        <Button size='large'type="primary" icon={<SearchOutlined />} onClick={search} style={{ background: "rgb(189, 159, 127)" }}> Search </Button> 
                    </>
                    :
                    <>
                        <Button size='large'type="primary" icon={<SearchOutlined />} onClick={searchList} style={{ background: "rgb(189, 159, 127)" }}> Search </Button> 
                    </>
                    }
                </>
            }
            </div>
            <div className='filterDisplay'>
                { type === 'search' ? 
                (
                    Data.map((item, id) => {
                    let path = '';
                    for (let i of initList) {
                        if (i.equip === item.Equipment) {
                            path = i.img;
                            break;
                        }
                    }
                    return <EquipBlock type={type} props={props} item={item} attr={item.attr} equipment={item.Equipment} path={path}/>
                    })
                )
                :
                (
                    list.map((item, id) => {
                    return <EquipBlock type={type} props={props} item={item} attr={item.attr} equipment={item.equip} path={item.img}/>
                    })
                )
                }
            </div>
        </div>
    )
}
export default Filter;