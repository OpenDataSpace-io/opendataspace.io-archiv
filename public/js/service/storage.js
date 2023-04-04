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
