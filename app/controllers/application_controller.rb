class ApplicationController < ActionController::Base
  allow_browser versions: :modern
  before_action :set_locale

  private

  def set_locale
    requested = params[:locale].presence
    I18n.locale = I18n.available_locales.include?(requested&.to_sym) ? requested.to_sym : I18n.default_locale
  end

  def default_url_options
    { locale: I18n.locale == I18n.default_locale ? nil : I18n.locale }
  end
end
