require 'sequel'

Sequel.migration do
  up do
    create_table(:videos_autores) do
      primary_key :id
    end

    alter_table(:videos_autores) do
      add_foreign_key :video_id, :videos
      add_foreign_key :autor_id, :autores
    end
	end

  down do
    drop_column :videos_autores, :video_id
    drop_column :videos_autores, :autor_id
    drop_table(:videos_autores)
	end
end
