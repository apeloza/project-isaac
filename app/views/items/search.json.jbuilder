json.array! @items do |item|
    json.name item.name
    json.tagline item.tagline
    json.description item.description
    json.is_activated item.is_activated
    json.recharge item.recharge
    json.image_filename image_path('items/' + item.image_filename)
end