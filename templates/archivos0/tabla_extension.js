var dataTablaExtension = {
  el: "#formTableExtension",
  idTable: "tablaExtension",
  targetMensaje: "mensajeRptaExtension",
  mensajes: {
    errorListarAjax: "Error en listar los datos del servidor",
    errorGuardarAjax: "Error en guardar los datos en el servidor",
    success: "Se cargado guardo los cambios en los extensiones",
  },
  //urlListar: BASE_URL + "distrito/listar/" + provinciaId,
  urlGuardar: BASE_URL + "archivos/extension/guardar",
  urlListar: BASE_URL + "archivos/extension/buscar_pagina",
  fila: {
    id: { // llave de REST
      tipo: "td_id",
      estilos: "color: blue; display:none",
      edicion: false,
    },
    nombre: { // llave de REST
      tipo: "text",
      estilos: "width: 100px;",
      edicion: true,
    },
    mime: { // llave de REST
      tipo: "text",
      estilos: "width: 200px;",
      edicion: true,
    },
    filaBotones: {
      estilos: "width: 80px; padding-left: 7px;"
    },
  },
  pagination: {
    urlCount: BASE_URL + "archivos/extension/count",
    pageSize: 20,
    idBotonesPaginacion: "extensionesBotonesPaginacion"
  },
  filaBotones: [
    {
      tipo: "i",
      claseOperacion: "quitar-fila",
      clase: "fa-times",
      estilos: "padding-left: 10px;",
    },
  ],
  collection: new ExtensionesCollection(),
  model: "Extension",
};
