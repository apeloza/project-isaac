class ChangeActivatedToString < ActiveRecord::Migration[6.0]
  def change
    change_column :items, :is_activated, :string
  end
end
