
# Architecture
## Route <-> Controller <-> Model <-> Database

## Flow
    All the validation regarding the balance of user's in each wallets can be done at MasterWallet Service.
    All the individual crypto wallet related functionality will stay in MicroWallet Services.

## Custom Event Emitters
    Custom Event Emitters are created at './utils/event-emitters.js' for notifiying other parts of the code about certain events, mostly, connection established and initialization with MongoDB and Redis.

## Dynamic File Imports 
    Circular dependencies between some modules have been resolved with runtime requires.
    In Async Programming Environments,
    Import all the dependencies in the entry file, in the independent to dependent order.
    OR, 
    Import files at the runtimes (inside callbacks), when those dependencies will be fully loaded.


# Mongoose
## Schema
    Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

    ```
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var blogSchema = new Schema({
        title:  String,
        author: String,
        body:   String,
        comments: [{ body: String, date: Date }],
        date: { type: Date, default: Date.now },
        hidden: Boolean,
        meta: {
        votes: Number,
        favs:  Number
        }
    });
    ```

## Model
    To use our schema definition, we need to convert our blogSchema into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema):

    ```
    // define a schema
    var animalSchema = new Schema({ name: String, type: String });

    // assign a function to the "methods" object of our animalSchema
    animalSchema.methods.findSimilarTypes = function(cb) {
        return this.model('Animal').find({ type: this.type }, cb);
    };

     var dog = new Animal({ type: 'dog' });

    dog.findSimilarTypes(function(err, dogs) {
        console.log(dogs); // woof
    });
    ```

    Note: methods must be added to the schema before compiling it with mongoose.model()
    
    Do not declare methods using ES6 arrow functions (=>). Arrow functions explicitly prevent binding this,so your method will not have access to the document and the above examples will not work.

## Statics
    Adding static methods to a Model is simple as well. Continuing with our animalSchema:
    ```
    // assign a function to the "statics" object of our animalSchema
    animalSchema.statics.findByName = function(name, cb) {
        return this.find({ name: new RegExp(name, 'i') }, cb);
    };

    var Animal = mongoose.model('Animal', animalSchema);
    Animal.findByName('fido', function(err, animals) {
        console.log(animals);
    });
    ```

    _Do not declare statics using ES6 arrow functions (=>). Arrow functions explicitly prevent binding this, so the above examples will not work because of the value of this._

# Request HTTP Module
## POST Request
    ```
    request_post({url: api, body, json: true });
    ```
    json: true => for sending json body without the need to stringify.

# Security Concerns

# TODO
## add kyc status api for sidebar.

## User wallet smart contract (done)
    sweep => send all the ethers/tokens to cold storage
    ownerChange => change the owner
    kill => self destruct

# JWT
## Payload Structure
    ```
        {
            "uid": "3dff4098-b893-40c7-917f-0ad7dad17ffe",
            "trollname": "coinesta",
            "data": {
                "name": "",
                "mobile_code": "",
                "mobile_number": "",
                "email": "abhinav.nishu94@gmail.com",
                "trollname": "coinesta",
                "language": "",
                "timezone": "",
                "verification_level": 0
            },
            "iat": 1520430784,
            "exp": 1527270784,
            "jti": "7iQ0qWJA8C3xT15ZuOsFl9"
        }
    ```

# User Model
{
    "counts": {
        "failed_login": 0
    },
    "tokens": {
        "email_verification_token": "e98614cf-265e-4436-b8b0-af3cc3ac59f0",
        "pass_change_token": ""
    },
    "keys": {
        "2fa_secret": "CYN6325GANUWHXE2",
        "email_pgp_key": "",
        "nonce": "10f40e00-594e-40a1-a9fd-7a5563ac5909"
    },
    "kyc": {
        "status": "pending",
        "passport": "",
        "national_id": ""
    },
    "_id": "5b1566b9135d7d2054652564",
    "uid": "f6590372-ceec-45ad-b3f0-c16478965ab2",
    "username": "abhinav.nishu94@gmail.com",
    "pass": "08d632bf091155ff2ed993fac2802f27",
    "2fa_enabled": 0,
    "banned_reason": "",
    "account_status": 1,    // 0 => email_not_verified, -1 => ban, 1 => activated, activation is done only // on based of email verification
    "trollname_status": 1,
    "details": {
        "name": "",
        "mobile_code": "",
        "mobile_number": "",
        "email": "abhinav.nishu94@gmail.com",
        "trollname": "hackett.hailie",
        "language": "",
        "timezone": "",
        "verification_level": 0
    },
    "timestamps": {
        "created_at": 1528129209,
        "last_pass_changed_requested": 1528129209,
        "verification_token_send_time": 1528129209,
        "last_pass_changed": 1528042809,
        "2fa_disabled_at": 1528042809,
        "last_failed_login_time": 1528042809,
        "kyc_upload_time": 1528129209
    }
}

# TODO
## Withdrawal & Hot Wallet Management
## User Management (transaction history, ban/unban, activate/deactivate functionalities)
1.) Add login to admin. (pending)
2.) All user listing (pick from DB). (Name, email, created time, trollbox username, kyc status, kyc docs links, email verification status, user activation status (active or banned), 2FA status (active or not active), last login time, last password changed time) (done)
3.) Admin can mark user email verified or unverified. (done)
4.) Admin can ban or unban any user. (done)
5.) Admin can see transactions (deposit and withdrawals) of any user. (done)
6.) Admin can see the balances of any user. (done)
7.) Admin can disable 2FA (if enabled) for any user. (done)
8.) Admin can see all deposit address of any user. (done)

## KYC Management
## Exchange Management (Market Order Pairs, Live Orders)

## Roles => Admin(multi), Sub-Admin(multi)