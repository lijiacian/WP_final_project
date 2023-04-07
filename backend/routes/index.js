import {Router} from 'express';
import Request from '../models/Request'
import attr from '../models/attr'
const router = Router();

router.get('/reqHandle', async (req, res) => {
	const dt = await Request.find(req.query);
	const ret = []
	for(let i of dt){
		if(i.ID != 0)
			ret.push({Name:i.Name, Equipment:i.Equipment, BorrowDate:i.BorrowDate, EquipNum:i.EquipNum, Activity:i.Activity, attr:i.attr, ID: i.ID, Incharger:i.Incharger, StartDate:i.StartDate, EndDate:i.EndDate, State:i.State});
	}
	res.json(ret);
})

//list.sort((a, b) => (a.$(arg) > b.$(arg)) ? 1 : -1);

router.post('/reqHandle', async (req, res) => {
	const tt = await attr.findOne({equip: req.body.Equipment});
	const ID = await Request.find().sort({"ID": -1}).limit(1);
	const newdt = new Request(req.body); //{date, Name, Activity, EquipNum, Equipment, attr: tt.attr});
	newdt.attr = tt.attr;
	newdt.ID = 1 + ID[0].ID;
	await newdt.save();
	res.json({message: "succeed!"});
})

router.delete('/debug', async (req, res) => {
	await Request.deleteMany({});
	await attr.deleteMany({});
	res.send("succeed!\n");
})

router.get('/debug', async(_, res) => {
	const REQ = await Request.find();
	const ATTR = await attr.find();
	res.send(REQ + "\n" + ATTR + "\ndone\n");
})

router.get('/init', async (_, res) => {
	const ATTR = await attr.find();
	const ret = [];
	for(let i of ATTR){
		ret.push({equip: i.equip, attr: i.attr, img: i.img})
	}
	res.json(ret);
})

router.post('/attr', async (req, res) => {
	const newAttr = new attr(req.body);
	await newAttr.save();
	res.json({message: "succeed!"});
})

export default router;
