var dataTablaLibro = {
  el: "#formTableLibro",
  idTable: "tablaLibro",
  targetMensaje: "mensajeRptaLibro",
  mensajes: {
    errorListarAjax: "Error en listar los datos del servidor",
    errorGuardarAjax: "Error en guardar los datos en el servidor",
    success: "Se cargado guardo los cambios en los libros",
  },
  //urlListar: BASE_URL + "distrito/listar/" + provinciaId,
  urlGuardar: BASE_URL + "archivos/libro/guardar",
  urlListar: BASE_URL + "archivos/libro/buscar_pagina",
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
    paginas: { // llave de REST
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
      url: BASE_URL + 'archivos/#/libro/editar/'/*+ libro_id*/,
    },
    {
      tipo: "href",
      claseOperacion: "ver-libro",
      clase: "fa-book",
      estilos: "padding-left: 7px;",
      url: BASE_URL + 'archivos/#/libro/ver/'/*+ libro_id*/,
    },
    {
      tipo: "i",
      claseOperacion: "quitar-fila",
      clase: "fa-times",
      estilos: "padding-left: 10px;",
    },
  ],
  pagination: {
    urlCount: BASE_URL + "archivos/libro/count",
    pageSize: 20,
    idBotonesPaginacion: "librosBotonesPaginacion"
  },
  collection: new LibrosCollection(),
  model: "Libro",
};
