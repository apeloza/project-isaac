json.time_taken @items.took
json.result_count @items.total_count

json.items do |items_json|
  items_json.array! @items do |item|
    json.name item.name
    json.tagline item.tagline
    json.description item.description
    json.is_activated item.is_activated
    json.recharge item.recharge
    json.image_filename image_path('items/' + item.image_filename)
  end
end