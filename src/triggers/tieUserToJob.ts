import * as functions from "firebase-functions";

import connect from "../connect";
import tieUserToJobUnit from "../units/tieUserToJob/tieUserToJob";

export default functions.https.onRequest(async (req, res) => {
  connect();

  res.status(200).send({
    job: await tieUserToJobUnit(req.body && req.body.data ? req.body.data : {})
  });
});
