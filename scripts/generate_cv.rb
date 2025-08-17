#!/usr/bin/env ruby

require 'bundler/setup'
require 'prawn'
require 'caracal'
require_relative 'templates/cv_template'

class CVGenerator
  def initialize
    CVTemplate.load_data
    @output_dir = File.join(CVTemplate.root_dir, 'assets', 'cv')
    FileUtils.mkdir_p(@output_dir)
  end

  def generate_pdf
    pdf_path = File.join(@output_dir, 'dmitriy-logunov-cv.pdf')
    
    Prawn::Document.generate(pdf_path, page_size: 'A4', margin: 50) do |pdf|
      # Header
      pdf.font_size 24
      pdf.text CVTemplate.name, style: :bold
      
      pdf.move_down 10
      pdf.font_size 10
      pdf.text CVTemplate.email
      pdf.text CVTemplate.phone
      pdf.text CVTemplate.location
      
      # Links
      pdf.move_down 5
      pdf.text "LinkedIn: #{CVTemplate.linkedin}", color: '0066CC'
      pdf.text "GitHub: #{CVTemplate.github}", color: '0066CC'
      pdf.text "Website: #{CVTemplate.website}", color: '0066CC'
      
      # Summary
      pdf.move_down 20
      pdf.font_size 14
      pdf.text "Professional Summary", style: :bold
      pdf.move_down 5
      pdf.font_size 10
      pdf.text CVTemplate.summary
      
      # Work Experience
      pdf.move_down 20
      pdf.font_size 14
      pdf.text "Work Experience", style: :bold
      pdf.move_down 10
      
      CVTemplate.work_experience.each do |job|
        pdf.font_size 12
        pdf.text "#{job['title']} (#{CVTemplate.format_date(job['date'])})", style: :bold
        
        if job['technologies']
          pdf.font_size 9
          pdf.text "Technologies: #{job['technologies']}", color: '666666'
        end
        
        pdf.font_size 10
        pdf.move_down 5
        pdf.text job['description']
        pdf.move_down 15
      end
      
      # Education
      pdf.move_down 10
      pdf.font_size 14
      pdf.text "Education", style: :bold
      pdf.move_down 10
      
      CVTemplate.education.each do |edu|
        pdf.font_size 12
        pdf.text "#{edu['title']} (#{CVTemplate.format_date(edu['date'])})", style: :bold
        
        pdf.font_size 10
        pdf.move_down 5
        pdf.text edu['description']
        
        if edu['technologies']
          pdf.font_size 9
          pdf.text "Coursework: #{edu['technologies']}", color: '666666'
        end
        pdf.move_down 15
      end
    end
    
    puts "PDF generated: #{pdf_path}"
  end

  def generate_docx
    docx_path = File.join(@output_dir, 'dmitriy-logunov-cv.docx')
    
    Caracal::Document.save(docx_path) do |docx|
      # Header
      docx.h1 CVTemplate.name
      
      # Contact Information
      docx.p do
        text CVTemplate.email
        br
        text CVTemplate.phone
        br
        text CVTemplate.location
      end
      
      # Links
      docx.p do
        text "LinkedIn: "
        link CVTemplate.linkedin, CVTemplate.linkedin
        br
        text "GitHub: "
        link CVTemplate.github, CVTemplate.github
        br
        text "Website: "
        link CVTemplate.website, CVTemplate.website
      end
      
      # Summary
      docx.h2 "Professional Summary"
      docx.p CVTemplate.summary
      
      # Work Experience
      docx.h2 "Work Experience"
      
      CVTemplate.work_experience.each do |job|
        docx.h3 "#{job['title']} (#{CVTemplate.format_date(job['date'])})"
        
        if job['technologies']
          docx.p do
            italic "Technologies: #{job['technologies']}"
          end
        end
        
        docx.p job['description']
      end
      
      # Education
      docx.h2 "Education"
      
      CVTemplate.education.each do |edu|
        docx.h3 "#{edu['title']} (#{CVTemplate.format_date(edu['date'])})"
        
        docx.p edu['description']
        
        if edu['technologies']
          docx.p do
            italic "Coursework: #{edu['technologies']}"
          end
        end
      end
    end
    
    puts "DOCX generated: #{docx_path}"
  end

  def generate_all
    generate_pdf
    generate_docx
  end
end

# Run the generator
if __FILE__ == $0
  generator = CVGenerator.new
  generator.generate_all
  puts "\nCV files generated successfully!"
  puts "Files saved in: assets/cv/"
end