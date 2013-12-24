function Grid(dataArr) {
    var max = 100;
    this.createTable();
    var _this = this;
    dataArr.forEach(function (data) {

        var row = _this.insertRow();

        _this.insertCol(row, data.totalTime);
        _this.insertCol(row, data.url);
        _this.insertCol(row, data.lineNumber);

        if (!(--max)) return false;
    });

    return this.table;
}

Grid.prototype.createTable = function () {
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");
    var thead = document.createElement("thead");

    table.appendChild(tbody);
    table.appendChild(thead);

    table.classList.add("table");
    table.classList.add("table-bordered");

    this.table = table;
    this.tbody = tbody;
    this.thead = thead;
}

Grid.prototype.insertRow = function () {
    var row = document.createElement("tr");
    this.tbody.appendChild(row);
    return row;
}

Grid.prototype.insertCol = function (row, val) {
    var col = document.createElement("td");
    col.innerHTML = val;
    row.appendChild(col);
}