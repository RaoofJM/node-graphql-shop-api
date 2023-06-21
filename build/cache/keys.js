"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDynamicKey = exports.DynamicKey = exports.Key = void 0;
var Key;
(function (Key) {
    Key["TOPSELLERS"] = "TOPSELLERS";
    Key["NEWRELEASES"] = "NEWRELEASES";
})(Key || (exports.Key = Key = {}));
var DynamicKey;
(function (DynamicKey) {
})(DynamicKey || (exports.DynamicKey = DynamicKey = {}));
function getDynamicKey(key, suffix) {
    const dynamic = `${key}_${suffix}`;
    return dynamic;
}
exports.getDynamicKey = getDynamicKey;
//# sourceMappingURL=keys.js.map