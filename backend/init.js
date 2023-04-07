import attr from './models/attr'
import Request from './models/Request'

export default async() => {
	const equipment = ['Beta91A', 'Cajon', 'Guitar', 'MG166', 'PG81', 'Speakon', 'TRS', 'TS', 'X32', 'XLR', '主唱麥架', '內場喇叭', '外場喇叭', '外場喇叭架', '雙頭吉他架', 'Battery'];
	const Attr = ['Microphone', 'Instrument', 'Instrument', 'Mixer', 'Microphone', 'Wire', 'Wire','Wire', 'Mixer', 'Wire', 'Stand', 'Speaker', 'Speaker', 'Stand', 'Stand', 'Other'];
	const path = ['/picture/Beta91A.png', '/picture/Cajon.png', '/picture/Guitar.png', '/picture/MG166.png', '/picture/PG81.png', '/picture/Speakon.png', '/picture/TRS.png', '/picture/TS.png', '/picture/X32.png', '/picture/XLR.png', '/picture/主唱麥架.png', '/picture/內場喇叭.png', '/picture/外場喇叭.png', '/picture/外場喇叭架.png', '/picture/雙頭吉他架.png', '/picture/Battery.png'];	
	const len = 16;
	for(let i = 0; i < len; i++){
		const New = new attr({equip: equipment[i], attr:Attr[i], img: path[i]});
		await New.save();
	}
	const New = new Request({ID: 0});
	await New.save();
}

