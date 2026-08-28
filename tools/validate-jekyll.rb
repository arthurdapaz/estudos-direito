#!/usr/bin/env ruby

require "pathname"
require "set"
require "yaml"

ROOT = Pathname.new(__dir__).join("..").expand_path

def fail_with(message)
  warn "ERRO: #{message}"
  exit 1
end

def front_matter(path)
  source = path.read
  match = source.match(/\A---\n(.*?)\n---(?:\n|\z)/m)
  fail_with("#{path.relative_path_from(ROOT)} não possui front matter válido") unless match
  YAML.safe_load(match[1], aliases: true) || {}
end

data_path = ROOT.join("_data/disciplines.yml")
disciplines = YAML.safe_load(data_path.read, aliases: true)
fail_with("_data/disciplines.yml precisa conter uma lista") unless disciplines.is_a?(Array)

discipline_ids = Set.new
discipline_codes = Set.new
discipline_urls = Set.new
study_urls = Set.new
study_total = 0

disciplines.each do |discipline|
  %w[id code name url studies].each do |field|
    fail_with("disciplina sem #{field}") if discipline[field].nil?
  end

  fail_with("id de disciplina duplicado: #{discipline['id']}") unless discipline_ids.add?(discipline["id"])
  fail_with("código de disciplina duplicado: #{discipline['code']}") unless discipline_codes.add?(discipline["code"])
  fail_with("URL de disciplina duplicada: #{discipline['url']}") unless discipline_urls.add?(discipline["url"])

  discipline_page = ROOT.join(discipline["url"].sub(%r{\A/}, ""), "index.html")
  fail_with("página ausente para #{discipline['name']}") unless discipline_page.file?
  discipline_front_matter = front_matter(discipline_page)
  fail_with("layout inválido em #{discipline_page.relative_path_from(ROOT)}") unless discipline_front_matter["layout"] == "discipline"
  fail_with("discipline_id divergente em #{discipline_page.relative_path_from(ROOT)}") unless discipline_front_matter["discipline_id"] == discipline["id"]

  study_ids = Set.new
  discipline["studies"].each do |study|
    study_total += 1
    %w[id url title browser_title description].each do |field|
      fail_with("estudo de #{discipline['name']} sem #{field}") if study[field].nil?
    end

    fail_with("id de estudo duplicado em #{discipline['name']}: #{study['id']}") unless study_ids.add?(study["id"])
    fail_with("URL de estudo duplicada: #{study['url']}") unless study_urls.add?(study["url"])

    study_page = ROOT.join(study["url"].sub(%r{\A/}, ""), "index.html")
    fail_with("página ausente para #{study['title']}") unless study_page.file?
    study_front_matter = front_matter(study_page)
    fail_with("layout inválido em #{study_page.relative_path_from(ROOT)}") unless study_front_matter["layout"] == "study"
    fail_with("discipline_id divergente em #{study_page.relative_path_from(ROOT)}") unless study_front_matter["discipline_id"] == discipline["id"]
    fail_with("study_id divergente em #{study_page.relative_path_from(ROOT)}") unless study_front_matter["study_id"] == study["id"]

    style = study_front_matter["study_style"]
    fail_with("study_style ausente em #{study_page.relative_path_from(ROOT)}") if style.nil?
    style_path = ROOT.join(style.sub(%r{\A/}, ""))
    fail_with("CSS ausente para #{study['title']}: #{style}") unless style_path.file?
  end
end

home_front_matter = front_matter(ROOT.join("index.html"))
fail_with("index.html precisa usar layout home") unless home_front_matter["layout"] == "home"
fail_with(".nojekyll desativa o build Jekyll") if ROOT.join(".nojekyll").exist?

puts "Estrutura Jekyll válida: #{disciplines.size} disciplinas e #{study_total} estudos."
