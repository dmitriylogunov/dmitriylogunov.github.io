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
