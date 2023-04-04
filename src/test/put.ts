async function postJSON(data: { username: string; }) {
    try {
        const response = await fetch("https://opendataspace.sos-ch-dk-2.exo.io/test/user.json", {
            method: "PUT", // or 'PUT'
            headers: {
                "Access-Control-Allow-Origin": "https://opendataspace.sos-ch-dk-2.exo.io",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

const data = { username: "example" };
postJSON(data);


// TEST 2
const BUCKET_NAME = "opendataspace";
const ENDPOINT = "sos-ch-dk-2.exo.io";
const region = "ch-dk-2";
const myService = "s3";
const IAM_USER_KEY = "";
const IAM_USER_SECRET = "";

var myMethod = 'PUT';
var myPath = '/';

function digestMessage(message: any) {
    const encoder = new TextEncoder();
    const dataEncode = encoder.encode(message);
    const contentsha256 = crypto.subtle.digest("SHA-256", dataEncode).then(function (hash) {
        return hash;
    });
    return contentsha256;
}

const contentsha256 = digestMessage(IAM_USER_KEY);
console.log("contentsha256: " + contentsha256);
var payload = '';
var hashedPayload = digestMessage(payload);
console.log("hashedPayload: " + hashedPayload);



// this function converts the generic JS ISO8601 date format to the specific format the AWS API wants
function getAmzDate(dateStr: string) {
    var chars = [":", "-"];
    for (var i = 0; i < chars.length; i++) {
        while (dateStr.indexOf(chars[i]) != -1) {
            dateStr = dateStr.replace(chars[i], "");
        }
    }
    dateStr = dateStr.split(".")[0] + "Z";
    return dateStr;
}

var amzDate = getAmzDate(new Date().toISOString());
var authDate = amzDate.split("T")[0];

console.log("amzDate: " + amzDate);
console.log("authDate: " + authDate);

var canonicalReq = myMethod + '\n' +
    myPath + '\n' +
    '\n' +
    'host:' + ENDPOINT + '\n' +
    'x-amz-content-sha256:' + hashedPayload + '\n' +
    'x-amz-date:' + amzDate + '\n' +
    '\n' +
    'host;x-amz-content-sha256;x-amz-date' + '\n' +
    hashedPayload;

var canonicalReqHash = digestMessage(canonicalReq);

var stringToSign = 'AWS4-HMAC-SHA256\n' +
    amzDate + '\n' +
    authDate + '/' + region + '/' + myService + '/aws4_request\n' +
    canonicalReqHash;

//var authKey = crypto.HmacSHA256(stringToSign, signingKey);
var authKey = window.crypto.subtle.generateKey(
    {
        name: "HMAC",
        hash: { name: "SHA-256" },
    },
    true,
    ["sign", "verify"]
).then(function (key) {
    return key;
});

// Form our authorization header
var authString = 'AWS4-HMAC-SHA256 ' +
    'Credential=' +
    IAM_USER_KEY + '/' +
    authDate + '/' +
    region + '/' +
    myService + '/aws4_request,' +
    'SignedHeaders=host;x-amz-content-sha256;x-amz-date,' +
    'Signature=' + authKey;

var myHeaders = new Headers();
myHeaders.append("Access-Control-Allow-Origin", "https://opendataspace.sos-ch-dk-2.exo.io");
myHeaders.append("x-amz-content-sha256", contentsha256.toString());
//myHeaders.append("x-amz-content-sha256", "beaead3198f7da1e70d03ab969765e0821b24fc913697e929e726aeaebf0eba3");
myHeaders.append("x-amz-acl", "public-read");
//myHeaders.append("X-Amz-Date", "20230404T114218Z");
myHeaders.append("X-Amz-Date", amzDate);
myHeaders.append("Authorization", "AWS4-HMAC-SHA256 Credential=" + IAM_USER_KEY + "/" + authDate + "/" + region + "/s3/aws4_request, SignedHeaders=host;x-amz-acl;x-amz-content-sha256;x-amz-date, Signature=e80517916de097e40d456299a1183b382026a9b348f6d53c032e82ff32920a7c");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "username": "example2444455554444445"
});

var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
};

//@ts-ignore
fetch("https://opendataspace.sos-ch-dk-2.exo.io/test/username.json", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
