var CategoriaView = Backbone.View.extend({
	el: '#workspace',
	initialize: function(){
		//this.render();
		//console.log("initialize");
		this.events = this.events || {};
		this.tablaCategoria = new TableView(dataTablaCategoria);
	},
	events: {
		// se está usando asignacion dinamica de eventos en el constructor
    //eventos tabla de departamentos
    "click #tablaCategoria > tfoot > tr > td > button.agregar-fila": "agregarFilaCategoria",
		"click #tablaCategoria > tfoot > tr > td > button.guardar-tabla": "guardarTablaCategoria",
		"keyup #tablaCategoria > tbody > tr > td > input.text": "inputTextEscribirCategoria",
		"click #tablaCategoria > tbody > tr > td > i.quitar-fila": "quitarFilaCategoria",
	},
	render: function() {
		this.$el.html(this.getTemplate());
		return this;
	},
	getTemplate: function() {
		var data = { };
		var template_compiled = null;
		$.ajax({
		   url: STATICS_URL + 'templates/archivos/categoria.html',
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
  inputTextEscribirCategoria: function(event){
    this.tablaCategoria.inputTextEscribir(event);
  },
  quitarFilaCategoria: function(event){
    this.tablaCategoria.quitarFila(event);
  },
  guardarTablaCategoria: function(event){
    this.tablaCategoria.guardarTabla(event);
  },
  agregarFilaCategoria: function(event){
    this.tablaCategoria.agregarFila(event);
  },
  paginacionIrPrimero: function(){
    this.tablaCategoria.paginacionIrPrimero();
  },
  paginacionIrAnteior: function(){
    this.tablaCategoria.paginacionIrAnteior();
  },
  paginacionIrSiguiente: function(){
    this.tablaCategoria.paginacionIrSiguiente();
  },
  paginacionIrUltimo: function(){
    this.tablaCategoria.paginacionIrUltimo();
  },
});
