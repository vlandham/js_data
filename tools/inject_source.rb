#!/usr/bin/env ruby

input_dir = ARGV[0]
src_dir = ARGV[1]

def get_base file
  File.basename(file, File.extname(file))
end

html_files = Dir.glob(File.join(input_dir, "*.html"))
html_hash = html_files.map {|hf| get_base(hf) }.zip(html_files).to_h
js_files = Dir.glob(File.join(src_dir, "*.js"))
js_hash = js_files.map {|jf| get_base(jf) }.zip(js_files).to_h

puts js_hash.inspect

html_files.each do |html_file|
  html_base = get_base(html_file)
  js_file = js_hash[html_base]
  if js_file
    # read in file as string
    html = File.open(html_file,'r').read
    # inject src
    source_string = "<script src='#{js_file}'></script>"
    search_string = "</body>"
    html.gsub!(search_string, source_string + "\n" + search_string)
    # write out file
    File.open(html_file,'w') do |file|
      file.puts html
    end
  end
end

