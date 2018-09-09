const webshot = require('webshot');
const BufferStream = require('./BufferStream');


function get(group = 'пз-21з') {
	const bufferStream = new BufferStream();
	const filename = 'shedule.png';
	const url = `http://lpnu.ua/parttime_schedule?institutecode_selective=All&edugrupabr_selective=${encodeURI(group)}`;
	return new Promise((resolve, reject) => {
		const renderStream = webshot(
			url,
			{
				shotSize: {
					width: 1280,
					height: 'all'
				},
				customJS: `
					jQuery('link').remove();
					document.body.innerHTML = document.querySelector("#block-system-main").outerHTML;
				`,
				customCSS: `
					.group_content {
					    display: block;
					    position: relative;
					}

					.view-grouping-content {
						display: block;
						clearfix: both;
					}

					.view-grouping-content h3 {
						float: left;
					}
					.view-grouping-content .stud_schedule {
					}
				`,
			},
		);
		renderStream.on('data', function(data) {
		  bufferStream.write(data.toString('binary'), 'binary');
		});
		renderStream.on('end', function() {
			resolve(bufferStream);
		});
		renderStream.on('error', function() {
			console.log("Error!!!");
		});
	});
}


exports.get = get;