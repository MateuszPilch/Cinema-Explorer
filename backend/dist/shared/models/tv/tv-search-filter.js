"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TvSearchFilter = void 0;
class TvSearchFilter {
    constructor() {
        this.page = 1;
    }
    setFilter(property, value) {
        this[property] = value;
    }
    clearFilter() {
        Object.keys(this).forEach((i) => this[i] = null);
        this.page = 1;
    }
}
exports.TvSearchFilter = TvSearchFilter;
//# sourceMappingURL=tv-search-filter.js.map