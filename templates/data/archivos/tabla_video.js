var dataTablaVideo = {
  el: "#formTableVideo",
  idTable: "tablaVideo",
  targetMensaje: "mensajeRptaVideo",
  mensajes: {
    errorListarAjax: "Error en listar los datos del servidor",
    errorGuardarAjax: "Error en guardar los datos en el servidor",
    success: "Se cargado guardo los cambios en los videos",
  },
  //urlListar: BASE_URL + "distrito/listar/" + provinciaId,
  urlGuardar: BASE_URL + "archivos/video/guardar",
  urlListar: BASE_URL + "archivos/video/buscar_pagina",
  fila: {
    id: { // llave de REST
      tipo: "td_id",
      estilos: "color: blue; display:none",
      edicion: false,
    },
    nombre: { // llave de REST
      tipo: "label",
      estilos: "width: 200px;",
      edicion: true,
    },
    duracion: { // llave de REST
      tipo: "label",
      estilos: "width: 60px;",
      edicion: true,
    },
    anio: { // llave de REST
      tipo: "label",
      estilos: "width: 60px;",
      edicion: true,
    },
    autores: { // llave de REST
      tipo: "label",
      estilos: "width: 200px;",
      edicion: true,
    },
    categorias: { // llave de REST
      tipo: "label",
      estilos: "width: 200px;",
      edicion: true,
    },
    filaBotones: {
      estilos: "width: 80px; padding-left: 7px;"
    },
  },
  filaBotones: [
    {
      tipo: "href",
      claseOperacion: "editar-detalle",
      clase: "fa-pencil",
      estilos: "padding-left: 7px;",
      url: BASE_URL + 'archivos/#/video/editar/'/*+ video_id*/,
    },
    {
      tipo: "href",
      claseOperacion: "ver-video",
      clase: "fa-book",
      estilos: "padding-left: 7px;",
      url: BASE_URL + 'archivos/#/video/ver/'/*+ video_id*/,
    },
    {
      tipo: "i",
      claseOperacion: "quitar-fila",
      clase: "fa-times",
      estilos: "padding-left: 10px;",
    },
  ],
  pagination: {
    urlCount: BASE_URL + "archivos/video/count",
    pageSize: 20,
    idBotonesPaginacion: "videosBotonesPaginacion"
  },
  collection: new VideosCollection(),
  model: "Video",
};
