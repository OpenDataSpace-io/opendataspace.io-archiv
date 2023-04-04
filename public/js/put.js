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
function postJSON(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://opendataspace.sos-ch-dk-2.exo.io/test/user.json", {
                method: "PUT",
                headers: {
                    "Access-Control-Allow-Origin": "https://opendataspace.sos-ch-dk-2.exo.io",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = yield response.json();
            console.log("Success:", result);
        }
        catch (error) {
            console.error("Error:", error);
        }
    });
}
const data = { username: "example" };
postJSON(data);
