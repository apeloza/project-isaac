class AddFieldsToItems < ActiveRecord::Migration[6.0]
  def change
    add_column :items, :slug, :string
    add_column :items, :is_activated, :boolean
    add_column :items, :recharge, :string
    add_column :items, :character_filename, :string
    add_column :items, :tear_filename, :string
  end
end
