var dataVideoDetalle = {
  el: "body",
  containerModal: "modal-container",
  urlTemplate: STATICS_URL + "templates/archivos/video_detalle.html",
  handlebarsTemplateId: "video-detalle-template",
  targetMensaje: "mensajeRptaVideo",
  context: {
    titulo_modal: "Detalle Video",
  },
  closeFunction: function(){
     location.replace(BASE_URL + "archivos/#/video");
  },
}
