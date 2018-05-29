require 'sequel'

Sequel.migration do
  up do
    create_table(:libros_categorias) do
      primary_key :id
    end

    alter_table(:libros_categorias) do
      add_foreign_key :libro_id, :libros
      add_foreign_key :categoria_id, :categorias
    end
	end

  down do
    drop_column :libros_categorias, :libro_id
    drop_column :libros_categorias, :categoria_id
    drop_table(:libros_categorias)
	end
end
