var VideoDetalleView = ModalView.extend({
  initialize: function(options){
    this.targetMensaje = options["targetMensaje"];
    // herencia de atributos, móetodos y eventos
    ModalView.prototype.initialize.apply(this, [options])
    this.inheritEvents(ModalView);
    // delegación de eventos
    this.delegateEvents();
    this.uploadVideo = new UploadView(dataVideoUpload);
    this.tablaCategoriaVideo = new TableView(dataVideoCategoria);
    this.tablaAutorVideo = new TableView(dataVideoAutor);
    this.model = new Video();
  },
  events: {
    // se está usando asignacion dinamica de eventos en el constructor
    "change #cbmTipoSede": "refrescarSedes",
    "click #btnGuardarDetalleDoctor": "guardarDoctor",
    "click #buscarVideo": "buscarVideo",
    "click #subirVideo" : "subirVideo",
    "click #btnGuardarDetalleVideoArchivo": "guardarDetalleVideoArchivo",
    "click #btnGuardarDetalleVideo": "guardarDetalleVideo",
    "click #tablaCategoriaVideo > tfoot > tr > td > button.agregar-fila": "agregarFilaCategoria",
    "click #tablaCategoriaVideo > tfoot > tr > td > button.guardar-tabla": "guardarTablaCategoria",
    "click #tablaCategoriaVideo > tbody > tr > td > i.quitar-fila": "quitarFilaTablaCategoria",
    "click #tablaAutorVideo > tfoot > tr > td > button.agregar-fila": "agregarFilaAutor",
    "click #tablaAutorVideo > tfoot > tr > td > button.guardar-tabla": "guardarTablaAutor",
    "click #tablaAutorVideo > tbody > tr > td > i.quitar-fila": "quitarFilaTablaAutor",
  },
  agregarFilaCategoria: function(event){
    this.tablaCategoriaVideo.agregarFila(event);
  },
  guardarTablaCategoria: function(event){
    this.tablaCategoriaVideo.extraData = {video_id: this.model.get("id")};
    this.tablaCategoriaVideo.guardarTabla(event);
  },
  quitarFilaTablaCategoria: function(event){
    this.tablaCategoriaVideo.quitarFila(event);
  },
  agregarFilaAutor: function(event){
    this.tablaAutorVideo.agregarFila(event);
  },
  guardarTablaAutor: function(event){
    this.tablaAutorVideo.extraData = {video_id: this.model.get("id")};
    this.tablaAutorVideo.guardarTabla(event);
  },
  quitarFilaTablaAutor: function(event){
    this.tablaAutorVideo.quitarFila(event);
  },
  buscarVideo: function(){
    this.uploadVideo.triggerInputFile();
  },
  subirVideo: function(){
    this.uploadVideo.subirFile();
  },
  setModel: function(){
    var viewInstance = this;
    $.ajax({
      type: "GET",
      url: BASE_URL + "archivos/video/obtener/" + viewInstance.get("video_id"),
      data: {csrfmiddlewaretoken: CSRF},
      async: false,
      success: function(data){
        responseData = JSON.parse(data);
        for (var key in responseData) {
          viewInstance.model.set(key, responseData[key]);
        }
      },
      error: function(error){
        $("#" + viewInstance.targetMensaje).removeClass("color-success");
        $("#" + viewInstance.targetMensaje).removeClass("color-warning");
        $("#" + viewInstance.targetMensaje).addClass("color-danger");
        $("#" + viewInstance.targetMensaje).html("Error en obtener el video a editar");
        $("html, body").animate({ scrollTop: $("#" + viewInstance.targetMensaje).offset().top }, 1000);
        console.log(error);
      }
    });
  },
  guardarDetalleVideo: function(){
    var viewInstance = this;
    this.model.set("nombre", $("#txtNombre").val());
    this.model.set("anio", $("#txtAnio").val());
    this.model.set("duracion", $("#txtDuracion").val());
    $.ajax({
      type: "POST",
      url: BASE_URL + "archivos/video/guardar_detalle",
      data: {csrfmiddlewaretoken: CSRF, data: JSON.stringify(viewInstance.model.toJSON())},
      async: false,
      success: function(data){
        var responseData = JSON.parse(data);
        if(responseData.tipo_mensaje == "success"){
          $("#" + viewInstance.targetMensaje).removeClass("color-danger");
          $("#" + viewInstance.targetMensaje).removeClass("color-warning");
          $("#" + viewInstance.targetMensaje).addClass("color-success");
          $("#" + viewInstance.targetMensaje).html(responseData.mensaje[0]);
          $("html, body").animate({ scrollTop: $("#" + viewInstance.targetMensaje).offset().top }, 1000);
          if(responseData.mensaje[1] !== undefined){ // se está recibiendo un id, osea nuevo registro
            viewInstance.model.set("id", responseData.mensaje[1]);
          }
        }
      },
      error: function(error){
        $("#" + viewInstance.targetMensaje).removeClass("color-success");
        $("#" + viewInstance.targetMensaje).removeClass("color-warning");
        $("#" + viewInstance.targetMensaje).addClass("color-danger");
        $("#" + viewInstance.targetMensaje).html("Error en guardar al doctor de turno");
        $("html, body").animate({ scrollTop: $("#" + viewInstance.targetMensaje).offset().top }, 1000);
        console.log(error);
      }
    });
  },
  guardarDetalleVideoArchivo: function(){
    var viewInstance = this;
    this.model.set("archivo_id", this.uploadVideo.model.id);
    this.model.set("nombre", $("#txtNombreArchivo").val());
    $.ajax({
      type: "POST",
      url: BASE_URL + "archivos/video/guardar_archivo",
      data: {csrfmiddlewaretoken: CSRF, data: JSON.stringify(viewInstance.model.toJSON())},
      async: false,
      success: function(data){
        var responseData = JSON.parse(data);
        if(responseData.tipo_mensaje == "success"){
          $("#" + viewInstance.targetMensaje).removeClass("color-danger");
          $("#" + viewInstance.targetMensaje).removeClass("color-warning");
          $("#" + viewInstance.targetMensaje).addClass("color-success");
          $("#" + viewInstance.targetMensaje).html(responseData.mensaje[0]);
          $("html, body").animate({ scrollTop: $("#" + viewInstance.targetMensaje).offset().top }, 1000);
        }
      },
      error: function(error){
        $("#" + viewInstance.targetMensaje).removeClass("color-success");
        $("#" + viewInstance.targetMensaje).removeClass("color-warning");
        $("#" + viewInstance.targetMensaje).addClass("color-danger");
        $("#" + viewInstance.targetMensaje).html("Error en guardar al doctor de turno");
        $("html, body").animate({ scrollTop: $("#" + viewInstance.targetMensaje).offset().top }, 1000);
        console.log(error);
      }
    });
  },
});
