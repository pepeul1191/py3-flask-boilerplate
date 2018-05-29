var LibroDetalleView = ModalView.extend({
  initialize: function(options){
    this.targetMensaje = options["targetMensaje"];
    // herencia de atributos, móetodos y eventos
    ModalView.prototype.initialize.apply(this, [options])
    this.inheritEvents(ModalView);
    // delegación de eventos
    this.delegateEvents();
    this.uploadLibro = new UploadView(dataLibroUpload);
    this.tablaCategoriaLibro = new TableView(dataLibroCategoria);
    this.tablaAutorLibro = new TableView(dataLibroAutor);
    this.model = new Libro();
  },
  events: {
    // se está usando asignacion dinamica de eventos en el constructor
    "change #cbmTipoSede": "refrescarSedes",
    "click #btnGuardarDetalleDoctor": "guardarDoctor",
    "click #buscarLibro": "buscarLibro",
    "click #subirLibro" : "subirLibro",
    "click #btnGuardarDetalleLibroArchivo": "guardarDetalleLibroArchivo",
    "click #btnGuardarDetalleLibro": "guardarDetalleLibro",
    "click #tablaCategoriaLibro > tfoot > tr > td > button.agregar-fila": "agregarFilaCategoria",
    "click #tablaCategoriaLibro > tfoot > tr > td > button.guardar-tabla": "guardarTablaCategoria",
    "click #tablaCategoriaLibro > tbody > tr > td > i.quitar-fila": "quitarFilaTablaCategoria",
    "click #tablaAutorLibro > tfoot > tr > td > button.agregar-fila": "agregarFilaAutor",
    "click #tablaAutorLibro > tfoot > tr > td > button.guardar-tabla": "guardarTablaAutor",
    "click #tablaAutorLibro > tbody > tr > td > i.quitar-fila": "quitarFilaTablaAutor",
  },
  agregarFilaCategoria: function(event){
    this.tablaCategoriaLibro.agregarFila(event);
  },
  guardarTablaCategoria: function(event){
    this.tablaCategoriaLibro.extraData = {libro_id: this.model.get("id")};
    this.tablaCategoriaLibro.guardarTabla(event);
  },
  quitarFilaTablaCategoria: function(event){
    this.tablaCategoriaLibro.quitarFila(event);
  },
  agregarFilaAutor: function(event){
    this.tablaAutorLibro.agregarFila(event);
  },
  guardarTablaAutor: function(event){
    this.tablaAutorLibro.extraData = {libro_id: this.model.get("id")};
    this.tablaAutorLibro.guardarTabla(event);
  },
  quitarFilaTablaAutor: function(event){
    this.tablaAutorLibro.quitarFila(event);
  },
  buscarLibro: function(){
    this.uploadLibro.triggerInputFile();
  },
  subirLibro: function(){
    this.uploadLibro.subirFile();
  },
  setModel: function(){
    var viewInstance = this;
    $.ajax({
      type: "GET",
      url: BASE_URL + "archivos/libro/obtener/" + viewInstance.get("libro_id"),
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
        $("#" + viewInstance.targetMensaje).html("Error en obtener el libro a editar");
        $("html, body").animate({ scrollTop: $("#" + viewInstance.targetMensaje).offset().top }, 1000);
        console.log(error);
      }
    });
  },
  guardarDetalleLibro: function(){
    var viewInstance = this;
    this.model.set("nombre", $("#txtNombre").val());
    this.model.set("anio", $("#txtAnio").val());
    this.model.set("paginas", $("#txtPaginas").val());
    $.ajax({
      type: "POST",
      url: BASE_URL + "archivos/libro/guardar_detalle",
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
  guardarDetalleLibroArchivo: function(){
    var viewInstance = this;
    this.model.set("archivo_id", this.uploadLibro.model.id);
    $.ajax({
      type: "POST",
      url: BASE_URL + "archivos/libro/guardar_archivo",
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
