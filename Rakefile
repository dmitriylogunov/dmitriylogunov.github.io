require 'bundler/setup'

desc "Serve Jekyll site locally"
task :serve do
  exec "bundle exec jekyll serve"
end

desc "Build Jekyll site"
task :build do
  exec "bundle exec jekyll build"
end

task :default => :serve