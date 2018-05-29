require 'sequel'

Sequel.migration do
  up do
    create_table(:videos_categorias) do
      primary_key :id
    end

    alter_table(:videos_categorias) do
      add_foreign_key :video_id, :videos
      add_foreign_key :categoria_id, :categorias
    end
	end

  down do
    drop_column :videos_categorias, :video_id
    drop_column :videos_categorias, :categoria_id
    drop_table(:videos_categorias)
	end
end
