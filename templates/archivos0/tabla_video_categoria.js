var dataVideoCategoria = new TableView({
  el: "#formTableCategoriaVideo",
  idTable: "tablaCategoriaVideo",
  targetMensaje: "mensajeRptaCategoriaVideo",
  mensajes: {
    errorListarAjax: "Error en listar los datos del servidor",
    errorGuardarAjax: "Error en guardar los datos en el servidor",
    success: "Se cargado guardo las asociaciones a las videos",
  },
  //urlListar: BASE_URL + "distrito/listar/" + provinciaId,
  urlGuardar: BASE_URL + "archivos/video/guardar/categoria",
  urlListar: BASE_URL + "archivos/video/listar/categorias/",
  fila: {
    id: { // llave de REST
      tipo: "td_id",
      estilos: "color: blue; display:none",
      edicion: false,
    },
    categoria_id: { // llave de REST
      tipo: "autocomplete",
      estilos: "width: 200px;",
      edicion: true,
      url: BASE_URL + "archivos/categoria/buscar",
      collection: new CategoriasCollection(),
      model: "Categoria",
      mensajeError: "Ha ocurrido un error al buscar las videos",
      keyModeloInput: "categoria_nombre",
      keyModeloCelda: "categoria_id",
    },
    filaBotones: {
      estilos: "width: 80px"
    },
  },
  filaBotones: [
    {
      tipo: "i",
      claseOperacion: "quitar-fila",
      clase: "fa-times",
      estilos: "padding-left: 15px;",
    },
  ],
  collection: new CategoriasCollection(),
  model: "Categoria",
});
