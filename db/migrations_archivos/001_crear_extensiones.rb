require 'sequel'

Sequel.migration do
  up do
    create_table(:extensiones) do
      primary_key :id
      String :nombre, null: false, size: 10
      String :mime, null: false, size: 30
    end
	end

  down do
    drop_table(:extensiones)
	end
end
