function Data() {
    this.count = 0;
    this.total_cost = 0;
    this.average_cost = 0;
    this.sorted_data = [];
}

Data.prototype.add = function (item) {

    if ((item.endTime || item.parentEndTime) && item.startTime) {
        
        var _endTime =  item.endTime || item.parentEndTime;
        item.totalTime = _endTime - item.startTime;
    }

    this.count++;
    if (item.totalTime) {
        this.total_cost += item.totalTime;
    }

    if (this.count && this.total_cost) {
        this.average_cost = this.total_cost / this.count;
    }

    this._insert(item);
};

Data.prototype._insert = function (item) {

    this.sorted_data.push(item);
    this._sortByTime();
}

Data.prototype._sortByTime = function () {
    // Decrease Order
    if (this.sorted_data.length == 1) return;

    var cur = this.sorted_data.length - 1, prev = cur - 1;
    var _data = this.sorted_data;
    var temp;

    while (_data[cur].totalTime > _data[prev].totalTime) {
        temp = _data[prev];
        _data[prev] = _data[cur];
        _data[cur] = temp;

        prev = (--cur) - 1;
        if (prev < 0) return;
    }
}