# dmitriylogunov.github.io

Personal portfolio site hosted on Github Pages, built using Jekyll framework

# quickstart

Install Ruby if not yet installed (instructions below)

Install Jekyll and Bundler:
`sudo gem install jekyll bundler`

Navigate to your Jekyll project directory:
`cd path/to/your/jekyll/project`

Install the dependencies:
`bundle install`

Build the site and make it available on a local server:
`bundle exec jekyll serve`

Open your web browser and go to:
`http://localhost:4000`

This will start a local server and you can view your Jekyll site at the specified URL.

# Installing Ruby on WSL2

This project requires Ruby to run Jekyll. Follow these steps to install Ruby using rbenv (recommended for version management).

## Prerequisites

Make sure you have WSL2 installed and running on your Windows machine.

## Installation Steps

### 1. Update your system

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install required dependencies

```bash
sudo apt install -y git curl libssl-dev libreadline-dev zlib1g-dev autoconf bison build-essential libyaml-dev libreadline-dev libncurses5-dev libffi-dev libgdbm-dev
```

### 3. Install rbenv

```bash
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash
```

### 4. Configure your shell

```bash
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc
```

### 5. Install Ruby

```bash
rbenv install 3.1.0
rbenv global 3.1.0
```

### 6. Verify installation

```bash
ruby -v
gem -v
```

You should see Ruby version 3.1.0 and the corresponding gem version.

### 7. Install Jekyll and Bundler

```bash
gem install jekyll bundler
```

## Running the Project

Once Ruby is installed, you can run the Jekyll project:

```bash
# Install project dependencies
bundle install

# Serve the site locally
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`.

## Troubleshooting

- If `rbenv` command is not found after installation, restart your terminal or run `source ~/.bashrc`
- If you encounter permission errors, make sure you're not using `sudo` with gem commands when using rbenv
- For other Ruby version requirements, use `rbenv install [version]` and `rbenv local [version]` in your project directory

## Generating CV Files

The project includes a CV generation system that creates PDF and DOCX files from the YAML data in `_data/work.yml` and site configuration.

### Prerequisites

The required gems (prawn and caracal) are already included in the Gemfile. Run `bundle install` if you haven't already.

### Generating CVs

There are three ways to generate CV files:

#### Method 1: Direct Ruby Script

```bash
ruby scripts/generate_cv.rb
```

#### Method 2: Using Rake (Recommended)

```bash
rake generate_cv
```

#### Method 3: Using Bundle Exec

```bash
bundle exec ruby scripts/generate_cv.rb
```

### Output Files

The generated CV files will be saved in:

- `assets/cv/dmitriy-logunov-cv.pdf` - PDF version
- `assets/cv/dmitriy-logunov-cv.docx` - Microsoft Word version

### How the CV Generation Works

The CV generation system consists of three main components:

1. **Data Sources**:

   - `_data/work.yml` - Contains work experience, education, and career milestones
   - `_config.yml` - Contains personal information (name, email, phone, location, links)

2. **Template Module** (`scripts/templates/cv_template.rb`):

   - Loads and parses YAML data from the above sources
   - Provides helper methods to access and format the data
   - Filters work experience from education entries
   - Handles data transformation for consistent output

3. **Generation Script** (`scripts/generate_cv.rb`):
   - Defines the actual CV layout and styling
   - PDF generation using Prawn (fonts, spacing, colors)
   - DOCX generation using Caracal (headings, paragraphs, links)
   - Both formats share the same content structure but with format-appropriate styling

### Customizing the CV

To customize the CV content:

1. Edit `_data/work.yml` for work experience and education
2. Edit `_config.yml` for personal information and contact details
3. Modify `scripts/templates/cv_template.rb` for data processing and filtering logic
4. Modify `scripts/generate_cv.rb` for layout, styling, and document structure

### Available Rake Tasks

```bash
rake generate_cv    # Generate CV files (PDF and DOCX)
rake serve         # Serve Jekyll site locally
rake build         # Build Jekyll site
rake full_build    # Generate CV and build site
```

## Image Optimization

### Installing ImageMagick on Ubuntu/WSL2

```bash
sudo apt update
sudo apt install imagemagick
```

### Converting Images

To convert high-resolution PNG images to optimized JPEG format for web use:

```bash
# Convert all PNG files in assets/images/projects/ to JPEG with 85% quality and max width/height of 1200px
for file in assets/images/projects/*.png; do convert "$file" -quality 85 -resize "1200x1200>" "${file%.png}.jpg"; done

# Or for a single file:
convert assets/images/projects/image.png -quality 85 -resize "1200x1200>" assets/images/projects/image.jpg
```

This command uses ImageMagick to:

- Convert PNG to JPEG format
- Set quality to 85% (good balance between quality and file size)
- Resize only if larger than 1200px (preserving aspect ratio)
- The `\>` flag ensures images smaller than 1200px are not upscaled
