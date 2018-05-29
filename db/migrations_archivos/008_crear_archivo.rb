require 'sequel'

Sequel.migration do
  up do
    create_table(:archivos) do
      primary_key :id
      String :nombre, null: false, size: 45
      String :ruta, null: false, size:40
    end

    alter_table(:archivos) do
      add_foreign_key :extension_id, :extensiones
    end
	end

  down do
    drop_column :archivos, :extension_id
    drop_table(:archivos)
	end
end
