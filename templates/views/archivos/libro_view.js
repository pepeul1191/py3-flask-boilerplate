var LibroView = Backbone.View.extend({
	el: '#workspace',
	initialize: function(){
		//this.render();
		//console.log("initialize");
		this.events = this.events || {};
		this.tablaLibro = new TableView(dataTablaLibro);
	},
	events: {
		// se está usando asignacion dinamica de eventos en el constructor
    //eventos tabla de departamentos
    "click #tablaLibro > tfoot > tr > td > button.agregar-fila": "agregarFilaLibro",
		"click #tablaLibro > tfoot > tr > td > button.guardar-tabla": "guardarTablaLibro",
		"keyup #tablaLibro > tbody > tr > td > input.text": "inputTextEscribirLibro",
		"click #tablaLibro > tbody > tr > td > i.quitar-fila": "quitarFilaLibro",
	},
	render: function() {
		this.$el.html(this.getTemplate());
		return this;
	},
	getTemplate: function() {
		var data = { };
		var template_compiled = null;
		$.ajax({
		   url: STATICS_URL + 'templates/archivos/libro.html',
		   type: "GET",
		   async: false,
		   success: function(source) {
		   	var template = Handlebars.compile(source);
		   	template_compiled = template(data);
		   }
		});
		return template_compiled;
	},
	tabLibro:function(libro_id){
		var url = null;
		$.ajax({
			url: BASE_URL + 'archivos/libro/ruta/' +  libro_id,
			type: "GET",
			async: false,
			success: function(ruta) {
				url = ruta;
			},
      error: function(error) {
        console.log(error);
				$("#mensajeRptaLibro").removeClass("color-success");
        $("#mensajeRptaLibro").removeClass("color-warning");
        $("#mensajeRptaLibro").addClass("color-danger");
        $("#mensajeRptaLibro").html("Error en mostrar el libro en una nueva pestaña del navegador");
      }
		});
		console.log(url);
		window.open(url, '_blank');
	},
	mostrarTabla: function(){
		this.tabla.listar();
	},
  //evnetos tabla de departamentos
  inputTextEscribirLibro: function(event){
    this.tablaLibro.inputTextEscribir(event);
  },
  quitarFilaLibro: function(event){
    this.tablaLibro.quitarFila(event);
  },
  guardarTablaLibro: function(event){
    this.tablaLibro.guardarTabla(event);
  },
  agregarFilaLibro: function(event){
    this.tablaLibro.agregarFila(event);
  },
  paginacionIrPrimero: function(){
    this.tablaLibro.paginacionIrPrimero();
  },
  paginacionIrAnteior: function(){
    this.tablaLibro.paginacionIrAnteior();
  },
  paginacionIrSiguiente: function(){
    this.tablaLibro.paginacionIrSiguiente();
  },
  paginacionIrUltimo: function(){
    this.tablaLibro.paginacionIrUltimo();
  },
});
