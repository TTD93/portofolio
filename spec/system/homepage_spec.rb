require "rails_helper"

RSpec.describe "Homepage", type: :system do
  before { visit root_path }

  it "shows the sidebar name" do
    expect(page).to have_content("Tin Trung Duong")
  end

  it "shows all five sidebar nav links" do
    within("#deskNav") do
      expect(page).to have_link("about")
      expect(page).to have_link("experience")
      expect(page).to have_link("products")
      expect(page).to have_link("stack")
      expect(page).to have_link("contact")
    end
  end

  it "shows the terminal hero section" do
    expect(page).to have_css(".term")
    expect(page).to have_css(".term-bar")
  end

  it "shows project cards" do
    expect(page).to have_css(".card", minimum: 4)
  end

  it "shows the tech stack grid" do
    expect(page).to have_css(".stackgrid")
    expect(page).to have_content("Ruby")
    expect(page).to have_content("TypeScript")
  end

  it "shows the contact section with email link" do
    expect(page).to have_link("tin@costtracker.no")
  end

  it "shows the available-for-work status dot" do
    expect(page).to have_css(".dot")
    expect(page).to have_content("available for work")
  end
end
