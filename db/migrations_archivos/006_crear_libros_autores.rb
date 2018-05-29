require 'sequel'

Sequel.migration do
  up do
    create_table(:libros_autores) do
      primary_key :id
    end

    alter_table(:libros_autores) do
      add_foreign_key :libro_id, :libros
      add_foreign_key :autor_id, :autores
    end
	end

  down do
    drop_column :libros_autores, :libro_id
    drop_column :libros_autores, :autor_id
    drop_table(:libros_autores)
	end
end
