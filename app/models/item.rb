class Item < ApplicationRecord
  searchkick word_start: [:name]

  def search_data
    {
      name: name,
      tagline: tagline,
      description: description
    }
  end
end
