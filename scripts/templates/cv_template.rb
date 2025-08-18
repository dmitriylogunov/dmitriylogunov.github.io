require 'yaml'

module CVTemplate
  class << self
    def load_data
      @config = YAML.load_file(File.join(root_dir, '_config.yml'))
      @work_data = YAML.load_file(File.join(root_dir, '_data', 'work.yml'))
    end

    def root_dir
      File.expand_path('../..', __dir__)
    end

    def name
      @config['name']
    end

    def email
      @config['email']
    end

    def phone
      @config['contacts'][0]
    end

    def location
      "#{@config['contacts'][1]}, #{@config['contacts'][2]}"
    end

    def linkedin
      @config['linkedin']
    end

    def github
      @config['github']
    end

    def website
      @config['url']
    end

    def work_experience
      @work_data.reject { |item| item['type'] == 'education' || item['date'].to_s.match?(/move/i) }
    end

    def education
      @work_data.select { |item| item['title'].match?(/university/i) }
    end

    def format_date(date)
      date.to_s
    end

    def format_technologies(tech)
      tech.to_s.empty? ? nil : tech
    end

    def summary
      "Experienced software developer with expertise in web technologies and a proven track record of delivering high-quality solutions. #{@config['contacts'][3]}"
    end
  end
end