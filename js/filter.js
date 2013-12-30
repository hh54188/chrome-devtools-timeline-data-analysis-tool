var Filter = (function () {

    var _data = [];
    var hasCache = false;
    var DataByCategory = {};
    var DataByUrl = {};

    var cache = function (data) {
        if (typeof data[0] == "string") {
            data.splice(0, 1);
        }
        _data = data;
        hasCache = true;
        DataByUrl = {};
        DataByUrl = {};

        console.log("Cached!");
    }

    var resolveFile = function (fn) {

        (function _resolve(arr) {

            arr.forEach(function (item) {

                if (item.type.toLowerCase() == "program") {

                    if (item.children && item.children.length) {
                        _resolve(item.children);
                    }
                    return
                }

                fn(item);
            });

        })(_data);
    }

    var isEmptyObject = function (obj) {

        for (var key in obj) {
            return false;
        }
        return true;
    }

    var getByCategory = function (item) {

        if (!isEmptyObject(DataByCategory)) return DataByCategory;

        resolveFile(function (item) {
            var data;
            if (item.type) {

                if (!(data = DataByCategory[item.type])) {
                    DataByCategory[item.type] = new Data();
                } else {
                    data.add(item);
                }
            }
        })

        return _sortByTimecost(DataByCategory);
    }

    var _sortByTimecost = function (data) {
        var toArray = [], result = [];
        for (var name in data) {
            toArray.push({
                type: name,
                data: data[name]
            });
        }

        toArray.forEach(function (item) {

            result.push(item);
            if (result.length == 1 ) return;

            var cur = result.length - 1, prev = cur - 1;
            var temp;

            while (result[cur].data.total_cost > result[prev].data.total_cost) {

                temp = result[prev];
                result[prev] = result[cur];
                result[cur] = temp;

                prev = (--cur) - 1;
                if (prev < 0) return;
            }
        });

        return result;      
    }


    /*
        props = {
            "data:[url]": {
                tofixed: 3,
                datatype: "string"
            }
        }
    */
    var bySpecifyProper = function (dataArr, props) {

        var data = [];

        dataArr.forEach(function (d) {

            var temp = {};
            props.forEach(function (name) {
                if (name.indexOf(":") > -1) {

                    var names = name.split(":"), val;
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

    var resolveChildren = function (dataArr) {

        (function _resolveChild(arr) {

            arr.forEach(function (item) {
                console.log(item.type, item.endTime - item.startTime);
            });

        })(dataArr);
    }

    return {
        cache: cache,
        getByCategory: getByCategory,
        bySpecifyProper: bySpecifyProper,
        resolveChildren: resolveChildren
    }

})();