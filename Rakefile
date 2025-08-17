require 'bundler/setup'

desc "Generate CV files (PDF and DOCX) from YAML data"
task :generate_cv do
  puts "Generating CV files..."
  ruby "scripts/generate_cv.rb"
end

desc "Serve Jekyll site locally"
task :serve do
  exec "bundle exec jekyll serve"
end

desc "Build Jekyll site"
task :build do
  exec "bundle exec jekyll build"
end

desc "Generate CV and build site"
task :full_build => [:generate_cv, :build]

task :default => :serve