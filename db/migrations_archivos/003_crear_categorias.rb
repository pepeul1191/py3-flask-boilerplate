require 'sequel'

Sequel.migration do
  up do
    create_table(:categorias) do
      primary_key :id
      String :nombre, null: false, size: 25
    end
	end

  down do
    drop_table(:categorias)
	end
end
