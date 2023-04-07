import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv-defaults'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes/index'
import Request from './models/Request'
import attr from './models/attr'
import init from './init'
import path from "path"

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

if(process.env.NODE_ENV === "production"){
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/*", function(req, res){
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}

const port = process.env.PORT || 4001;

app.listen(port, () => {
	console.log(`listening on ${port}`);
});

app.get('/', (req, res) => {
	res.send('init server');
});

dotenv.config();
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL).then( async(res)=>{
	await Request.deleteMany({});
	await attr.deleteMany({});
	await init();
	console.log('db success');
})

