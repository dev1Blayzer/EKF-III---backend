"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const fireorm = require("fireorm");
const env_1 = require("./env");
function connect() {
    if (admin.apps.length !== 0) {
        return admin.firestore();
    }
    if (process &&
        process.env &&
        (process.env.FIREBASE_CONFIG || process.env.GOOGLE_CLOUD_PROJECT)) {
        admin.initializeApp();
    }
    else {
        const serviceAccount = require("../service-account.json");
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
            storageBucket: `${serviceAccount.project_id}.appspot.com`
        });
    }
    const firestore = admin.firestore();
    if (env_1.default("firestore.emulate", false)) {
        firestore.settings({
            host: env_1.default("firestore.host", "localhost:8080"),
            ssl: !!env_1.default("firestore.ssl")
        });
    }
    fireorm.initialize(firestore);
    return firestore;
}
exports.default = connect;
//# sourceMappingURL=connect.js.map