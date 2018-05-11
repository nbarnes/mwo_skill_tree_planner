require 'fileutils'

new_file = File.open("tree_source.js.new", 'w')
source_file = File.new("src/tree_source.js")

label = ""
source_file.each do |line|
  if line.downcase =~ /name:/
    label = (line.match(/.*\"(.*)\".*/))[1]
    puts label
  end
  if line.downcase =~ /attribute/
    new_file << "        label: \"#{label.slice(0...-2)}\",\n"
  end
  new_file << line
end
new_file.close
source_file.close
