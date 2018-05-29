require 'sequel'

Sequel.migration do
  up do
    create_table(:videos) do
      primary_key :id
      String :nombre, null: false, size: 45
      Time :duracion, null: true
      String :ruta, null: false, size:40
    end

    alter_table(:videos) do
      add_foreign_key :archivo_id, :archivos
    end
	end

  down do
    drop_column :videos, :archivo_id
    drop_table(:videos)
	end
end
