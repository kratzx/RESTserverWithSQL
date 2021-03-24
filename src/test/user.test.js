"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request = __importStar(require("supertest"));
var user_1 = __importDefault(require("../src/api/models/user"));
var server_1 = __importDefault(require("../src/api/models/server"));
var connection_1 = require("../src/api/db/connection");
var server = new server_1.default();
beforeAll(function () {
    connection_1.dbConnect();
});
afterAll(function () {
    connection_1.dbClose();
});
describe("Users endpoint integration testing", function () {
    describe("GET    /api/users/", function () {
        test("Receive complete User DB", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user1, user2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_1.default.create({
                            division_id: 1,
                            full_name: "Person One",
                            phone: 12345678,
                            age: 10,
                            email: "one@person.com",
                            position: "first",
                            address: "test street 1",
                            state: true
                        })];
                    case 1:
                        user1 = _a.sent();
                        return [4 /*yield*/, user_1.default.create({
                                division_id: 2,
                                full_name: "Person Two",
                                phone: 87654321,
                                age: 20,
                                email: "two@person.com",
                                position: "second",
                                address: "test street 2",
                                state: true
                            })];
                    case 2:
                        user2 = _a.sent();
                        // Act and verify results
                        return [4 /*yield*/, request(server.app)
                                .get("/api/users")
                                .expect(200)
                                .then(function (response) {
                                // Check the response type and length
                                expect(Array.isArray(response.body)).toBeTruthy();
                                expect(response.body.length).toEqual(1);
                                // Check the response data
                                // Ver como acceder a ID
                                //expect(response.body[0]._id).toBe(user1.pk);
                                expect(response.body[0].division_id).toBe(user1.get('division_id'));
                                expect(response.body[0].full_name).toBe(user1.get('full_name'));
                                expect(response.body[0].phone).toBe(user1.get('phone'));
                                expect(response.body[0].age).toBe(user1.get('age'));
                                expect(response.body[0].email).toBe(user1.get('email'));
                                expect(response.body[0].position).toBe(user1.get('position'));
                                expect(response.body[0].address).toBe(user1.get('address'));
                                expect(response.body[0].state).toBe(user1.get('state'));
                                expect(response.body[1].division_id).toBe(user2.get('division_id'));
                                expect(response.body[1].full_name).toBe(user2.get('full_name'));
                                expect(response.body[1].phone).toBe(user2.get('phone'));
                                expect(response.body[1].age).toBe(user2.get('age'));
                                expect(response.body[1].email).toBe(user2.get('email'));
                                expect(response.body[1].position).toBe(user2.get('position'));
                                expect(response.body[1].address).toBe(user2.get('address'));
                                expect(response.body[1].state).toBe(user2.get('state'));
                                ;
                            })];
                    case 3:
                        // Act and verify results
                        _a.sent();
                        // Teardown data
                        return [4 /*yield*/, user1.destroy()];
                    case 4:
                        // Teardown data
                        _a.sent();
                        return [4 /*yield*/, user2.destroy()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("GET    /api/users/:id", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_1.default.create({
                        division_id: 1,
                        full_name: "Person One",
                        phone: 12345678,
                        age: 10,
                        email: "one@person.com",
                        position: "first",
                        address: "test street 1",
                        state: true
                    })];
                case 1:
                    user = _a.sent();
                    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, user.destroy()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    test("Request valid User ID, receive complete user info", function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, request(server.app)
                                        .get("/api/users/" + user.get('id').toString())
                                        .expect(200)
                                        .then(function (response) {
                                        // Check the response type and length
                                        expect(Array.isArray(response.body)).toBeTruthy();
                                        expect(response.body.length).toEqual(1);
                                        // Check the response data
                                        expect(response.body[0].division_id).toBe(user.get('division_id'));
                                        expect(response.body[0].full_name).toBe(user.get('full_name'));
                                        expect(response.body[0].phone).toBe(user.get('phone'));
                                        expect(response.body[0].age).toBe(user.get('age'));
                                        expect(response.body[0].email).toBe(user.get('email'));
                                        expect(response.body[0].position).toBe(user.get('position'));
                                        expect(response.body[0].address).toBe(user.get('address'));
                                        expect(response.body[0].state).toBe(user.get('state'));
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    test("Request invalid User ID, receive error", function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, request(server.app)
                                        .get("/api/users/" + '999')
                                        .expect(400)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    }); });
    describe("PUT    /api/users/:id", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_1.default.create({
                        division_id: 1,
                        full_name: "Person One",
                        phone: 12345678,
                        age: 10,
                        email: "one@person.com",
                        position: "first",
                        address: "test street 1",
                        state: true
                    })];
                case 1:
                    user = _a.sent();
                    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, user.destroy()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    test("Update valid User data", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    data = {
                                        division_id: 2,
                                        full_name: "New Person",
                                        phone: 87654321,
                                        age: 30,
                                        email: "new@person.com",
                                        position: "new",
                                        address: "new street 1",
                                        state: true
                                    };
                                    return [4 /*yield*/, request(server.app)
                                            .put("/api/users/" + user.get('id').toString())
                                            .send(data)
                                            .expect(200)
                                            .then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                                            var id, user;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        // Check the response
                                                        expect(response.body.id).toBeTruthy();
                                                        expect(response.body.division_id).toBe(data.division_id);
                                                        expect(response.body.full_name).toBe(data.full_name);
                                                        expect(response.body.phone).toBe(data.phone);
                                                        expect(response.body.age).toBe(data.age);
                                                        expect(response.body.email).toBe(data.email);
                                                        expect(response.body.position).toBe(data.position);
                                                        expect(response.body.address).toBe(data.address);
                                                        expect(response.body.state).toBe(data.state);
                                                        id = response.body.id;
                                                        return [4 /*yield*/, user_1.default.findOne(id)];
                                                    case 1:
                                                        user = _a.sent();
                                                        expect(user).toBeTruthy();
                                                        expect(user.get('division_id')).toBe(data.division_id);
                                                        expect(user.get('full_name')).toBe(data.full_name);
                                                        expect(user.get('phone')).toBe(data.phone);
                                                        expect(user.get('age')).toBe(data.age);
                                                        expect(user.get('email')).toBe(data.email);
                                                        expect(user.get('position')).toBe(data.position);
                                                        expect(user.get('address')).toBe(data.address);
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    test("Update User with incomplete data, receive error", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    data = {
                                        id: 1,
                                        division_id: 1,
                                        full_name: "",
                                        phone: 12345678,
                                        age: 10,
                                        email: "",
                                        position: "",
                                        address: "",
                                        state: true
                                    };
                                    return [4 /*yield*/, request(server.app)
                                            .put("/api/users/" + data.id.toString())
                                            .send(data)
                                            .expect(400)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    test("Update invalid User data, receive error", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    data = {
                                        id: 1,
                                        division_id: 1,
                                        full_name: 1234,
                                        phone: "12345678",
                                        age: "10",
                                        email: "trash",
                                        position: "first",
                                        address: "test street 1",
                                        state: true
                                    };
                                    return [4 /*yield*/, request(server.app)
                                            .put("/api/users/" + user.get('id').toString())
                                            .send(data)
                                            .expect(400)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    }); });
    describe("POST   /api/users/", function () {
        test("Create valid User", function () { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            division_id: 1,
                            full_name: "Person One",
                            phone: 12345678,
                            age: 10,
                            email: "one@person.com",
                            position: "first",
                            address: "test street 1",
                            state: true
                        };
                        return [4 /*yield*/, request(server.app)
                                .post("/api/users")
                                .send(data)
                                .expect(200)
                                .then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                                var id, user;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            // Check the response
                                            expect(response.body.id).toBeTruthy();
                                            expect(response.body.division_id).toBe(data.division_id);
                                            expect(response.body.full_name).toBe(data.full_name);
                                            expect(response.body.phone).toBe(data.phone);
                                            expect(response.body.age).toBe(data.age);
                                            expect(response.body.email).toBe(data.email);
                                            expect(response.body.position).toBe(data.position);
                                            expect(response.body.address).toBe(data.address);
                                            expect(response.body.state).toBe(data.state);
                                            id = response.body.id;
                                            return [4 /*yield*/, user_1.default.findOne(id)];
                                        case 1:
                                            user = _a.sent();
                                            expect(user).toBeTruthy();
                                            expect(user.get('division_id')).toBe(data.division_id);
                                            expect(user.get('full_name')).toBe(data.full_name);
                                            expect(user.get('phone')).toBe(data.phone);
                                            expect(user.get('age')).toBe(data.age);
                                            expect(user.get('email')).toBe(data.email);
                                            expect(user.get('position')).toBe(data.position);
                                            expect(user.get('address')).toBe(data.address);
                                            return [4 /*yield*/, user.destroy()];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test("Create User with incomplete data, receive error", function () { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            id: 1,
                            division_id: 1,
                            full_name: "",
                            phone: 12345678,
                            age: 10,
                            email: "",
                            position: "",
                            address: "",
                            state: true
                        };
                        return [4 /*yield*/, request(server.app)
                                .post("/api/users")
                                .send(data)
                                .expect(400)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("PATCH  /api/users/:id", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_1.default.create({
                        division_id: 1,
                        full_name: "Person One",
                        phone: 12345678,
                        age: 10,
                        email: "one@person.com",
                        position: "first",
                        address: "test street 1",
                        state: true
                    })];
                case 1:
                    user = _a.sent();
                    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, user.destroy()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    test("Update valid User ID", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    data = {
                                        division_id: 2,
                                        full_name: "New Person",
                                        phone: 87654321,
                                        age: 30,
                                        email: "new@person.com",
                                        position: "new",
                                        address: "new street 1",
                                        state: true
                                    };
                                    return [4 /*yield*/, request(server.app)
                                            .patch("/api/users/" + user.get('id').toString())
                                            .send(data)
                                            .expect(200)
                                            .then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                                            var id, user;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        // Check the response
                                                        expect(response.body.id).toBeTruthy();
                                                        expect(response.body.division_id).toBe(data.division_id);
                                                        expect(response.body.full_name).toBe(data.full_name);
                                                        expect(response.body.phone).toBe(data.phone);
                                                        expect(response.body.age).toBe(data.age);
                                                        expect(response.body.email).toBe(data.email);
                                                        expect(response.body.position).toBe(data.position);
                                                        expect(response.body.address).toBe(data.address);
                                                        expect(response.body.state).toBe(data.state);
                                                        id = response.body.id;
                                                        return [4 /*yield*/, user_1.default.findOne(id)];
                                                    case 1:
                                                        user = _a.sent();
                                                        expect(user).toBeTruthy();
                                                        expect(user.get('division_id')).toBe(data.division_id);
                                                        expect(user.get('full_name')).toBe(data.full_name);
                                                        expect(user.get('phone')).toBe(data.phone);
                                                        expect(user.get('age')).toBe(data.age);
                                                        expect(user.get('email')).toBe(data.email);
                                                        expect(user.get('position')).toBe(data.position);
                                                        expect(user.get('address')).toBe(data.address);
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    test("Update invalid User ID, receive error", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var data, fakeId;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    data = null;
                                    fakeId = "fake lol";
                                    return [4 /*yield*/, request(server.app)
                                            .patch("/api/users/" + fakeId)
                                            .send(data)
                                            .expect(400)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    }); });
    describe("DELETE /api/users/:id", function () {
        test("Request delete valid User ID", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_1.default.create({
                            division_id: 1,
                            full_name: "Person One",
                            phone: 12345678,
                            age: 10,
                            email: "one@person.com",
                            position: "first",
                            address: "test street 1",
                            state: true
                        })];
                    case 1:
                        user = _a.sent();
                        id = user.get('id');
                        return [4 /*yield*/, request(server.app)
                                .delete("/api/users/" + id.toString)
                                .expect(204)
                                .then(function () { return __awaiter(void 0, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _a = expect;
                                            return [4 /*yield*/, user_1.default.findOne(id)];
                                        case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()]).toBeFalsy()];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        user.destroy();
                        return [2 /*return*/];
                }
            });
        }); });
        test("Request delete invalid User ID, receive error", function () { return __awaiter(void 0, void 0, void 0, function () {
            var fakeId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fakeId = "fake lol";
                        return [4 /*yield*/, request(server.app)
                                .delete("/api/users/" + fakeId)
                                .expect(400)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
