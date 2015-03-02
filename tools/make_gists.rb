#!/usr/bin/env ruby

require 'gist'
require 'json'

GISTS = ARGV[0]

gists = JSON.parse(File.open(GISTS,'r').read)

requires = File.open("assets/requires.js").read

gists.each do |filename, gist_url|
  if File.exists?(filename)
    basename = File.basename(filename)
    puts basename
    file = File.open(filename,'r').read
    file.gsub!(/\/data\/(.*\.[json|csv|tsv|xml]+)/) {|s| "http://vallandingham.me/js_data/data/" + $1}

    gist_text = requires + "\n\n" + file

    Gist.gist(gist_text, {:filename => basename,:update => gist_url})

  else
    puts "ERROR: cannot find: #{filename}"
  end
end
