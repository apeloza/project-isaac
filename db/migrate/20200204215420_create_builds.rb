class CreateBuilds < ActiveRecord::Migration[6.0]
  def change
    create_table :builds do |t|
      t.references :user, null: false, foreign_key: true
      t.text :item_ids

      t.timestamps
    end
  end
end
