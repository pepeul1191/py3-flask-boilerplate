//var tablaExtension = new TableView(dataTablaExtension);

var ExtensionView = Backbone.View.extend({
	el: '#workspace',
	initialize: function(){
		//this.render();
		//console.log("initialize");
		this.events = this.events || {};
		this.tablaExtension = new TableView(dataTablaExtension);
	},
	events: {
		// se está usando asignacion dinamica de eventos en el constructor
    //eventos tabla de departamentos
    "click #tablaExtension > tfoot > tr > td > button.agregar-fila": "agregarFilaExtension",
		"click #tablaExtension > tfoot > tr > td > button.guardar-tabla": "guardarTablaExtension",
		"keyup #tablaExtension > tbody > tr > td > input.text": "inputTextEscribirExtension",
		"click #tablaExtension > tbody > tr > td > i.quitar-fila": "quitarFilaExtension",
    "click #tablaExtension > tfoot > tr > td > span > .fa-fast-backward": "paginacionIrPrimero",
    "click #tablaExtension > tfoot > tr > td > span > .fa-backward": "paginacionIrAnteior",
    "click #tablaExtension > tfoot > tr > td > span > .fa-forward": "paginacionIrSiguiente",
    "click #tablaExtension > tfoot > tr > td > span > .fa-fast-forward": "paginacionIrUltimo",
	},
	render: function() {
		this.$el.html(this.getTemplate());
		return this;
	},
	getTemplate: function() {
		var data = { };
		var template_compiled = null;
		$.ajax({
		   url: STATICS_URL + 'templates/archivos/extension.html',
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
  inputTextEscribirExtension: function(event){
    this.tablaExtension.inputTextEscribir(event);
  },
  quitarFilaExtension: function(event){
    this.tablaExtension.quitarFila(event);
  },
  guardarTablaExtension: function(event){
    this.tablaExtension.guardarTabla(event);
  },
  agregarFilaExtension: function(event){
    this.tablaExtension.agregarFila(event);
  },
  paginacionIrPrimero: function(){
    this.tablaExtension.paginacionIrPrimero();
  },
  paginacionIrAnteior: function(){
    this.tablaExtension.paginacionIrAnteior();
  },
  paginacionIrSiguiente: function(){
    this.tablaExtension.paginacionIrSiguiente();
  },
  paginacionIrUltimo: function(){
    this.tablaExtension.paginacionIrUltimo();
  },
});
