class Build < ApplicationRecord
  belongs_to :user
  serialize :item_ids, Array

  def items
    Item.where(id: item_ids)
  end
  
end
