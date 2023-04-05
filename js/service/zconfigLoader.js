"use strict";
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
