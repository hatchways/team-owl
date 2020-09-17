exports.userCheck = (model, user) => {
  const createdByIdObject = model.user._id;
  const createdByIdString = createdByIdObject.toString();
  const userId = user.userId;
  if (createdByIdString === userId) {
    return true;
  }
};
