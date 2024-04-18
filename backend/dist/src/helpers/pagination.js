"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginationInfo = exports.getPaginationQueryData = void 0;
const getPaginationQueryData = (pageInfo) => {
    let currentPage = parseInt(pageInfo === null || pageInfo === void 0 ? void 0 : pageInfo.currentPage) || 0;
    let limit = parseInt(pageInfo === null || pageInfo === void 0 ? void 0 : pageInfo.limit) || 10;
    let skip = currentPage * limit;
    if ((pageInfo === null || pageInfo === void 0 ? void 0 : pageInfo.sendAllRecords) === "YES") {
        currentPage = 0;
        skip = 0;
        limit = 0;
    }
    return { skip, limit, currentPage };
};
exports.getPaginationQueryData = getPaginationQueryData;
const getPaginationInfo = (total, limit, currentPage) => {
    return {
        totalRecords: total,
        currentPage,
        totalPages: limit ? Math.ceil(total / limit) : 0,
        limit,
    };
};
exports.getPaginationInfo = getPaginationInfo;
exports.default = {
    getPaginationQueryData: exports.getPaginationQueryData,
    getPaginationInfo: exports.getPaginationInfo,
};
