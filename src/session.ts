export default async function session({ req, admin, db }) {
  const token =
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization !== "null"
      ? req.headers.authorization.replace("Bearer ", "")
      : null;
  let decodedToken = null;
  try {
    decodedToken = token ? await admin.auth().verifyIdToken(token) : null;
  } catch (err) {
    console.log(err.message);
  }

  const getRole = async () => {
    const role = (
      await db
        .collection("roles")
        .doc(token)
        .get()
    ).data();
    return role ? [role] : [];
  };

  return {
    referrer: req.headers && req.headers.referer ? req.headers.referer : null,
    token,
    user: decodedToken
      ? (
          await db
            .collection("users")
            .doc(decodedToken.uid)
            .get()
        ).data()
      : null,
    roles: decodedToken
      ? (
          await db
            .collection("users")
            .doc(decodedToken.uid)
            .collection("roles")
            .get()
        ).docs
      : !decodedToken && token
      ? await getRole()
      : [],
  };
}
