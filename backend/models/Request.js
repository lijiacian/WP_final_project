import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
	BorrowDate: Date,
	StartDate: Date,
	EndDate: Date,
	Name: String,
	Activity: String,
	Equipment: String,
	EquipNum: Number,
	attr: String,
	Incharger: String,
	ID: Number,
	State: String
})

const Request = mongoose.model('Request', RequestSchema);

export default Request;

