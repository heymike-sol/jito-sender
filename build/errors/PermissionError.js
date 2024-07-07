"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionError = void 0;
var CustomError_1 = require("./CustomError");
var PermissionError = /** @class */ (function (_super) {
    __extends(PermissionError, _super);
    function PermissionError() {
        var _this = _super.call(this, 'You don\'t have permission') || this;
        _this.statusCode = 400;
        _this.message = 'You don\'t have permission';
        Object.setPrototypeOf(_this, PermissionError.prototype);
        return _this;
    }
    PermissionError.prototype.serializeErrors = function () {
        return [
            { message: this.message }
        ];
    };
    return PermissionError;
}(CustomError_1.CustomError));
exports.PermissionError = PermissionError;
