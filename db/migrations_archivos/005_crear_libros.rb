require 'sequel'

Sequel.migration do
  up do
    create_table(:libros) do
      primary_key :id
      String :nombre, null: false, size: 45
      Integer :paginas, null: false
      Integer :anio, null: false
    end

    alter_table(:libros) do
      add_foreign_key :archivo_id, :archivos, null: true
    end
	end

  down do
    drop_column :libros, :archivo_id
    drop_table(:libros)
	end
end
