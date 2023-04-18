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
console.log("Hello World");
// Initialize the editor with a JSON schema
//@ts-ignore
var editor = new JSONEditor(document.getElementById('editor_holder'), {
    schema: {
        type: "object",
        title: "Restaurant",
        properties: {
            name: {
                type: "string",
                minLength: 1,
                title: "Name",
            },
            make: {
                type: "string",
                enum: [
                    "Toyota",
                    "BMW",
                    "Honda",
                    "Ford",
                    "Chevy",
                    "VW"
                ]
            },
            model: {
                type: "string"
            },
            year: {
                type: "integer",
                enum: [
                    1995, 1996, 1997, 1998, 1999,
                    2000, 2001, 2002, 2003, 2004,
                    2005, 2006, 2007, 2008, 2009,
                    2010, 2011, 2012, 2013, 2014
                ],
                default: 2008
            },
            safety: {
                type: "integer",
                format: "rating",
                maximum: "5",
                exclusiveMaximum: false,
                readonly: false
            }
        }
    }
});
// Hook up the submit button to log to the console
//@ts-ignore
document.getElementById('submit').addEventListener('click', function () {
    console.log("Submit button clicked");
    // Get the value from the editor
    console.log(editor.getValue());
});
class S3StorageService {
    constructor(appS3Config) {
        this.bucketName = appS3Config.bucketName;
        this.bucketRegion = appS3Config.bucketRegion;
        this.IdentityPoolId = appS3Config.IdentityPoolId;
        this.s3Endpoint = appS3Config.s3Endpoint;
        this.accessKeyId = appS3Config.accessKeyId;
        this.secretAccessKey = appS3Config.secretAccessKey;
        //@ts-ignore
        this.credentialsAWS = new AWS.Credentials(this.accessKeyId, this.secretAccessKey);
        //@ts-ignore
        AWS.config.update({
            region: this.bucketRegion,
            //@ts-ignore
            /*credentials: new AWS.CognitoIdentityCredentials({
              IdentityPoolId: IdentityPoolId
            })
            }),*/
            credentials: this.credentialsAWS
        });
        //@ts-ignore
        this.ep = new AWS.Endpoint(this.s3Endpoint);
        //@ts-ignore
        this.s3 = new AWS.S3({
            endpoint: this.ep,
            apiVersion: "2006-03-01",
            params: { Bucket: this.bucketName },
            signatureVersion: "v4"
        });
    }
    getObject(path) {
        return __awaiter(this, void 0, void 0, function* () {
            var params = {
                Bucket: this.bucketName,
                Key: path
            };
            var result = yield this.s3.getObject(params, function (error, data) {
                if (error != null) {
                    console.log("Failed to retrieve an object: " + error);
                }
                else {
                    var obj = JSON.parse(data.Body.toString('ascii'));
                    //console.log(obj);
                    //alert("Loaded " + data.ContentLength + " bytes");
                    // do something with data.Body
                }
            }).promise();
            //console.log(result);
            return result;
        });
    }
    putObject(path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            var params = {
                Bucket: this.bucketName,
                Key: path,
                Body: JSON.stringify(data),
                ContentType: "application/json",
                ACL: "public-read"
            };
            yield this.s3.putObject(params, function (err, data) {
                if (err) {
                    console.log("Error", err);
                }
                if (data) {
                    console.log("Upload Success", data.Location);
                }
            }).promise();
        });
    }
    uploadObject(path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            var params = {
                Bucket: this.bucketName,
                Key: path,
                Body: JSON.stringify(data),
                ContentType: "application/json",
                ACL: "public-read"
            };
            yield this.s3.upload(params, function (err, data) {
                if (err) {
                    console.log("Error", err);
                }
                if (data) {
                    console.log("Upload Success", data.Location);
                }
            }).promise();
        });
    }
    deleteObject(path) {
        return __awaiter(this, void 0, void 0, function* () {
            var params = {
                Bucket: this.bucketName,
                Key: path
            };
            yield this.s3.deleteObject(params, function (err, data) {
                if (err) {
                    console.log("Error", err);
                }
                if (data) {
                    console.log("Upload Success", data.Location);
                }
            }).promise();
        });
    }
}
function getAppS3Config() {
    var bucketName = "opendataspace";
    var bucketRegion = "ch-dk-2";
    var IdentityPoolId = "IDENTITY_POOL_ID";
    var s3Endpoint = "sos-ch-dk-2.exo.io";
    var accessKeyId = "EXOaa0e83c0f535f2df2716f832";
    var secretAccessKey = "McsZ6-1P9NNtFbQ3hIt3baNYyBVrEkuJA8W9PdOFYf0";
    return {
        bucketName: bucketName,
        bucketRegion: bucketRegion,
        IdentityPoolId: IdentityPoolId,
        s3Endpoint: s3Endpoint,
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    };
}
