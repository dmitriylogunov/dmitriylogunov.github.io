require 'yaml'

module Jekyll
  class SkillsMatrixGenerator < Generator
    safe true

    def generate(site)
      skills_file = File.join(site.source, '_data', 'skills.yml')
      companies_file = File.join(site.source, '_data', 'companies.yml')

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

      site.data['skills_matrix'] = matrix
    end
  end
end