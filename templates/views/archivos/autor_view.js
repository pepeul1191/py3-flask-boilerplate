//var tablaAutor = new TableView(dataTablaAutor);

var AutorView = Backbone.View.extend({
	el: '#workspace',
	initialize: function(){
		//this.render();
		//console.log("initialize");
		this.events = this.events || {};
    this.tablaAutor =  new TableView(dataTablaAutor);
	},
	events: {
		// se está usando asignacion dinamica de eventos en el constructor
    //eventos tabla de departamentos
    "click #tablaAutor > tfoot > tr > td > button.agregar-fila": "agregarFilaAutor",
		"click #tablaAutor > tfoot > tr > td > button.guardar-tabla": "guardarTablaAutor",
		"keyup #tablaAutor > tbody > tr > td > input.text": "inputTextEscribirAutor",
		"click #tablaAutor > tbody > tr > td > i.quitar-fila": "quitarFilaAutor",
    "click #tablaAutor > tfoot > tr > td > span > .fa-fast-backward": "paginacionIrPrimero",
    "click #tablaAutor > tfoot > tr > td > span > .fa-backward": "paginacionIrAnteior",
    "click #tablaAutor > tfoot > tr > td > span > .fa-forward": "paginacionIrSiguiente",
    "click #tablaAutor > tfoot > tr > td > span > .fa-fast-forward": "paginacionIrUltimo",
	},
	render: function() {
		this.$el.html(this.getTemplate());
	},
	getTemplate: function() {
		var data = { };
		var template_compiled = null;
		$.ajax({
		   url: STATICS_URL + 'templates/archivos/autor.html',
		   type: "GET",
		   async: false,
		   success: function(source) {
		   	var template = Handlebars.compile(source);
		   	template_compiled = template(data);
		   }
		});
		return template_compiled;
	},
	mostrarTabla: function(){
		this.tabla.listar();
	},
  //evnetos tabla de departamentos
  inputTextEscribirAutor: function(event){
    this.tablaAutor.inputTextEscribir(event);
  },
  quitarFilaAutor: function(event){
    this.tablaAutor.quitarFila(event);
  },
  guardarTablaAutor: function(event){
    this.tablaAutor.guardarTabla(event);
  },
  agregarFilaAutor: function(event){
    this.tablaAutor.agregarFila(event);
  },
  paginacionIrPrimero: function(){
    this.tablaAutor.paginacionIrPrimero();
  },
  paginacionIrAnteior: function(){
    this.tablaAutor.paginacionIrAnteior();
  },
  paginacionIrSiguiente: function(){
    this.tablaAutor.paginacionIrSiguiente();
  },
  paginacionIrUltimo: function(){
    this.tablaAutor.paginacionIrUltimo();
  },
});
