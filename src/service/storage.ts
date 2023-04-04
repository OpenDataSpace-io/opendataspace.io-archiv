interface S3Config {
    bucketName: string;
    bucketRegion: string;
    IdentityPoolId: string;
    s3Endpoint: string;
    accessKeyId: string;
    secretAccessKey: string;
}

class S3StorageService {
    //@ts-ignore
    private s3: AWS.S3;
    private bucketName: string;
    private bucketRegion: string;
    private IdentityPoolId: string;
    private s3Endpoint: string;
    private accessKeyId: string;
    private secretAccessKey: string;
    //@ts-ignore
    private credentialsAWS: AWS.Credentials;
    //@ts-ignore
    private ep: AWS.Endpoint;
    //@ts-ignore
    private config: AWS.config;

    constructor(appS3Config: S3Config) {
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

    async getObject(path: string) {
        var params = {
            Bucket: this.bucketName,
            Key: path
        };
        var result = await this.s3.getObject( params,
            function (error: string | null, data: any) {
                if (error != null) {
                    console.log("Failed to retrieve an object: " + error);
                } else {
                    var obj = JSON.parse(data.Body.toString('ascii'));
                    //console.log(obj);
                    //alert("Loaded " + data.ContentLength + " bytes");
                    // do something with data.Body
                }
            }
        ).promise();
        //console.log(result);
        return result;
    }

    async putObject(path: string, data: any) {
        var params = {
            Bucket: this.bucketName,
            Key: path,
            Body: JSON.stringify(data),
            ContentType: "application/json",
            ACL: "public-read"
        };
        await this.s3.putObject(params,
            function (err: any, data: any) {
                if (err) {
                    console.log("Error", err);
                } if (data) {
                    console.log("Upload Success", data.Location);
                }
            }
        ).promise();
    }

    async uploadObject(path: any, data: any) {
        var params = {
            Bucket: this.bucketName,
            Key: path,
            Body: JSON.stringify(data),
            ContentType: "application/json",
            ACL: "public-read"
        };
        await this.s3.upload(params, function (err: any, data: any) {
            if (err) {
                console.log("Error", err);
            } if (data) {
                console.log("Upload Success", data.Location);
            }
        }).promise();
    }

    async deleteObject(path: string) {
        var params = {
            Bucket: this.bucketName,
            Key: path
        };
        await this.s3.deleteObject(params,
            function (err: any, data: any) {
                if (err) {
                    console.log("Error", err);
                } if (data) {
                    console.log("Upload Success", data.Location);
                }
            }
        ).promise();
    }
}