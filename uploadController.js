async function uploadController(req, res) {
  const { files } = req;
  const error = [];
  let total = 0;
  if (!files) return res.status(400).send('No file was upload.');

  if (Array.isArray(files.uploadFile)) {
    for (let file of files.uploadFile) {
      try {
        total += 1;
        await file.mv('./PUBLIC/upload/' + file.name);
      } catch (err) {
        error.push(err);
      }
    }
  } else {
    try {
      total += 1;
      await files.uploadFile.mv('./PUBLIC/upload/' + files.uploadFile.name);
    } catch (err) {
      error.push(err);
    }
  }

  return res.json({ success: total - error.length, error: error.length, total });
}

module.exports = uploadController;
