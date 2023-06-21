"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function keyExists(...keys) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield _1.default.exists(keys)) ? true : false;
    });
}
exports.keyExists = keyExists;
function setValue(key, value, expireAt) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = _1.default.set(key, `${value}`);
        if (expireAt)
            yield expireInSeconds(key, expireAt);
        return result;
    });
}
exports.setValue = setValue;
function getValue(key) {
    return __awaiter(this, void 0, void 0, function* () {
        return _1.default.get(key);
    });
}
exports.getValue = getValue;
function delByKey(key) {
    return __awaiter(this, void 0, void 0, function* () {
        return _1.default.del(key);
    });
}
exports.delByKey = delByKey;
function setJson(key, value, expireAt) {
    return __awaiter(this, void 0, void 0, function* () {
        const json = JSON.stringify(value);
        const result = yield setValue(key, json);
        if (expireAt)
            yield expireInSeconds(key, expireAt);
        return result;
    });
}
exports.setJson = setJson;
function getJson(key) {
    return __awaiter(this, void 0, void 0, function* () {
        const type = yield _1.default.type(key);
        if (type !== TYPES.STRING)
            return null;
        const json = yield getValue(key);
        if (json)
            return JSON.parse(json);
        return null;
    });
}
exports.getJson = getJson;
function setList(key, list, expireAt) {
    return __awaiter(this, void 0, void 0, function* () {
        const multi = _1.default.multi();
        const values = [];
        for (const i in list) {
            values[i] = JSON.stringify(list[i]);
        }
        multi.del(key);
        multi.rPush(key, values);
        if (expireAt)
            multi.pExpireAt(key, 1000 * expireAt);
        return yield multi.exec();
    });
}
exports.setList = setList;
function addToList(key, value) {
    return __awaiter(this, void 0, void 0, function* () {
        const type = yield _1.default.type(key);
        if (type !== TYPES.LIST)
            return null;
        const item = JSON.stringify(value);
        return yield _1.default.rPushX(key, item);
    });
}
exports.addToList = addToList;
function getListRange(key, start = 0, end = -1) {
    return __awaiter(this, void 0, void 0, function* () {
        const type = yield _1.default.type(key);
        if (type !== TYPES.LIST)
            return null;
        const list = yield _1.default.lRange(key, start, end);
        if (!list)
            return null;
        const data = list.map((entry) => JSON.parse(entry));
        return data;
    });
}
exports.getListRange = getListRange;
function watch(key) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield _1.default.watch(key);
    });
}
exports.watch = watch;
function unwatch() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield _1.default.unwatch();
    });
}
exports.unwatch = unwatch;
function expireInSeconds(key, seconds) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield _1.default.expire(key, seconds);
    });
}
exports.expireInSeconds = expireInSeconds;
function expire(expireAt, key) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield _1.default.pExpireAt(key, expireAt.getTime());
    });
}
exports.expire = expire;
function expireMany(expireAt, ...keys) {
    return __awaiter(this, void 0, void 0, function* () {
        let script = "";
        for (const key of keys) {
            script += `redis.call('pExpireAt', '${key}',${expireAt.getTime()})`;
        }
        return yield _1.default.eval(script);
    });
}
exports.expireMany = expireMany;
//# sourceMappingURL=query.js.map