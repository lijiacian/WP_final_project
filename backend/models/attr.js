import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const attrSchema = new Schema({
	attr: String,
	equip: String,
	img: String,
	id: Number
})

const attr = mongoose.model('attr', attrSchema);

export default attr;


