var archivosRouter = Backbone.Router.extend({
  extensionViewInstance: null,
  autorViewInstance: null,
  categoriaViewInstance: null,
  libroViewInstance: null,
  libroDetalleViewInstance: null,
  videoViewInstance: null,
  videoDetalleViewInstance: null,
  initialize: function() {
  },
  routes: {
    "": "index",
    "extension": "extension",
    "autor": "autor",
    "categoria": "categoria",
    "libro": "libro",
    "libro/crear": "libroCrear",
    "libro/editar/:libro_id": "libroEditar",
    "libro/ver/:libro_id": "libroVer",
    "video": "video",
    "video/crear": "videoCrear",
    "video/editar/:video_id": "videoEditar",
    "video/ver/:video_id": "videoVer",
    "*actions" : "default",
  },
  index: function(){
    window.location.href = BASE_URL + "archivos/#/";
  },
  extension: function() {
    if(this.extensionViewInstance == null){
      this.extensionViewInstance = new ExtensionView();
    }
    this.extensionViewInstance.render();
    this.extensionViewInstance.tablaExtension.listar();
  },
  autor: function() {
    if(this.autorViewInstance == null){
      this.autorViewInstance = new AutorView();
    }
    this.autorViewInstance.render();
    this.autorViewInstance.tablaAutor.listar();
  },
  categoria: function() {
    if(this.categoriaViewInstance == null){
      this.categoriaViewInstance = new CategoriaView();
    }
    this.categoriaViewInstance.render();
    this.categoriaViewInstance.tablaCategoria.listar();
  },
  libro: function() {
    if(this.libroViewInstance == null){
      this.libroViewInstance = new LibroView();
    }
    this.libroViewInstance.render();
    this.libroViewInstance.tablaLibro.listar();
  },
  libroCrear: function() {
    $("#btnModal").click();
    if(this.libroDetalleViewInstance == null){
      this.libroDetalleViewInstance = new LibroDetalleView(dataLibroDetalle);
    }
    this.libroDetalleViewInstance.extraData = {libro_id: "E"};
    this.libroDetalleViewInstance.context.titulo_modal = "Crear Libro";
    this.libroDetalleViewInstance.render();
    //tabla de categoria libro
    this.libroDetalleViewInstance.tablaCategoriaLibro.urlListar =
      this.libroDetalleViewInstance.tablaCategoriaLibro.urlListar + "E";
    this.libroDetalleViewInstance.tablaCategoriaLibro.listar();
    this.libroDetalleViewInstance.tablaCategoriaLibro.urlListar =
      this.libroDetalleViewInstance.tablaCategoriaLibro.urlListar.slice(0, -1);
    //tabla de autor libro
    this.libroDetalleViewInstance.tablaAutorLibro.urlListar =
      this.libroDetalleViewInstance.tablaAutorLibro.urlListar + "E";
    this.libroDetalleViewInstance.tablaAutorLibro.listar();
    this.libroDetalleViewInstance.tablaAutorLibro.urlListar =
      this.libroDetalleViewInstance.tablaAutorLibro.urlListar.slice(0, -1);
  },
  libroEditar: function(libro_id) {
    $("#btnModal").click();
    if(this.libroDetalleViewInstance == null){
      this.libroDetalleViewInstance = new LibroDetalleView(dataLibroDetalle);
    }
    this.libroDetalleViewInstance.set("libro_id", libro_id);
    this.libroDetalleViewInstance.setModel();
    this.libroDetalleViewInstance.context.titulo_modal = "Editar Libro";
    this.libroDetalleViewInstance.context.BASE_URL = BASE_URL;
    this.libroDetalleViewInstance.context.libro = this.libroDetalleViewInstance.model.toJSON();
    this.libroDetalleViewInstance.render();
    //tabla de categoria libro
    this.libroDetalleViewInstance.tablaCategoriaLibro.urlListar =
      this.libroDetalleViewInstance.tablaCategoriaLibro.urlListar + libro_id;
    this.libroDetalleViewInstance.tablaCategoriaLibro.listar();
    this.libroDetalleViewInstance.tablaCategoriaLibro.urlListar =
      this.libroDetalleViewInstance.tablaCategoriaLibro.urlListar.replace(libro_id, '');
    //tabla de autor libro
    this.libroDetalleViewInstance.tablaAutorLibro.urlListar =
      this.libroDetalleViewInstance.tablaAutorLibro.urlListar + libro_id;
    this.libroDetalleViewInstance.tablaAutorLibro.listar();
    this.libroDetalleViewInstance.tablaAutorLibro.urlListar =
      this.libroDetalleViewInstance.tablaAutorLibro.urlListar.slice(0, -1);
  },
  libroVer: function(libro_id) {
    if(this.libroViewInstance == null){
      this.libroViewInstance = new LibroView();
    }
    this.libroViewInstance.tabLibro(libro_id);
    location.replace(BASE_URL + "archivos/#/libro");
  },
  video: function() {
    if(this.videoViewInstance == null){
      this.videoViewInstance = new VideoView();
    }
    this.videoViewInstance.render();
    this.videoViewInstance.tablaVideo.listar();
  },
  videoCrear: function() {
    $("#btnModal").click();
    if(this.videoDetalleViewInstance == null){
      this.videoDetalleViewInstance = new VideoDetalleView(dataVideoDetalle);
    }
    this.videoDetalleViewInstance.extraData = {video_id: "E"};
    this.videoDetalleViewInstance.context.titulo_modal = "Crear Video";
    this.videoDetalleViewInstance.render();
    //tabla de categoria video
    this.videoDetalleViewInstance.tablaCategoriaVideo.urlListar =
      this.videoDetalleViewInstance.tablaCategoriaVideo.urlListar + "E";
    this.videoDetalleViewInstance.tablaCategoriaVideo.listar();
    this.videoDetalleViewInstance.tablaCategoriaVideo.urlListar =
      this.videoDetalleViewInstance.tablaCategoriaVideo.urlListar.slice(0, -1);
    //tabla de autor video
    this.videoDetalleViewInstance.tablaAutorVideo.urlListar =
      this.videoDetalleViewInstance.tablaAutorVideo.urlListar + "E";
    this.videoDetalleViewInstance.tablaAutorVideo.listar();
    this.videoDetalleViewInstance.tablaAutorVideo.urlListar =
      this.videoDetalleViewInstance.tablaAutorVideo.urlListar.slice(0, -1);
  },
  videoEditar: function(video_id) {
    $("#btnModal").click();
    if(this.videoDetalleViewInstance == null){
      this.videoDetalleViewInstance = new VideoDetalleView(dataVideoDetalle);
    }
    this.videoDetalleViewInstance.set("video_id", video_id);
    this.videoDetalleViewInstance.setModel();
    this.videoDetalleViewInstance.context.titulo_modal = "Editar Video";
    this.videoDetalleViewInstance.context.BASE_URL = BASE_URL;
    this.videoDetalleViewInstance.context.video = this.videoDetalleViewInstance.model.toJSON();
    this.videoDetalleViewInstance.render();
    // modelo de upload
    var archivo_id = this.videoDetalleViewInstance.model.get("archivo_id");
    var nombre_video = this.videoDetalleViewInstance.model.get("video_nombre");
    var ruta_video = this.videoDetalleViewInstance.model.get("video_ruta");
    this.videoDetalleViewInstance.uploadVideo.model.set("id", archivo_id);
    this.videoDetalleViewInstance.uploadVideo.model.set("nombre", nombre_video);
    this.videoDetalleViewInstance.uploadVideo.model.set("ruta", ruta_video);
    //tabla de categoria video
    this.videoDetalleViewInstance.tablaCategoriaVideo.urlListar =
      this.videoDetalleViewInstance.tablaCategoriaVideo.urlListar + video_id;
    this.videoDetalleViewInstance.tablaCategoriaVideo.listar();
    this.videoDetalleViewInstance.tablaCategoriaVideo.urlListar =
      this.videoDetalleViewInstance.tablaCategoriaVideo.urlListar.replace(video_id, '');
    //tabla de autor video
    this.videoDetalleViewInstance.tablaAutorVideo.urlListar =
      this.videoDetalleViewInstance.tablaAutorVideo.urlListar + video_id;
    this.videoDetalleViewInstance.tablaAutorVideo.listar();
    this.videoDetalleViewInstance.tablaAutorVideo.urlListar =
      this.videoDetalleViewInstance.tablaAutorVideo.urlListar.slice(0, -1);
  },
  videoVer: function(video_id) {
    $("#btnModal").click();
    if(this.videoViewInstance == null){
      this.videoViewInstance = new VideoView();
    }
    this.videoViewInstance.mostrarVideo(video_id);
  },
  default: function() {
    //window.location.href = BASE_URL + "error/access/404";
  },
});

$(document).ready(function(){
  router = new archivosRouter();
  Backbone.history.start();
})
