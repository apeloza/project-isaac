json.array! @items do |item|
    json.name item.name
    json.tagline item.tagline
    json.description item.description
    json.image_filename image_path('items/' + item.image_filename)
end
