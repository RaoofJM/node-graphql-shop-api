"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateArray = void 0;
function paginateArray(array, page, limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return array.slice(startIndex, endIndex);
}
exports.paginateArray = paginateArray;
//# sourceMappingURL=utils.js.map