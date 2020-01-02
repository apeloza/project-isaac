require 'nokogiri'
require 'open-uri'
require 'fileutils'

URLS = {
  ITEMS_LIST: "https://bindingofisaacrebirth.gamepedia.com/Items",
  ITEM_PAGE_TEMPLATE: "https://bindingofisaacrebirth.gamepedia.com/ITEM",
  ITEM_PAGE_VALUES_TEMPLATE: "https://bindingofisaacrebirth.gamepedia.com/index.php?title=ITEM&action=pagevalues"
}

SCRAPE_IMAGES = true
SCRAPE_KEYS = %w(name override_name quote description is_activated recharge description dlc)

def process_item_list(document, css_selector)
  document.css(css_selector)[0].parent.next_element.next_element.css('tr').map do |row|
    next unless row.name == 'tr'

    row_data = row.css('td')
    if row_data.length > 0
      item_name = row_data[0].css('a')[0].text
      wiki_name = row_data[0].css('a')[0].attributes['href'].value.gsub(/^\//, '')
      slug = item_name_to_slug(item_name)
      game_id = row_data[1].text.gsub(/\W/, '').to_i
      item_description = row_data[4].text

      [ 
        slug,
        {
          game_id: game_id,
          item_name: item_name,
          item_description: item_description,
          slug: slug,
          wiki_name: wiki_name,
        }
      ]
    else
      nil
    end
  end.reject(&:nil?).to_h.with_indifferent_access
end

def item_name_to_slug(item_name)
  case item_name
  when 'PJs'
    'pjs'
  when "???'s Only Friend"
    'only_friend'
  when '<3'
    'less_than_three'
  else
    item_name.titleize.gsub(/\W/, '').underscore
  end
end

def create_image_directory
  directory_path = Rails.root.join('app', 'assets', 'images', 'items')
  Dir.mkdir(directory_path) unless File.directory?(directory_path)
end

def scrape_image(source_url, item_name, file_name)
  begin
    if SCRAPE_IMAGES
      directory_path = Rails.root.join('app', 'assets', 'images', 'items', item_name)
      Dir.mkdir(directory_path) unless File.directory?(directory_path)
      IO.copy_stream(open(source_url), directory_path + file_name)
    end
  end

  "#{item_name}/#{file_name}"
rescue
  nil
end

def process_page_values(document, item_name)
  processed_item = {}.with_indifferent_access
  last_key = nil

  document.css('table.mw-page-info td').each_with_index do |cell, i|
    if i % 2 == 0
      # it's even, so it's a key
      last_key = cell.text
    else
      # it's odd, so it's a value
      case last_key
      when 'image'
        if cell.css('img.thumbimage')[0]
          external_image_url = cell.css('img.thumbimage')[0].attributes['src'].value
          processed_item['images'] = { icon: scrape_image(external_image_url, item_name, 'icon.png') }
        else
          processed_item['images'] = {}
        end
      when '_categories'
        processed_item['categories'] = cell.text.split(' • ')
      when *SCRAPE_KEYS
        processed_item[last_key] = cell.text
      end
    end
  end

  processed_item
end

def process_extra_images(document, item_name, original_image_hash)
  image_hash = {}
  character_appearance = document.css("img[alt='Character appearance']")[0]
  tear_appearance = document.css("img[alt='Tear appearance']")[0]
  extra_icons = document.css("img[alt='Item icon']")

  if character_appearance
    image_hash[:character] = scrape_image(
      document.css("img[alt='Character appearance']")[0].attributes['src'].value,
      item_name,
      'character.png'
    )
  end

  if tear_appearance
    image_hash[:tear] = scrape_image(
      document.css("img[alt='Tear appearance']")[0].attributes['src'].value,
      item_name,
      'tear.png'
    )
  end

  unless original_image_hash[:icon].present?
    # try getting icon if it wasn't in page values
    image_hash[:icon] = scrape_image(
      extra_icons[0].attributes['src'].value,
      item_name,
      'icon.png'
    )
  end

  # # optional: if you want to get all extra icons
  # extra_icons.each_with_index do |icon, i|
  #   image_hash["extra_icon_#{i+1}"] = scrape_image(
  #     icon.attributes['src'].value,
  #     item_name,
  #     "extra_icon_#{i+1}.png"
  #   )
  # end

  image_hash
end

def process_related_items(document, css_selector)
  header = document.css(css_selector)[0]
  if header
    header.parent.next_element.children
      .select { |el| el.name == "li" }
      .map { |el| process_related_item(el) }
  else
    []
  end
end

def process_related_item(child)
  processed_item = {}

  # Get item names
  processed_item[:item_names] = child.css('a').map(&:text).reject(&:blank?)

  # Get description
  child.children.each do |sub_child|
    if sub_child.name == 'text'
      processed_item[:description] = sub_child.text.gsub(/^:\s/, '').strip
    end
  end

  # Get any sub-children
  if child.css('ul').length > 0
    processed_item[:children] = child.css('ul').css('li').map { |sub_child| process_related_item(sub_child) }
  end

  processed_item
end

def scrape_item(item)
  page_doc = Nokogiri::HTML(open(URLS[:ITEM_PAGE_TEMPLATE].gsub('ITEM', item[:wiki_name])))
  page_values_doc = Nokogiri::HTML(open(URLS[:ITEM_PAGE_VALUES_TEMPLATE].gsub('ITEM', item[:wiki_name])))

  data = process_page_values(page_values_doc, item[:slug])
  data['images'] = data['images'].merge(process_extra_images(page_doc, item[:slug], data['images']))
  data['interactions'] = process_related_items(page_doc, "#Interactions")
  data['synergies'] = process_related_items(page_doc, "#Synergies")

  puts "Got: #{item[:item_name]}"
  data
end

def scrape_data
  puts 'Scraping data ...'
  puts 'Getting item master list'
  item_list_doc = Nokogiri::HTML(open(URLS[:ITEMS_LIST]))
  data = process_item_list(item_list_doc, '#Activated_Collectibles')
         .merge(process_item_list(item_list_doc, '#Passive_Collectibles'))
  puts 'Got item master list'
  create_image_directory
  puts 'Getting items ...'
  data = data.map { |k, item| item.merge(data: scrape_item(item)) }
  puts 'Finished scraping data!'
  data
end

def seed_data
  data = scrape_data

  data.each do |item_data|
    # TODO: Do something with item_data ;)
    Item.create_with(
      is_activated: item_data[:data][:is_activated],
      recharge: item_data[:data][:recharge],
      name: item_data[:item_name],
      tagline: item_data[:data][:quote],
      description: item_data[:data][:description],
      image_filename: item_data[:data][:images][:icon],
      character_filename: item_data[:data][:images][:character],
      tear_filename: item_data[:data][:images][:tear]
    ).find_or_create_by(
      slug: item_data[:slug]
    )
  end

  # SAMPLE DATA OBJECT
  # {
  #   game_id: 118,
  #   item_name: "Brimstone",
  #   item_description: "...\n",
  #   slug: "brimstone",
  #   wiki_name: "Brimstone",
  #   data: {
  #     categories: ["Collectibles", "Special_Items"],
  #     name: "Brimstone",
  #     override_name: "Brimstone",
  #     dlc: "a+",
  #     images: {
  #       icon: "brimstone/icon.png",
  #       character: "brimstone/character.png",
  #       tear: "brimstone/tear.png"
  #     },
  #     quote: "Blood laser barrage",
  #     is_activated: "No",
  #     recharge: "...",
  #     description: "...",
  #     interactions: [
  #       {
  #         item_names: ["20/20"],
  #         description: "Overridden by Brimstone.",
  #         children: [
  #           {
  #             item_names: [],
  #             description: "Shoots two Brimstone lasers simultaneously without increasing charge time."
  #           }
  #         ]
  #       }
  #     ],
  #     synergies: [
  #       {
  #         item_names: ["Apple!", "Euthanasia", "Tough Love"],
  #         description: ..."
  #       }
  #     ]
  #   }
  # }
end

seed_data
