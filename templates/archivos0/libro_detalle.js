var dataLibroDetalle = {
  el: "body",
  containerModal: "modal-container",
  urlTemplate: STATICS_URL + "templates/archivos/libro_detalle.html",
  handlebarsTemplateId: "libro-detalle-template",
  targetMensaje: "mensajeRptaLibro",
  context: {
    titulo_modal: "Detalle Libro",
  },
  closeFunction: function(){
     location.replace(BASE_URL + "archivos/#/libro");
  },
}
