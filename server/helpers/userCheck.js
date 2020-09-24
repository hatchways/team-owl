//function to make sure only the user who created the model instance (eg. contest, submission) can
//delete the model.
exports.userCheck = (model, user) => {
  const createdByIdObject = model.user._id;
  const createdByIdString = createdByIdObject.toString();
  const userId = user.userId;
  if (createdByIdString === userId) {
    return true;
  }
};
