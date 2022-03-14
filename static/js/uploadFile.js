window.onload = function () {
  const label = document.querySelector('#file-upload-label');
  label.addEventListener('dragover', (e) => e.preventDefault());
  label.addEventListener('dragleave', (e) => e.preventDefault());
  label.addEventListener('drop', (e) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    uploadFiles(files);
  });
};

function handleFormChange(e) {
  const { files } = e.target;
  uploadFiles(files);
  e.target.value = null;
}

function uploadFiles(files) {
  let formData = new FormData();
  for (let file of files) formData.append('uploadFile', file);

  fetch('/upload', {
    method: 'POST',
    body: formData
  })
    .then((response) => response.json())
    .then(({ total, success, error }) =>
      alert(`Total: ${total}\nSucceed: ${success}\nError: ${error}`)
    )
    .then((_) => init());
}
