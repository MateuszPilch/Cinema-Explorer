"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieSearchFilter = void 0;
class MovieSearchFilter {
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
exports.MovieSearchFilter = MovieSearchFilter;
//# sourceMappingURL=movie-search-filter.js.map