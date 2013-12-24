var Filter = (function () {

	var data = [];

	/*
		props = {
			"data[_url]": {
				tofixed: 3,
				datatype: "string"
			}
		}
	*/
	var bySpecifyProper = function (dataArr, props) {

		data.length = 0;

		dataArr.forEach(function (d) {

			var temp = {};
			props.forEach(function (name) {
				if (name.indexOf("_") > -1) {

					var names = name.split("_"), val;
					names.forEach(function (name, index) {
						if (!index) {
							val = d[name];	
						} else {
							val = val[name];
						}
					});

					temp[names[names.length - 1]] = val;

				} else {
					temp[name] = d[name];
				}
			})
			data.push(temp);
		})

		return data;
	}

	return {
		bySpecifyProper: bySpecifyProper
	}

})();