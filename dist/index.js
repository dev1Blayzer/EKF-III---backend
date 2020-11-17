const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const connect = require('./connect');
const session = require('./session');

const tieUserToJob = require("./triggers/tieUserToJob");
const Job = require("./models/Job");
const Place = require("./models/Place");
const Special = require("./models/Special");
const User = require("./models/User");
const Log = require("./models/Log");
const Migration = require("./models/Migration");


const db = connect.default();

async function cleanObject(obj, options = {}) {
  const newObj = {};
  const includes = options && options.include ? options.include.split(",") : false;
  const excludes = options && options.exclude ? options.exclude.split(",") : false;
  const relations = options && options.with ? options.with.split(",") : false;
  for (const key of Object.keys(obj)) {
    try {
      if (
        relations &&
        relations.includes(key) &&
        typeof obj[key] === "object" &&
        obj[key].path
      ) {
        const doc = await db.doc(obj[key].path).get();
        newObj[key] = await cleanObject({ id: doc.id, ...doc.data() }, {});
      } else if (includes && includes.includes(key)) {
        newObj[key] =
        obj[key] && typeof obj[key] === "object" && !!obj[key]._firestore
        ? { id: obj[key].id, path: obj[key].path }
        : obj[key];
      } else if (excludes && excludes.includes(key)) {
        continue;
      } else {
        newObj[key] =
        obj[key] && typeof obj[key] === "object" && !!obj[key]._firestore
        ? { id: obj[key].id, path: obj[key].path }
        : obj[key];
      }
    } catch (e) {
      console.log(`Error getting ${key}`, obj[key], e);
    }
  }

  return newObj;
}

async function cleanData(input, options = {}) {
  if (typeof input === "string") return input;

  let output = [];

  if (typeof input === "object" && input.length) {
    for (const row of input) {
      output.push(await cleanObject(row, options));
    }
  } else {
    output = await cleanObject(input, options);
  }

  return output;
}

const app = express();

const hookOptions = { type: "rest", context: {} };

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
app.use(async function(req, res, next) {
  hookOptions.context = await session.default({req: req, admin: admin, db: db});
  next();
});

// build multiple CRUD interfaces:
app.post("/job", async (req, res) => {
  const model = new Job.JobModel();
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth("add", req.body, hookOptions))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const docData =
    model.onBeforeAdd && typeof model.onBeforeAdd === "function"
      ? await model.onBeforeAdd(req.body, hookOptions)
      : model.onBeforeWrite && typeof model.onBeforeWrite === "function"
      ? await model.onBeforeWrite(req.body, hookOptions)
      : req.body;
  if (docData === false) {
    return res.status(400).send({
      message: "No data for doc!"
    });
  }

  const newDoc = await model.create(docData);

  return res.send(
    await cleanData(
      model.onAfterAdd && typeof model.onAfterAdd === "function"
        ? await model.onAfterAdd(newDoc, hookOptions)
        : model.onAfterWrite && typeof model.onAfterWrite === "function"
        ? await model.onAfterWrite(newDoc, hookOptions)
        : newDoc
    , {with: req.body.with, include: req.body.include, exclude: req.body.exclude})
  );
});
app.post("/place", async (req, res) => {
  const model = new Place.PlaceModel();
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth("add", req.body, hookOptions))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const docData =
    model.onBeforeAdd && typeof model.onBeforeAdd === "function"
      ? await model.onBeforeAdd(req.body, hookOptions)
      : model.onBeforeWrite && typeof model.onBeforeWrite === "function"
      ? await model.onBeforeWrite(req.body, hookOptions)
      : req.body;
  if (docData === false) {
    return res.status(400).send({
      message: "No data for doc!"
    });
  }

  const newDoc = await model.create(docData);

  return res.send(
    await cleanData(
      model.onAfterAdd && typeof model.onAfterAdd === "function"
        ? await model.onAfterAdd(newDoc, hookOptions)
        : model.onAfterWrite && typeof model.onAfterWrite === "function"
        ? await model.onAfterWrite(newDoc, hookOptions)
        : newDoc
    , {with: req.body.with, include: req.body.include, exclude: req.body.exclude})
  );
});
app.post("/special", async (req, res) => {
  const model = new Special.SpecialModel();
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth("add", req.body, hookOptions))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const docData =
    model.onBeforeAdd && typeof model.onBeforeAdd === "function"
      ? await model.onBeforeAdd(req.body, hookOptions)
      : model.onBeforeWrite && typeof model.onBeforeWrite === "function"
      ? await model.onBeforeWrite(req.body, hookOptions)
      : req.body;
  if (docData === false) {
    return res.status(400).send({
      message: "No data for doc!"
    });
  }

  const newDoc = await model.create(docData);

  return res.send(
    await cleanData(
      model.onAfterAdd && typeof model.onAfterAdd === "function"
        ? await model.onAfterAdd(newDoc, hookOptions)
        : model.onAfterWrite && typeof model.onAfterWrite === "function"
        ? await model.onAfterWrite(newDoc, hookOptions)
        : newDoc
    , {with: req.body.with, include: req.body.include, exclude: req.body.exclude})
  );
});
app.post("/user", async (req, res) => {
  const model = new User.UserModel();
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth("add", req.body, hookOptions))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const docData =
    model.onBeforeAdd && typeof model.onBeforeAdd === "function"
      ? await model.onBeforeAdd(req.body, hookOptions)
      : model.onBeforeWrite && typeof model.onBeforeWrite === "function"
      ? await model.onBeforeWrite(req.body, hookOptions)
      : req.body;
  if (docData === false) {
    return res.status(400).send({
      message: "No data for doc!"
    });
  }

  const newDoc = await model.create(docData);

  return res.send(
    await cleanData(
      model.onAfterAdd && typeof model.onAfterAdd === "function"
        ? await model.onAfterAdd(newDoc, hookOptions)
        : model.onAfterWrite && typeof model.onAfterWrite === "function"
        ? await model.onAfterWrite(newDoc, hookOptions)
        : newDoc
    , {with: req.body.with, include: req.body.include, exclude: req.body.exclude})
  );
});
app.delete("/job/:id", async (req, res) => {
  const model = new Job.JobModel();
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth("list", { id: req.params.id }, hookOptions))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const modelBefore = await model.find(req.params.id);
  if (model.onBeforeDelete && typeof model.onBeforeDelete === "function") {
    const res = await model.onBeforeDelete({
      id: req.params.id,
      ...modelBefore
    }, hookOptions);
    if (res === false) {
      return res.status(400).send({
        message: "No data for doc!"
      });
    }
  }
  await model.delete(req.params.id);

  return res.send(
    await cleanData(
      model.onAfterDelete && typeof model.onAfterDelete === "function"
        ? await model.onAfterDelete({ id: req.params.id, ...modelBefore }, hookOptions)
        : { id: req.params.id, ...modelBefore }
    , {with: req.query.with, include: req.query.include, exclude: req.query.exclude})
  );
});
app.delete("/place/:id", async (req, res) => {
  const model = new Place.PlaceModel();
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth("list", { id: req.params.id }, hookOptions))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const modelBefore = await model.find(req.params.id);
  if (model.onBeforeDelete && typeof model.onBeforeDelete === "function") {
    const res = await model.onBeforeDelete({
      id: req.params.id,
      ...modelBefore
    }, hookOptions);
    if (res === false) {
      return res.status(400).send({
        message: "No data for doc!"
      });
    }
  }
  await model.delete(req.params.id);

  return res.send(
    await cleanData(
      model.onAfterDelete && typeof model.onAfterDelete === "function"
        ? await model.onAfterDelete({ id: req.params.id, ...modelBefore }, hookOptions)
        : { id: req.params.id, ...modelBefore }
    , {with: req.query.with, include: req.query.include, exclude: req.query.exclude})
  );
});
app.delete("/special/:id", async (req, res) => {
  const model = new Special.SpecialModel();
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth("list", { id: req.params.id }, hookOptions))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const modelBefore = await model.find(req.params.id);
  if (model.onBeforeDelete && typeof model.onBeforeDelete === "function") {
    const res = await model.onBeforeDelete({
      id: req.params.id,
      ...modelBefore
    }, hookOptions);
    if (res === false) {
      return res.status(400).send({
        message: "No data for doc!"
      });
    }
  }
  await model.delete(req.params.id);

  return res.send(
    await cleanData(
      model.onAfterDelete && typeof model.onAfterDelete === "function"
        ? await model.onAfterDelete({ id: req.params.id, ...modelBefore }, hookOptions)
        : { id: req.params.id, ...modelBefore }
    , {with: req.query.with, include: req.query.include, exclude: req.query.exclude})
  );
});
app.delete("/user/:id", async (req, res) => {
  const model = new User.UserModel();
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth("list", { id: req.params.id }, hookOptions))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const modelBefore = await model.find(req.params.id);
  if (model.onBeforeDelete && typeof model.onBeforeDelete === "function") {
    const res = await model.onBeforeDelete({
      id: req.params.id,
      ...modelBefore
    }, hookOptions);
    if (res === false) {
      return res.status(400).send({
        message: "No data for doc!"
      });
    }
  }
  await model.delete(req.params.id);

  return res.send(
    await cleanData(
      model.onAfterDelete && typeof model.onAfterDelete === "function"
        ? await model.onAfterDelete({ id: req.params.id, ...modelBefore }, hookOptions)
        : { id: req.params.id, ...modelBefore }
    , {with: req.query.with, include: req.query.include, exclude: req.query.exclude})
  );
});
app.post("/job/:id", async (req, res) => {
  const model = new Job.JobModel();
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth("edit", { ...req.body, id: req.params.id }, hookOptions))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const docData =
    model.onBeforeEdit && typeof model.onBeforeEdit === "function"
      ? await model.onBeforeEdit({ id: req.params.id, ...req.body }, hookOptions)
      : model.onBeforeWrite && typeof model.onBeforeWrite === "function"
      ? await model.onBeforeWrite({ id: req.params.id, ...req.body }, hookOptions)
      : data;
  if (docData === false) {
    return res.status(400).send({
      message: "No data for doc!"
    });
  }

  const doc = await model.update({ id: req.params.id, ...req.body });
  
  return res.send(
    await cleanData(
      model.onAfterEdit && typeof model.onAfterEdit === "function"
        ? await model.onAfterEdit(doc, hookOptions)
        : model.onAfterWrite && typeof model.onAfterWrite === "function"
        ? await model.onAfterWrite(doc, hookOptions)
        : doc
    , {with: req.body.with, include: req.body.include, exclude: req.body.exclude})
  );
});
app.post("/place/:id", async (req, res) => {
  const model = new Place.PlaceModel();
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth("edit", { ...req.body, id: req.params.id }, hookOptions))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const docData =
    model.onBeforeEdit && typeof model.onBeforeEdit === "function"
      ? await model.onBeforeEdit({ id: req.params.id, ...req.body }, hookOptions)
      : model.onBeforeWrite && typeof model.onBeforeWrite === "function"
      ? await model.onBeforeWrite({ id: req.params.id, ...req.body }, hookOptions)
      : data;
  if (docData === false) {
    return res.status(400).send({
      message: "No data for doc!"
    });
  }

  const doc = await model.update({ id: req.params.id, ...req.body });
  
  return res.send(
    await cleanData(
      model.onAfterEdit && typeof model.onAfterEdit === "function"
        ? await model.onAfterEdit(doc, hookOptions)
        : model.onAfterWrite && typeof model.onAfterWrite === "function"
        ? await model.onAfterWrite(doc, hookOptions)
        : doc
    , {with: req.body.with, include: req.body.include, exclude: req.body.exclude})
  );
});
app.post("/special/:id", async (req, res) => {
  const model = new Special.SpecialModel();
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth("edit", { ...req.body, id: req.params.id }, hookOptions))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const docData =
    model.onBeforeEdit && typeof model.onBeforeEdit === "function"
      ? await model.onBeforeEdit({ id: req.params.id, ...req.body }, hookOptions)
      : model.onBeforeWrite && typeof model.onBeforeWrite === "function"
      ? await model.onBeforeWrite({ id: req.params.id, ...req.body }, hookOptions)
      : data;
  if (docData === false) {
    return res.status(400).send({
      message: "No data for doc!"
    });
  }

  const doc = await model.update({ id: req.params.id, ...req.body });
  
  return res.send(
    await cleanData(
      model.onAfterEdit && typeof model.onAfterEdit === "function"
        ? await model.onAfterEdit(doc, hookOptions)
        : model.onAfterWrite && typeof model.onAfterWrite === "function"
        ? await model.onAfterWrite(doc, hookOptions)
        : doc
    , {with: req.body.with, include: req.body.include, exclude: req.body.exclude})
  );
});
app.post("/user/:id", async (req, res) => {
  const model = new User.UserModel();
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth("edit", { ...req.body, id: req.params.id }, hookOptions))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const docData =
    model.onBeforeEdit && typeof model.onBeforeEdit === "function"
      ? await model.onBeforeEdit({ id: req.params.id, ...req.body }, hookOptions)
      : model.onBeforeWrite && typeof model.onBeforeWrite === "function"
      ? await model.onBeforeWrite({ id: req.params.id, ...req.body }, hookOptions)
      : data;
  if (docData === false) {
    return res.status(400).send({
      message: "No data for doc!"
    });
  }

  const doc = await model.update({ id: req.params.id, ...req.body });
  
  return res.send(
    await cleanData(
      model.onAfterEdit && typeof model.onAfterEdit === "function"
        ? await model.onAfterEdit(doc, hookOptions)
        : model.onAfterWrite && typeof model.onAfterWrite === "function"
        ? await model.onAfterWrite(doc, hookOptions)
        : doc
    , {with: req.body.with, include: req.body.include, exclude: req.body.exclude})
  );
});
app.get("/job/:id", async (req, res) => {
  const model = new Job.JobModel();
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth(
      "find",
      {
        id: req.params.id,
      },
      hookOptions
    ))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const doc =
    model.onBeforeFind && typeof model.onBeforeFind === "function"
      ? await model.onBeforeFind(req.params.id, hookOptions)
      : await model.find(req.params.id);
  return res.send(
    await cleanData(
      model.onAfterFind && typeof model.onAfterFind === "function"
        ? await model.onAfterFind(doc, hookOptions)
        : doc
    , {with: req.query.with, include: req.query.include, exclude: req.query.exclude})
  );
});
app.get("/job",  async (req, res) => {
  const model = new Job.JobModel();
  console.log(JSON.stringify(hookOptions));
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth("list", req.query ? req.query : {}, hookOptions))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const docs =
    model.onBeforeList && typeof model.onBeforeList === "function"
      ? await model.onBeforeList(req.query, hookOptions)
      : await model.paginate(req.query);
  return res.send(
    await cleanData(
      model.onAfterList && typeof model.onAfterList === "function"
        ? await model.onAfterList(docs, hookOptions)
        : docs
    , {with: req.query.with, include: req.query.include, exclude: req.query.exclude})
  );
});
app.get("/log/:id", async (req, res) => {
  const model = new Log.LogModel();
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth(
      "find",
      {
        id: req.params.id,
      },
      hookOptions
    ))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const doc =
    model.onBeforeFind && typeof model.onBeforeFind === "function"
      ? await model.onBeforeFind(req.params.id, hookOptions)
      : await model.find(req.params.id);
  return res.send(
    await cleanData(
      model.onAfterFind && typeof model.onAfterFind === "function"
        ? await model.onAfterFind(doc, hookOptions)
        : doc
    , {with: req.query.with, include: req.query.include, exclude: req.query.exclude})
  );
});
app.get("/log",  async (req, res) => {
  const model = new Log.LogModel();
  console.log(JSON.stringify(hookOptions));
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth("list", req.query ? req.query : {}, hookOptions))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const docs =
    model.onBeforeList && typeof model.onBeforeList === "function"
      ? await model.onBeforeList(req.query, hookOptions)
      : await model.paginate(req.query);
  return res.send(
    await cleanData(
      model.onAfterList && typeof model.onAfterList === "function"
        ? await model.onAfterList(docs, hookOptions)
        : docs
    , {with: req.query.with, include: req.query.include, exclude: req.query.exclude})
  );
});
app.get("/migration/:id", async (req, res) => {
  const model = new Migration.MigrationModel();
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth(
      "find",
      {
        id: req.params.id,
      },
      hookOptions
    ))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const doc =
    model.onBeforeFind && typeof model.onBeforeFind === "function"
      ? await model.onBeforeFind(req.params.id, hookOptions)
      : await model.find(req.params.id);
  return res.send(
    await cleanData(
      model.onAfterFind && typeof model.onAfterFind === "function"
        ? await model.onAfterFind(doc, hookOptions)
        : doc
    , {with: req.query.with, include: req.query.include, exclude: req.query.exclude})
  );
});
app.get("/migration",  async (req, res) => {
  const model = new Migration.MigrationModel();
  console.log(JSON.stringify(hookOptions));
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth("list", req.query ? req.query : {}, hookOptions))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const docs =
    model.onBeforeList && typeof model.onBeforeList === "function"
      ? await model.onBeforeList(req.query, hookOptions)
      : await model.paginate(req.query);
  return res.send(
    await cleanData(
      model.onAfterList && typeof model.onAfterList === "function"
        ? await model.onAfterList(docs, hookOptions)
        : docs
    , {with: req.query.with, include: req.query.include, exclude: req.query.exclude})
  );
});
app.get("/place/:id", async (req, res) => {
  const model = new Place.PlaceModel();
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth(
      "find",
      {
        id: req.params.id,
      },
      hookOptions
    ))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const doc =
    model.onBeforeFind && typeof model.onBeforeFind === "function"
      ? await model.onBeforeFind(req.params.id, hookOptions)
      : await model.find(req.params.id);
  return res.send(
    await cleanData(
      model.onAfterFind && typeof model.onAfterFind === "function"
        ? await model.onAfterFind(doc, hookOptions)
        : doc
    , {with: req.query.with, include: req.query.include, exclude: req.query.exclude})
  );
});
app.get("/place",  async (req, res) => {
  const model = new Place.PlaceModel();
  console.log(JSON.stringify(hookOptions));
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth("list", req.query ? req.query : {}, hookOptions))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const docs =
    model.onBeforeList && typeof model.onBeforeList === "function"
      ? await model.onBeforeList(req.query, hookOptions)
      : await model.paginate(req.query);
  return res.send(
    await cleanData(
      model.onAfterList && typeof model.onAfterList === "function"
        ? await model.onAfterList(docs, hookOptions)
        : docs
    , {with: req.query.with, include: req.query.include, exclude: req.query.exclude})
  );
});
app.get("/special/:id", async (req, res) => {
  const model = new Special.SpecialModel();
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth(
      "find",
      {
        id: req.params.id,
      },
      hookOptions
    ))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const doc =
    model.onBeforeFind && typeof model.onBeforeFind === "function"
      ? await model.onBeforeFind(req.params.id, hookOptions)
      : await model.find(req.params.id);
  return res.send(
    await cleanData(
      model.onAfterFind && typeof model.onAfterFind === "function"
        ? await model.onAfterFind(doc, hookOptions)
        : doc
    , {with: req.query.with, include: req.query.include, exclude: req.query.exclude})
  );
});
app.get("/special",  async (req, res) => {
  const model = new Special.SpecialModel();
  console.log(JSON.stringify(hookOptions));
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth("list", req.query ? req.query : {}, hookOptions))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const docs =
    model.onBeforeList && typeof model.onBeforeList === "function"
      ? await model.onBeforeList(req.query, hookOptions)
      : await model.paginate(req.query);
  return res.send(
    await cleanData(
      model.onAfterList && typeof model.onAfterList === "function"
        ? await model.onAfterList(docs, hookOptions)
        : docs
    , {with: req.query.with, include: req.query.include, exclude: req.query.exclude})
  );
});
app.get("/user/:id", async (req, res) => {
  const model = new User.UserModel();
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth(
      "find",
      {
        id: req.params.id,
      },
      hookOptions
    ))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const doc =
    model.onBeforeFind && typeof model.onBeforeFind === "function"
      ? await model.onBeforeFind(req.params.id, hookOptions)
      : await model.find(req.params.id);
  return res.send(
    await cleanData(
      model.onAfterFind && typeof model.onAfterFind === "function"
        ? await model.onAfterFind(doc, hookOptions)
        : doc
    , {with: req.query.with, include: req.query.include, exclude: req.query.exclude})
  );
});
app.get("/user",  async (req, res) => {
  const model = new User.UserModel();
  console.log(JSON.stringify(hookOptions));
  if (
    model.onAuth &&
    typeof model.onAuth === "function" &&
    !(await model.onAuth("list", req.query ? req.query : {}, hookOptions))
  )
    return res.status(400).send({
      message: "Permission Denied!"
    });
  const docs =
    model.onBeforeList && typeof model.onBeforeList === "function"
      ? await model.onBeforeList(req.query, hookOptions)
      : await model.paginate(req.query);
  return res.send(
    await cleanData(
      model.onAfterList && typeof model.onAfterList === "function"
        ? await model.onAfterList(docs, hookOptions)
        : docs
    , {with: req.query.with, include: req.query.include, exclude: req.query.exclude})
  );
});


// Expose Express API as a single Cloud Function:
module.exports = {
  api: functions.https.onRequest(app),
  tieUserToJob: tieUserToJob.default,

};