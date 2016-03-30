import 'babel-polyfill';

import rtmpdump from 'rtmpdump';
import fs from 'fs';
import schedule from '../schedule.json';
import 'date-utils';

const main = () => {
	let time = new Date();
	time.addMinutes(5);

	schedule.programs.forEach((program) => {
		if (Date.getDayNumberFromName(program.wday) === time.getDay()) {
			const start = new Date(`${time.toYMD()} ${program.time}`);
			const end = start.clone().addMinutes(program.length);
			if (time.between(start, end)) {
				record(program, time);
			}
		}
	});
};

const waitSeconds = (seconds) => {
	return new Promise((done) => {
		setTimeout(() => {
			done();
		}, seconds * 1000);
	});
};

const record = async (program, date) => {
	await waitSeconds(45);
	const stream = rtmpdump.createStream({
		rtmp: 'rtmp://fms-base1.mitene.ad.jp/agqr/aandg22',
		stop: program.length * 60,
		v: null
	});
	stream.on('error', () => {
		// 接続時に必ずエラーが起きるので何もしない
	});
	fs.mkdir('out', () => {
		stream.pipe(fs.createWriteStream(`out/${program.title}-${date.toYMD()}.flv`));
	});
};

main();
