json.email current_user.try(:email)
json.id current_user.try(:id)
json.currentBuild current_user.builds.first.try :items do |item|
  json.item_id item.id
  json.name item.name
  json.tagline item.tagline
  json.description item.description
  json.is_activated item.is_activated
  json.recharge item.recharge
  json.image_filename image_path('items/' + item.image_filename)
end