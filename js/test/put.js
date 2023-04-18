"use strict";
function createObject(path, data) {
    const appS3Config = getAppS3Config();
    const instanceS3 = new S3StorageService(appS3Config);
    instanceS3.uploadObject(path, data);
}
const key = "test/username.json";
const data = { username: "TEST-Lokal" };
createObject(key, data);
