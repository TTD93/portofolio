Given("I am on the portfolio homepage") do
  visit root_path
end

Then("I should see {string}") do |text|
  expect(page).to have_content(text)
end

Then("I should see the sidebar link {string}") do |text|
  within("#deskNav") do
    expect(page).to have_content(text)
  end
end

When("I click the sidebar link {string}") do |text|
  within("#deskNav") do
    click_link text
  end
end

Then("the URL anchor should be {string}") do |anchor|
  expect(current_url).to end_with(anchor)
end

Then("I should see the stat {string}") do |value|
  expect(page).to have_css(".stat .n", text: value)
end

Then("I should see the link {string}") do |text|
  expect(page).to have_link(text)
end

# Terminal hero steps
Then("I should see the terminal window") do
  expect(page).to have_css(".term")
end

Then("I should see the terminal title {string}") do |text|
  expect(page).to have_css(".term-title", text: text)
end

Then("I should see the command {string}") do |cmd|
  expect(page).to have_css(".cmd", text: cmd)
end

Then("I should see the typing caret") do
  expect(page).to have_css(".caret")
end

# Mobile menu steps
Then("the mobile sheet should be hidden") do
  expect(page).to have_css("#msheet")
  expect(page).not_to have_css("#msheet.open")
end

When("I open the mobile menu") do
  find(".burger[aria-label='Open menu']").click
end

Then("the mobile sheet should be visible") do
  expect(page).to have_css("#msheet.open")
end

Then("I should see the mobile link {string}") do |text|
  within("#msheet") do
    expect(page).to have_content(text)
  end
end

When("I close the mobile menu") do
  within("#msheet") do
    find(".close").click
  end
end
