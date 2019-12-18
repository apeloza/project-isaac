# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

9.times do |i|
    Item.create(
      name: "Test Item #{i + 1}",
      tagline: "A beautiful test item!",
      description: "This would be a big block of text that describes what the item does so the player can understand it in layman's terms. Might include stat changes and the like here too."
    )
  end
