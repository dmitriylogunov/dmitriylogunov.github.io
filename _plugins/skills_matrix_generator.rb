require 'yaml'

module Jekyll
  class SkillsMatrixGenerator < Generator
    def generate(site)
      skills_file = File.join(site.source, '_data', 'skills.yml')
      companies_file = File.join(site.source, '_data', 'companies.yml')
      matrix_file = File.join(site.source, '_data', 'matrix.yml')

      skills = YAML.load_file(skills_file)
      companies = YAML.load_file(companies_file)
      
      company_names = companies.map { |company| company['name'] }
      company_technologies = companies.map { |company| [company['name'], company['technologies']] }.to_h

      skills_sorted = skills.sort_by { |skill| -skill['rating'] }

      matrix = [[''] + company_names]
      skills_sorted.each do |skill|
        row = [skill['name'], skill['rating'], skill['years']]
        company_names.each do |company|
          if company_technologies[company].include?(skill['name'])
            row << '[x]'
          else
            row << '[ ]'
          end
        end
        matrix << row
      end

# Writing to YML, instead of setting the site data, for compatibility with GitHub Pages
      File.open(matrix_file, 'w') { |file| file.write(matrix.to_yaml) }
    end
  end
end