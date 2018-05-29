var dataLibroUpload = {
  el: "#formUploadLibro",
  imagenId: "imagen_id",
  inputFileId: "inputLibro",
  buscarBtnId: "buscarLibro",
  subirBtnId: "subirLibro",
  verBtnId: "verLibro",
  fileName: "myFile",
  lblMensaje: "lblMensajeUpload",
  mensajes: {
    "formatoNoValido": "Archivo formato no válido",
    "tamanioNoValido": "Tamaño de archivo no válido",
    "errorAjax": "Error de comunicación con el servidor",
    "success": "Se cargado el archivo",
  },
  url: BASE_URL + "archivos/libro/subir",
  extraData: [
    {"llave": "nombre", "domId": "txtNombreArchivo"},
  ],
  maxSize: 3545850, //bytes
  allowTypes: ["application/pdf"],
  model: new Archivo(),
};
