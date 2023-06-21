"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expireMany = exports.expire = exports.expireInSeconds = exports.unwatch = exports.watch = exports.getListRange = exports.addToList = exports.setList = exports.getJson = exports.setJson = exports.delByKey = exports.getValue = exports.setValue = exports.keyExists = exports.TYPES = void 0;
const _1 = __importDefault(require("."));
var TYPES;
(function (TYPES) {
    TYPES["LIST"] = "list";
    TYPES["STRING"] = "string";
    TYPES["HASH"] = "hash";
    TYPES["ZSET"] = "zset";
    TYPES["SET"] = "set";
})(TYPES || (exports.TYPES = TYPES = {}));
async function keyExists(...keys) {
    return (await _1.default.exists(keys)) ? true : false;
}
exports.keyExists = keyExists;
async function setValue(key, value, expireAt) {
    const result = _1.default.set(key, `${value}`);
    if (expireAt)
        await expireInSeconds(key, expireAt);
    return result;
}
exports.setValue = setValue;
async function getValue(key) {
    return _1.default.get(key);
}
exports.getValue = getValue;
async function delByKey(key) {
    return _1.default.del(key);
}
exports.delByKey = delByKey;
async function setJson(key, value, expireAt) {
    const json = JSON.stringify(value);
    const result = await setValue(key, json);
    if (expireAt)
        await expireInSeconds(key, expireAt);
    return result;
}
exports.setJson = setJson;
async function getJson(key) {
    const type = await _1.default.type(key);
    if (type !== TYPES.STRING)
        return null;
    const json = await getValue(key);
    if (json)
        return JSON.parse(json);
    return null;
}
exports.getJson = getJson;
async function setList(key, list, expireAt) {
    const multi = _1.default.multi();
    const values = [];
    for (const i in list) {
        values[i] = JSON.stringify(list[i]);
    }
    multi.del(key);
    multi.rPush(key, values);
    if (expireAt)
        multi.pExpireAt(key, 1000 * expireAt);
    return await multi.exec();
}
exports.setList = setList;
async function addToList(key, value) {
    const type = await _1.default.type(key);
    if (type !== TYPES.LIST)
        return null;
    const item = JSON.stringify(value);
    return await _1.default.rPushX(key, item);
}
exports.addToList = addToList;
async function getListRange(key, start = 0, end = -1) {
    const type = await _1.default.type(key);
    if (type !== TYPES.LIST)
        return null;
    const list = await _1.default.lRange(key, start, end);
    if (!list)
        return null;
    const data = list.map((entry) => JSON.parse(entry));
    return data;
}
exports.getListRange = getListRange;
async function watch(key) {
    return await _1.default.watch(key);
}
exports.watch = watch;
async function unwatch() {
    return await _1.default.unwatch();
}
exports.unwatch = unwatch;
async function expireInSeconds(key, seconds) {
    return await _1.default.expire(key, seconds);
}
exports.expireInSeconds = expireInSeconds;
async function expire(expireAt, key) {
    return await _1.default.pExpireAt(key, expireAt.getTime());
}
exports.expire = expire;
async function expireMany(expireAt, ...keys) {
    let script = "";
    for (const key of keys) {
        script += `redis.call('pExpireAt', '${key}',${expireAt.getTime()})`;
    }
    return await _1.default.eval(script);
}
exports.expireMany = expireMany;
//# sourceMappingURL=query.js.map