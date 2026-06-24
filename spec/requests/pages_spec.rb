require "rails_helper"

RSpec.describe "Pages", type: :request do
  describe "GET /" do
    before { get root_path }

    it "returns HTTP 200" do
      expect(response).to have_http_status(:ok)
    end

    it "renders the hero terminal block" do
      expect(response.body).to include("whoami")
    end

    it "renders all five navigation sections" do
      %w[about cv work stack contact].each do |section|
        expect(response.body).to include(%(<section id="#{section}"))
      end
    end

    it "renders the contact email" do
      expect(response.body).to include("tin@costtracker.no")
    end

    it "renders the typing controller target" do
      expect(response.body).to include('data-controller="typing"')
    end

    it "renders the nav stimulus controller" do
      expect(response.body).to include('data-controller="nav"')
    end

    it "renders the mobile-menu stimulus controller" do
      expect(response.body).to include('data-controller="mobile-menu"')
    end
  end
end
